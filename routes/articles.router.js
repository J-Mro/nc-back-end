const express = require("express");
const router = express.Router();
const {
  getAllArticles,
  getArticleById,
  getCommentsByArticleId,
  postCommentFromUserName,
} = require("../controller/articles.controller");
const invalidMethodHandler = require("../errors/invalidMethodHandler");

router.route("/").get(getAllArticles).all(invalidMethodHandler);
router.route("/:article_id").get(getArticleById).all(invalidMethodHandler);
router
  .route("/:article_id/comments")
  .get(getCommentsByArticleId)
  .post(postCommentFromUserName)
  .all(invalidMethodHandler);
module.exports = router;
