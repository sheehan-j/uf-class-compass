const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
	code: String,
	name: String,
	pid: String,
});

module.exports = mongoose.model("Building", Schema);
