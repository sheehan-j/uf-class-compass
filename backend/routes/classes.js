const express = require("express");
const router = express.Router();
const ClassController = require("../controllers/ClassController");

router.route("/").get(ClassController.getClass);
router.route("/prefix").get(ClassController.getClassPrefix);
router.route("/sections").get(ClassController.getSections);
router.route("/textbooks").get(ClassController.getTextbooksBySection);

module.exports = router;
