const Schedule = require("../model/Schedule");
const Class = require("../model/Class");
const Building = require("../model/Building");
const Instructor = require("../model/Instructor");
const DataAccessUtil = require("../util/DataAccessUtil");

exports.getAllSchedules = async (req, res) => {
	const schedules = await DataAccessUtil.getAllSchedules();
	if (!schedules) return res.status(204).json({ message: "No schedules found." });
	return res.status(200).json(schedules);
};

exports.createSchedule = async (req, res) => {
	try {
		await Schedule.create({
			name: req.query.name,
			classes: [],
		});

		// TODO: Update this to return all of the schedule for the user
		const result = await DataAccessUtil.getAllSchedules();
		return res.status(201).json(result);
	} catch (err) {
		console.error(err);
		return res.status(500).json({ message: "Server error" });
	}
};

exports.deleteSchedule = async (req, res) => {
	try {
		const deleteResult = await Schedule.deleteOne({ _id: req.query.id });
		const result = await DataAccessUtil.getAllSchedules();
		if (deleteResult.deletedCount == 1) {
			return res.status(200).json(result);
		} else {
			return res.status(404).json({ message: "Schedule not found." });
		}
	} catch (err) {
		console.error(err);
		return res.status(500).json({ message: "Server error" });
	}
};
