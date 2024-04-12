const express = require("express");
const router = express.Router();
const ClassController = require("../controllers/ClassController");

router.route("/").get(ClassController.getClass);
router.route("/sections").get(ClassController.getClassSections);

module.exports = router;
