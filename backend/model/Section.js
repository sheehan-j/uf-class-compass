const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
	number: Number,
	class: { type: mongoose.Schema.Types.ObjectId, ref: "Class" },
	instructor: { type: mongoose.Schema.Types.ObjectId, ref: "Instructor" },
	credits: Number,
	final: String,
	department: String,
	meetings: {
		type: [
			{
				day: Number,
				period: Number,
				length: Number,
				building: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "Building",
				},
				room: String,
				online: Boolean,
			},
		],
	},
	isOnline: Boolean,
});

module.exports = mongoose.model("Section", Schema);
