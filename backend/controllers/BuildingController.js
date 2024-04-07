const Building = require("../model/Building");

exports.getBuildingByCode = async (req, res) => {
	const result = await Building.findOne({ code: req.query.code });
	if (!result) return res.status(204).json({ message: "Building not found." });
	return res.status(200).json(result);
};
