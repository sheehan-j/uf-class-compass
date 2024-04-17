const express = require("express");
const router = express.Router();
const RMPController = require("../controllers/RMPController");

router.route("/update").post(RMPController.updateRMPData);

module.exports = router;
