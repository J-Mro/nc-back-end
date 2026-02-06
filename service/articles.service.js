const {
  fetchAllArticles,
  fetchArticleById,
  fetchCommentsByArticleId,
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
  return fetchCommentsByArticleId(article_id).then((comments) => {
    return { comments };
  });
};
