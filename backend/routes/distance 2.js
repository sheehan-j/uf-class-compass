const express = require("express");
const router = express.Router();
const DistanceController = require("../controllers/DistanceController");

router.route("/").get(DistanceController.getDistance);

module.exports = router;
