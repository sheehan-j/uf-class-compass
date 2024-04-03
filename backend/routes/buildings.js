const express = require("express");
const router = express.Router();
const BuildingController = require("../controllers/BuildingController");

router.route("/").get(BuildingController.getBuildingByCode);

module.exports = router;
