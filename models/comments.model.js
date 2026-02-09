const db = require("../db/connection");
exports.deleteCommentById = (comment_id) => {
  return db
    .query(`DELETE FROM comments where comment_id = $1`, [comment_id])
    .then(() => {
      return;
    });
};
exports.checkCommentIdExists = (comment_id) => {
  return db
    .query(`SELECT * FROM comments WHERE comment_id = $1`, [comment_id])
    .then(({ rows }) => {
      return rows.length === 1;
    });
};
