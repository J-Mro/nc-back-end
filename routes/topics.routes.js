const express = require("express");
const { getAllTopics } = require("../controller/topics.controller");
const router = express.Router();

router.get("/", getAllTopics);
router.all("/", (req, res, next) => {
  res.status(405).send({ msg: "Invalid method" });
});

module.exports = router;
