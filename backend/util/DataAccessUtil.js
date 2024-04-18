const Schedule = require("../model/Schedule");
const Class = require("../model/Class");
const Building = require("../model/Building");
const Instructor = require("../model/Instructor");

// exports.mapClassResults = (classes) => {
// 	return classes.map((classObj) => {
// 		return {
// 			...classObj.toObject(),
// 			instructor: classObj.instructor.name,
// 		};
// 	});
// };

// exports.mapScheduleResults = (schedules) => {
// 	return schedules.map((schedule) => {
// 		return {
// 			...schedule.toObject(),
// 			classes: this.mapClassResults(schedule.classes),
// 		};
// 	});
// };

exports.getSchedules = async (params) => {
	try {
		let result = await Schedule.find(params)
			.populate({
				path: "sections",
				populate: { path: "instructor" },
			})
			.populate({
				path: "sections",
				populate: { path: "class" },
			})
			.populate({
				path: "sections",
				populate: {
					path: "meetings",
					populate: {
						path: "building",
					},
				},
			});

		return result;
	} catch (err) {
		console.error(err);
		return -1;
	}
};
