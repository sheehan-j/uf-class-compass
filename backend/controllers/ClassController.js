const DataAccessUtil = require("../util/DataAccessUtil");
const Class = require("../model/Class");
const Section = require("../model/Section");

exports.getClass = async (req, res) => {
	try {
		const result = await Class.findOne({ code: req.query.code });
		if (!result) return res.status(204).json({ message: "Class not found." });
		return res.status(200).json(result);
	} catch (err) {
		console.error("Error:", err);
		return res.status(500).json({ message: "Internal server error." });
	}
};

exports.getSections = async (req, res) => {
	try {
		if (req.query?.code) {
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
		} else if (req.query?.number) {
			const result = await Section.findOne({ number: req.query.number });
			if (!result) return res.status(204).json({ section: "Section not found." });
			return res.status(200).json(result);
		} else {
			return res.status(400).json({ error: "Must provide either a class code or a section number." });
		}
	} catch (err) {
		console.error("Error:", err);
		return res.status(500).json({ message: "Internal server error." });
	}
};
