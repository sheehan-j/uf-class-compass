const express = require("express");
const router = express.Router();
const SearchController = require("../controllers/SearchController");

router.route("/").get(SearchController.fullSearch);

module.exports = router;
