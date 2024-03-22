const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
	code: String,
	number: Number,
	title: String,
	instructor: String,
});

module.exports = mongoose.model("Class", Schema);
