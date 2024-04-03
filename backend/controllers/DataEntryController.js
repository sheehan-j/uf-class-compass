const Building = require("../model/Building");
const Instructor = require("../model/Instructor");
const Schedule = require("../model/Schedule");
const Class = require("../model/Class");

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
		const classSearch = await Class.find({ number: req.body.number });
		if (classSearch.length > 0) return res.status(400).json({ error: `Class already exists: ${req.body.number}` });

		const instructor = await Instructor.findOne({ name: req.body.instructor });
		if (!instructor) return res.status(400).json({ error: `Instructor does not exist: ${req.body.instructor}` });

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

		const createResult = await Class.create({
			code: req.body.code,
			number: req.body.number,
			title: req.body.title,
			instructor: instructor._id,
			meetings: [...meetings],
			credits: req.body.credits,
		});
		return res.status(201).json(createResult);
	} catch (err) {
		console.error(err);
		return res.status(500).json({ error: "Internal server error" });
	}
};
