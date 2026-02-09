const {
  deleteCommentById: deleteCommentByIdService,
} = require("../service/comments.service");

exports.deleteCommentById = (req, res, next) => {
  const { comment_id } = req.params;
  deleteCommentByIdService(comment_id)
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => {
      next(err);
    });
};
