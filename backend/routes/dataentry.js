const express = require("express");
const router = express.Router();
const DataEntryController = require("../controllers/DataEntryController");

router.route("/building").post(DataEntryController.createBuildingRecord);
router.route("/instructor").post(DataEntryController.createInstructorRecord);
router.route("/class").post(DataEntryController.createClassRecord);
router.route("/section").post(DataEntryController.createSectionRecord);

module.exports = router;
