const express = require("express");
const router = express.Router();
const {
  getAllArticles,
  getArticleById,
} = require("../controller/articles.controller");

router.get("/", getAllArticles);
router.get("/:article_id", getArticleById);
module.exports = router;
