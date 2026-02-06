const express = require("express");
const { getAllTopics } = require("../controller/topics.controller");
const invalidMethodHandler = require("../errors/invalidMethodHandler.js");
const router = express.Router();

router.get("/", getAllTopics);
router.all("/", invalidMethodHandler);

module.exports = router;
