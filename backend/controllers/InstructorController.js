const Instructor = require("../model/Instructor");

exports.getInstructorByName = async (req, res) => {
	const result = await Instructor.findOne({ name: decodeURIComponent(req.query.name) });
	if (!result) return res.status(204).json({ message: "Instructor not found." });
	return res.status(200).json(result);
};
