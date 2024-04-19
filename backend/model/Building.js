const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
	code: String,
	name: String,
	pid: String,
	bid: String,
	lat: Number,
	long: Number,
});

module.exports = mongoose.model("Building", Schema);
