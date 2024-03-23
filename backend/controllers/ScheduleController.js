const Schedule = require("../model/Schedule");
const Class = require("../model/Class");
const Building = require("../model/Building");
const Instructor = require("../model/Instructor");

exports.getAllSchedules = async (req, res) => {
	let result = await Schedule.find({})
		.populate({
			path: "classes",
			populate: { path: "instructor" },
		})
		.populate({
			path: "classes",
			populate: {
				path: "meetings",
				populate: {
					path: "building",
				},
			},
		});

	if (!result) {
		return res.status(204).json({ message: "No schedules found." });
	}

	result = result.map((schedule) => {
		return {
			...schedule.toObject(),
			classes: schedule.classes.map((classObj) => {
				return {
					...classObj.toObject(),
					instructor: classObj.instructor.name,
					meetings: classObj.meetings.map((meeting) => {
						return {
							...meeting.toObject(),
							building: meeting.building.code,
						};
					}),
				};
			}),
		};
	});

	return res.status(200).json(result);
};

exports.createSchedule = async (req, res) => {
	const schedule = await new Schedule({
		name: req.body.name,
		classes: [],
	});

	try {
		await Schedule.create({
			name: req.body.name,
			classes: [],
		});

		// TODO: Update this to return all of the schedule for the user
		const newSchedules = await Schedule.find({});
		return res.status(201).json(newSchedules);
	} catch (err) {
		console.error(err);
		return res.status(500).json({ message: "Server error" });
	}
};
