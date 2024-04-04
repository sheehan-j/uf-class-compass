const express = require("express");
const { login, register } = require("../controllers/AuthController.js");
const router = express.Router();

// Route for user login
router.post("/login", login);

// Route for user registration
router.post("/register", register);

module.exports = router;
