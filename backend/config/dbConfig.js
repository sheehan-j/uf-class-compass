const mongoose = require("mongoose");

const connectToDB = async () => {
	try {
		await mongoose.connect(process.env.DB_PATH);
	} catch (err) {
		console.error(err);
	}
};

module.exports = connectToDB;
