const express = require("express");
const { getAllTopics } = require("../controller/topics.controller");
const router = express.Router();

router.get("/", getAllTopics);

module.exports = router;
