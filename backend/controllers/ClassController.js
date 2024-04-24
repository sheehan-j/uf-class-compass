const DataAccessUtil = require("../util/DataAccessUtil");
const Class = require("../model/Class");
const Section = require("../model/Section");

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
