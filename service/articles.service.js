const {
  fetchAllArticles,
  fetchArticleById,
  fetchCommentsByArticleId,
  checkArticleIdExists,
  checkUserExists,
  storeCommentFromUserName,
  updateVotesByArticleId,
  checkColumnExists,
} = require("../models/articles.model");
const NotFoundError = require("../errors/NotFoundError");
const BadRequestError = require("../errors/BadRequestError");
exports.getAllArticles = (sort_by, order) => {
  const ascCheck = /^asc$/i;
  const descCheck = /^desc$/i;
  if (ascCheck.test(order) || descCheck.test(order)) {
    return fetchAllArticles(sort_by, order).catch((err) => {
      throw new NotFoundError("This column does not exist");
    });
  } else {
    throw new BadRequestError("Invalid order");
  }
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
exports.patchArticleById = (article_id, incVotesObject) => {
  if (Object.keys(incVotesObject).length !== 0) {
    if (Object.keys(incVotesObject).length === 1) {
      const { inc_votes } = incVotesObject;
      if (inc_votes !== undefined) {
        if (!isNaN(inc_votes)) {
          if (inc_votes % 1 === 0) {
            if (inc_votes !== 0) {
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
              throw new BadRequestError("Value must be non-zero");
            }
          } else {
            throw new BadRequestError("Increase votes must be an integer");
          }
        } else {
          throw new BadRequestError("Increase votes must be a number");
        }
      } else {
        throw new BadRequestError(
          "Request body must have a valid key and value",
        );
      }
    } else {
      throw new BadRequestError(
        "Request body must be an object with a single key-value pair",
      );
    }
  } else {
    throw new BadRequestError("Request body is empty");
  }
};
