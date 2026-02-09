const {
  deleteCommentById: deleteCommentByIdModel,
  checkCommentIdExists,
} = require("../models/comments.model");
const NotFoundError = require("../errors/NotFoundError");
const BadRequestError = require("../errors/BadRequestError");
exports.deleteCommentById = (comment_id) => {
  if (!isNaN(comment_id)) {
    return checkCommentIdExists(comment_id).then((result) => {
      if (result === true) {
        return deleteCommentByIdModel(comment_id);
      } else {
        throw new NotFoundError("Comment not found");
      }
    });
  } else {
    throw new BadRequestError("Invalid ID");
  }
};
