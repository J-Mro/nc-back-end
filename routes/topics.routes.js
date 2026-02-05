const express = require("express");
const { getAllTopics } = require("../controller/topics.controller");
const invalidMethodError = require("../errors/invalidMethodError.js");
const router = express.Router();

router.get("/", getAllTopics);
router.all("/", invalidMethodError);

module.exports = router;
