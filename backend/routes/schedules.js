const express = require("express");
const router = express.Router();
const ScheduleController = require("../controllers/ScheduleController");

router.route("/").get(ScheduleController.getAllSchedules);

module.exports = router;
