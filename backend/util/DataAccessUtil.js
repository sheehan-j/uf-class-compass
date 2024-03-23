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

	return result;
};
