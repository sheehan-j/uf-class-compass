const DataAccessUtil = require("../util/DataAccessUtil");
const Class = require("../model/Class");
const Section = require("../model/Section");

exports.getClass = async (req, res) => {
	try {
		const result = Class.findOne({ code: req.query.code });
		if (!result) return res.status(204).json({ message: "Class not found." });
		return res.status(200).json(result);
	} catch (err) {
		console.error("Error:", err);
		return res.status(500).json({ message: "Internal server error." });
	}
};

exports.getClassSections = async (req, res) => {
	try {
		const classSearch = await Class.findOne({ code: req.query.code });
		if (!classSearch) return res.status(204).json({ message: "Class not found." });

		const sections = await Section.find({ class: classSearch._id })
			.populate({
				path: "meetings",
				populate: {
					path: "building",
				},
			})
			.populate("instructor")
			.populate("class");

		return res.status(200).json(sections);
	} catch (err) {
		console.error("Error:", err);
		return res.status(500).json({ message: "Internal server error." });
	}
};
