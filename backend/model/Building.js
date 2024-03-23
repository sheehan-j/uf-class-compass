const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
	code: String,
});

module.exports = mongoose.model("Building", Schema);
