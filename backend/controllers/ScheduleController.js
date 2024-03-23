const Schedule = require("../model/Class");
const Building = require("../model/Building");
const Instructor = require("../model/Instructor");

exports.getAllSchedules = async (req, res) => {
	let result = await Schedule.find({}).populate("instructor").populate("meetings.building");
	if (!result) {
		return res.status(204).json({ message: "No schedules found." });
	}

	result = result.map((schedule) => {
		return {
			...schedule.toObject(),
			instructor: schedule.instructor.name,
			meetings: schedule.meetings.map((meeting) => {
				return {
					...meeting.toObject(),
					building: meeting.building.code,
				};
			}),
		};
	});

	return res.status(200).json(result);
};
