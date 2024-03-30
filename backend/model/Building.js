const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
	code: String,
	pid: String,
});

module.exports = mongoose.model("Building", Schema);
