const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
	name: String,
	rmpData: {
		department: String,
		school: String,
		rating: Number,
		difficulty: Number,
		numRatings: Number,
		wouldTakeAgain: Number,
	},
});

module.exports = mongoose.model("Instructor", Schema);
