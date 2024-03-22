const Class = require("../model/Class");

exports.getAllClasses = async (req, res) => {
	const result = await Class.find({});
	if (!result) {
		return res.status(204).json({ message: "No classes found." });
	}

	return res.status(200).json(result);
};
