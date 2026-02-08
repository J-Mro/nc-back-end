const {
  fetchAllArticles,
  fetchArticleById,
  fetchCommentsByArticleId,
  checkArticleIdExists,
  storeCommentFromUserName,
} = require("../models/articles.model");
const NotFoundError = require("../errors/NotFoundError");
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
  return checkArticleIdExists(article_id).then((val) => {
    if (val !== false) {
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
  return checkArticleIdExists(article_id).then((result) => {
    if (result !== false) {
      return storeCommentFromUserName(article_id, comment).then((comment) => {
        return comment;
      });
    } else {
      throw new NotFoundError("Article ID not found");
    }
  });
};
