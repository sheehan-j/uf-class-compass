const DataAccessUtil = require("../util/DataAccessUtil");
const Class = require("../model/Class");

exports.getAllClasses = async (req, res) => {
	let query;

	// Determine query based on params
	if (req.query.number) query = Class.findOne({ number: req.query.number });
	else if (req.query.code) query = Class.find({ code: req.query.code });
	else query = Class.find({});

	// Populate buildings and instructor object refs
	query = query
		.populate({
			path: "meetings",
			populate: {
				path: "building",
			},
		})
		.populate("instructor");

	try {
		let result = await query.exec();
		if (!result || result.length == 0) return res.status(204).json({ message: "Class(es) not found." });
		if (result.length > 0) result = DataAccessUtil.mapClassResults(result); // Only map results if the request was for multiple classes (code)
		return res.status(200).json(result);
	} catch (err) {
		console.error("Error:", err);
		return res.status(500).json({ message: "Internal server error." });
	}
};
