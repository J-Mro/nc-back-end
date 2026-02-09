const express = require("express");
const router = express.Router();
const { deleteCommentById } = require("../controller/comments.controller");
const invalidMethodHandler = require("../errors/invalidMethodHandler");

router
  .route("/:comment_id")
  .delete(deleteCommentById)
  .all(invalidMethodHandler);
module.exports = router;
