const Building = require("../model/Building");
const Instructor = require("../model/Instructor");
const Schedule = require("../model/Schedule");
const Class = require("../model/Class");
const Section = require("../model/Section");

exports.createBuildingRecord = async (req, res) => {
	try {
		const searchResult = await Building.findOne({ code: req.body.code });
		if (searchResult) return res.status(400).json({ error: "Building already exists." });

		const createResult = await Building.create(req.body);
		return res.status(201).json(createResult);
	} catch (err) {
		return res.status(500).json({ error: "Internal server error" });
	}
};

exports.createInstructorRecord = async (req, res) => {
	try {
		const searchResult = await Instructor.findOne({ name: req.body.name });
		if (searchResult) return res.status(400).json({ error: "Instructor already exists." });

		const createResult = await Instructor.create(req.body);
		return res.status(201).json(createResult);
	} catch (err) {
		return res.status(500).json({ error: "Internal server error" });
	}
};

exports.createClassRecord = async (req, res) => {
	try {
		const classSearch = await Class.findOne({ code: req.body.code });
		if (classSearch) return res.status(400).json({ error: `Class already exists: ${req.body.code}` });

		let newClass = {};
		if (req.body?.prerequisites) {
			newClass = {
				code: req.body.code,
				title: req.body.title,
				description: req.body.description,
				prerequisites: req.body.prerequisites,
			};
		} else {
			newClass = {
				code: req.body.code,
				title: req.body.title,
				description: req.body.description,
			};
		}

		const createResult = await Class.create(newClass);
		return res.status(201).json(createResult);
	} catch (err) {
		console.error(err);
		return res.status(500).json({ error: "Internal server error" });
	}
};

exports.createSectionRecord = async (req, res) => {
	try {
		const sectionSearch = await Section.findOne({ number: req.body.number });
		if (sectionSearch) return res.status(400).json({ error: `Section already exists: ${req.body.number}` });

		const classSearch = await Class.findOne({ code: req.body.class });
		if (!classSearch) return res.status(400).json({ error: `Class does not exist: ${req.body.class}` });

		const instructorSearch = await Instructor.findOne({ name: req.body.instructor });
		if (!instructorSearch)
			return res.status(400).json({ error: `Instructor does not exist: ${req.body.instructor}` });

		const meetings = await Promise.all(
			req.body.meetings.map(async (meeting) => {
				const building = await Building.findOne({ code: meeting.building });
				return building ? { ...meeting, building: building._id } : { error: true, code: meeting.building };
			})
		);

		// Check that all meetings were mapped successfully
		for (let i = 0; i < meetings.length; i++) {
			if (meetings[i]?.error)
				return res.status(400).json({ error: `Building does not exist: ${meetings[i].code}` });
		}

		const createResult = await Section.create({
			number: req.body.number,
			class: classSearch._id,
			instructor: instructorSearch._id,
			credits: req.body.credits,
			final: req.body.final,
			department: req.body.department,
			isOnline: req.body.isOnline,
			meetings: meetings,
		});
		return res.status(201).json(createResult);
	} catch (err) {
		console.error(err);
		return res.status(500).json({ error: "Internal server error:" + err});
	}
};
