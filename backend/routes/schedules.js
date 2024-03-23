const express = require("express");
const router = express.Router();
const ScheduleController = require("../controllers/ScheduleController");

router.route("/").get(ScheduleController.getAllSchedules);
router.route("/").post(ScheduleController.createSchedule);
router.route("/").delete(ScheduleController.deleteSchedule);

module.exports = router;
