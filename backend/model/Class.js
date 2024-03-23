const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
	code: String,
	number: Number,
	title: String,
	instructor: { type: mongoose.Schema.Types.ObjectId, ref: "Instructor" },
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
			},
		],
	},
});

module.exports = mongoose.model("Class", Schema);
