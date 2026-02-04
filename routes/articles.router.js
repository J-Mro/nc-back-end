const express = require("express");
const router = express.Router();
const { getAllArticles } = require("../controller/articles.controller");

router.get("/", getAllArticles);
module.exports = router;
