const express = require("express");
const { login, register } = require("../controllers/AuthController.js");
const { verifyToken } = require("../middleware/auth.js");
const User = require("../model/User.js");
const bcrypt = require("bcrypt");

const router = express.Router();

/* include /api/user in url prior to testing routes */
// Route for fetching user details
router.get("/", verifyToken, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select("-password");
		res.json(user);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// Route for updating user information
router.put("/edit", verifyToken, async (req, res) => {
	try {
		const user = await User.findById(req.user.id);
		if (!user) return res.status(404).json({ msg: "User not found" });

		// Update email if provided
		if (req.body.email) {
			user.email = req.body.email;
		}

		// Update password if provided
		if (req.body.password) {
			const salt = await bcrypt.genSalt();
			const passwordHash = await bcrypt.hash(req.body.password, salt);
			user.password = passwordHash;
		}

		user.iconColor = req.body.iconColor || user.iconColor;
		user.firstName = req.body.firstName || user.firstName;
		user.lastName = req.body.lastName || user.lastName;

		const updatedUser = await user.save();
		res.json(updatedUser);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// Route for deleting user account
router.delete("/delete", verifyToken, async (req, res) => {
	try {
		const deletedUser = await User.findByIdAndDelete(req.user.id);
		res.json({ msg: "User deleted", user: deletedUser });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

module.exports = router;
