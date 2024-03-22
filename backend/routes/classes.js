const express = require("express");
const router = express.Router();
const ClassController = require("../controllers/ClassController");

router.route("/").get(ClassController.getAllClasses);

module.exports = router;
