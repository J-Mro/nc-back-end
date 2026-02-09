const {
  deleteCommentById: deleteCommentByIdModel,
  checkCommentIdExists,
} = require("../models/comments.model");
const NotFoundError = require("../errors/NotFoundError");
exports.deleteCommentById = (comment_id) => {
  return checkCommentIdExists(comment_id).then((result) => {
    console.log(result);
    if (result === true) {
      return deleteCommentByIdModel(comment_id);
    } else {
      throw new NotFoundError("Comment not found");
    }
  });
};
