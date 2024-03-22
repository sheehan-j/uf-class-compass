const express = require("express");
const router = express.Router();

router.route("/").get((req, res) => {
	return res.status(200).send("UF Class Compass backend is running!");
});

module.exports = router;
