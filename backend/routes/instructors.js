const express = require("express");
const router = express.Router();
const InstructorController = require("../controllers/InstructorController");

router.route("/").get(InstructorController.getInstructorByName);

module.exports = router;
