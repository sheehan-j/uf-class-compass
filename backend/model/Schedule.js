const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
	name: String,
	user: mongoose.Schema.Types.ObjectId,
	classes: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Class",
		},
	],
});

module.exports = mongoose.model("Schedule", Schema);
