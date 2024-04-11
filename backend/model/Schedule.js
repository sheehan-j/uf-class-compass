const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
	name: String,
	user: mongoose.Schema.Types.ObjectId,
	sections: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Section",
		},
	],
});

module.exports = mongoose.model("Schedule", Schema);
