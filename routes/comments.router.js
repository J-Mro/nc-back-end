const express = require("express");
const router = express.Router();
const { deleteCommentById } = require("../controller/comments.controller");

router.route("/:comment_id").delete(deleteCommentById);
module.exports = router;
