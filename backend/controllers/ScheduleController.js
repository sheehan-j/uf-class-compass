const Schedule = require("../model/Schedule");
const Class = require("../model/Class");
const Section = require("../model/Section");
const Building = require("../model/Building");
const Instructor = require("../model/Instructor");
const DataAccessUtil = require("../util/DataAccessUtil");

exports.getAllSchedules = async (req, res) => {
	const schedules = await DataAccessUtil.getSchedules({});
	return res.status(200).json(schedules);
};

exports.getSchedulesByUser = async (req, res) => {
	const schedules = await DataAccessUtil.getSchedules({ user: req.query.user });
	return res.status(200).json(schedules);
};

exports.createSchedule = async (req, res) => {
	try {
		await Schedule.create({
			name: req.query.name,
			user: req.query.user,
			classes: [],
		});

		// TODO: Update this to return all of the schedule for the user
		const result = await DataAccessUtil.getSchedules({ user: req.query.user });
		return res.status(201).json(result);
	} catch (err) {
		console.error(err);
		return res.status(500).json({ error: "Server error" });
	}
};

exports.deleteSchedule = async (req, res) => {
	try {
		const scheduleSearch = await Schedule.findOne({ _id: req.query.id });
		if (!scheduleSearch) return res.status(400).json({ error: "Schedule not found" });

		const deleteResult = await Schedule.deleteOne({ _id: req.query.id });
		const result = await DataAccessUtil.getSchedules({ user: scheduleSearch.user });
		if (deleteResult.deletedCount == 1) {
			return res.status(200).json(result);
		} else {
			return res.status(400).json({ error: "Schedule could not be deleted." });
		}
	} catch (err) {
		console.error(err);
		return res.status(500).json({ error: "Server error" });
	}
};

exports.addClassToSchedule = async (req, res) => {
	try {
		const scheduleSearch = await Schedule.findOne({ _id: req.query.schedule });
		if (!scheduleSearch) return res.status(400).json({ error: "Schedule not found" });

		await Schedule.updateOne(
			{ _id: req.query.schedule }, // Filter criteria to find the record to update
			{ $push: { sections: req.query.class } } // Update to push the new object ID to the list field
		);

		const result = await DataAccessUtil.getSchedules({ user: scheduleSearch.user });
		return res.status(200).json(result);
	} catch (error) {
		return res.status(500).json({ error: "Internal server error" });
	}
};

exports.deleteClassFromSchedule = async (req, res) => {
	try {
		const scheduleSearch = await Schedule.findOne({ _id: req.query.schedule });
		if (!scheduleSearch) return res.status(400).json({ error: "Schedule not found" });

		await Schedule.updateOne(
			{ _id: req.query.schedule }, // Filter criteria to find the record to update
			{ $pull: { sections: req.query.class } } // Update to pull the new object ID to the list field
		);

		const result = await DataAccessUtil.getSchedules({ user: scheduleSearch.user });
		return res.status(200).json(result);
	} catch (error) {
		return res.status(500).json({ error: "Internal server error" });
	}
};
