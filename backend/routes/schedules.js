const express = require("express");
const router = express.Router();
const ScheduleController = require("../controllers/ScheduleController");

router.route("/").get(ScheduleController.getSchedulesByUser);
router.route("/").post(ScheduleController.createSchedule);
router.route("/").delete(ScheduleController.deleteSchedule);
router.route("/edit").post(ScheduleController.addClassToSchedule);
router.route("/edit").delete(ScheduleController.deleteClassFromSchedule);

module.exports = router;
