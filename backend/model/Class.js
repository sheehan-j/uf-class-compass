const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
	code: String,
	title: String,
	description: String,
	prerequisites: String,
});

module.exports = mongoose.model("Class", Schema);
