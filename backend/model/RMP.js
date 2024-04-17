const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
	instructor: { type: mongoose.Schema.Types.ObjectId, ref: "Instructor" },
	department: String,
	school: String,
	rating: Number,
	difficulty: Number,
	numRatings: Number,
	wouldTakeAgain: Number,
});

module.exports = mongoose.model("RMP", Schema);
