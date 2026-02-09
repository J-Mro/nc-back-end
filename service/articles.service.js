const {
  fetchAllArticles,
  fetchArticleById,
  fetchCommentsByArticleId,
  checkArticleIdExists,
  checkUserExists,
  storeCommentFromUserName,
  updateVotesByArticleId,
} = require("../models/articles.model");
const NotFoundError = require("../errors/NotFoundError");
const BadRequestError = require("../errors/BadRequestError");
exports.getAllArticles = () => {
  return fetchAllArticles();
};
exports.getArticleById = (article_id) => {
  return fetchArticleById(article_id).then((article) => {
    if (article === undefined) {
      throw new NotFoundError("Article ID not found");
    } else {
      return article;
    }
  });
};
exports.getCommentsByArticleId = (article_id) => {
  return checkArticleIdExists(article_id).then((result) => {
    if (result !== false) {
      return fetchCommentsByArticleId(article_id).then((comments) => {
        if (comments.length > 0) return { comments };
        else return { comments: "No comments yet!" };
      });
    } else {
      throw new NotFoundError("Article ID not found");
    }
  });
};
exports.postCommentFromUserName = (article_id, comment) => {
  if (comment.body.trim() !== "") {
    return checkArticleIdExists(article_id).then((result) => {
      if (result !== false) {
        return checkUserExists(comment.username).then((result) => {
          if (result !== false) {
            return storeCommentFromUserName(article_id, comment).then(
              (comment) => {
                return comment;
              },
            );
          } else {
            throw new NotFoundError("User not found");
          }
        });
      } else {
        throw new NotFoundError("Article ID not found");
      }
    });
  } else {
    throw new BadRequestError("Please enter your comment!");
  }
};
exports.patchArticleById = (article_id, inc_votes) => {
  if (inc_votes !== undefined) {
    if (!isNaN(inc_votes)) {
      return checkArticleIdExists(article_id).then((result) => {
        if (result !== false) {
          return updateVotesByArticleId(article_id, inc_votes).then(
            (article) => {
              return article;
            },
          );
        } else {
          throw new NotFoundError("Article ID not found");
        }
      });
    } else {
      throw new BadRequestError("Increase votes must be a number");
    }
  } else {
    throw new BadRequestError("Request body is empty");
  }
};
