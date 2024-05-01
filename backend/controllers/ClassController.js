const DataAccessUtil = require("../util/DataAccessUtil");
const Class = require("../model/Class");
const Section = require("../model/Section");
const axios = require("axios");
const cheerio = require("cheerio");

exports.getClass = async (req, res) => {
	try {
		const result = await Class.findOne({ code: req.query.code });
		if (!result) return res.status(204).json({ message: "Class not found." });
		return res.status(200).json(result);
	} catch (err) {
		console.error("Error:", err);
		return res.status(500).json({ message: "Internal server error." });
	}
};

exports.getClassPrefix = async (req, res) => {
	try {
		const result = await Class.find({ code: { $regex: `^${req.query.code}`, $options: "i" } });
		if (!result) return res.status(204).json({ message: "No class with that prefix found not found." });
		return res.status(200).json(result);
	} catch (err) {
		console.error("Error:", err);
		return res.status(500).json({ message: "Internal server error." });
	}
};

exports.getSections = async (req, res) => {
	try {
		if (req.query?.code) {
			const classSearch = await Class.findOne({ code: req.query.code });
			if (!classSearch) return res.status(204).json({ message: "Class not found." });
			const sections = await Section.find({ class: classSearch._id })
				.populate({
					path: "meetings",
					populate: {
						path: "building",
					},
				})
				.populate("instructor")
				.populate("class");
			return res.status(200).json(sections);
		} else if (req.query?.number) {
			const result = await Section.findOne({ number: req.query.number });
			if (!result) return res.status(204).json({ section: "Section not found." });
			return res.status(200).json(result);
		} else {
			return res.status(400).json({ error: "Must provide either a class code or a section number." });
		}
	} catch (err) {
		console.error("Error:", err);
		return res.status(500).json({ message: "Internal server error." });
	}
};

exports.getTextbooksBySection = async (req, res) => {
	const url = `https://www.bsd.ufl.edu/textadoption/studentview/displayadoption1sect.aspx?SECT=${req.query.section}&YEAR=24&TERM=8`;
	const response = await axios.get(url); //fetches html
	const htmlContent = response.data;
	const $ = cheerio.load(htmlContent); //creates a query item out of html
	const table = $("table.books");

	if (table) {
		const data = [];
		const rows = $("table.books tbody tr");

		const requiredInfo = [
			//teh stuff we want :)
			"Title",
			"ISBN",
			"Cover",
			"Author",
			"Edition",
			"Copyright",
			"Publisher",
			"NewRetailPrice",
			"UsedRetailPrice",
			"NewRentalFee",
			"UsedRentalFee",
		];

		let tempObject = {};

		//goes through each row and grabs every key possible but filters it to just the stuff we want
		rows.each((index, element) => {
			$(element)
				.find("td")
				.each((i, el) => {
					const key = $(el).text().trim().replace(":", ""); // Get the key for the object
					const value = $(el).next("td.books").text().trim(); // Get the value for the key
					// Store the data if it is required information
					const trimmedKey = key.trim();
					const normalizedKey = trimmedKey.replace(/\s/g, ""); // remove spaces
					if (key && requiredInfo.includes(normalizedKey)) {
						tempObject[normalizedKey.toLowerCase()] = value; //set to lowercase and add
					}

					if (normalizedKey.startsWith("Thistextis")) {
						const restOfKey = normalizedKey.substring("Thistextis".length);
						tempObject["textis"] = restOfKey.toUpperCase();
					}
				});

			if (Object.keys(tempObject).length > 0) {
				data.push(tempObject);
				tempObject = {};
			}
		});

		// Combine every four array items because the website set up their table in the worst way possible
		const combinedObjects = [];
		for (let i = 0; i < data.length; i += 4) {
			const combined = {};
			for (let j = 0; j < 4 && i + j < data.length; j++) {
				Object.assign(combined, data[i + j]);
			}
			combinedObjects.push(combined);
		}

		return res.status(200).json(combinedObjects);
	} else {
		return res.status(304).json([]);
	}
};

// *** This is not a function that should be used regularly, it was used
// to decrement all days in the DB since they were originally 1-based (Monday = 1)
// and needed to be 0-based, keeping this here in just case
const decrementAllDays = async (req, res) => {
	try {
		let sections = await Section.find({});

		sections = sections.map((section) => {
			if (section.meetings.length == 0) return section;
			const newMeetings = section.meetings.map((meeting) => {
				return {
					period: meeting.period,
					length: meeting.length,
					building: meeting.building,
					room: meeting.room,
					day: meeting.day - 1,
					_id: meeting._id,
				};
			});
			return {
				_id: section._id,
				number: section.number,
				class: section.class,
				instructor: section.instructor,
				credits: section.credits,
				final: section.final,
				department: section.department,
				isOnline: section.isOnline,
				meetings: newMeetings,
			};
		});

		let updateIndex = 0;
		for (const section of sections) {
			console.log(`Updating section ${updateIndex} starting...`);
			await Section.updateOne({ _id: section._id }, { $set: { meetings: section.meetings } });
			console.log(`Updating section ${updateIndex} complete.`);
			updateIndex++;
		}

		return res.status(200).json("yer");
	} catch (err) {
		return res.status(500).json("error");
	}
};
