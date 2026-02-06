const express = require("express");
const router = express.Router();
const {
  getAllArticles,
  getArticleById,
  getCommentsByArticleId,
} = require("../controller/articles.controller");
const invalidMethodHandler = require("../errors/invalidMethodHandler");

router.get("/", getAllArticles);
router.get("/:article_id", getArticleById);
router.get("/:article_id/comments", getCommentsByArticleId);
router.all("/", invalidMethodHandler);
module.exports = router;
