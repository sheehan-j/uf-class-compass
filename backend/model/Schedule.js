const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
	name: String,
	classes: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Class",
		},
	],
});

module.exports = mongoose.model("Schedule", Schema);
