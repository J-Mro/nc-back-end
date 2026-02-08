const {
  getAllArticles: getAllArticlesService,
  getArticleById: getArticleByIdService,
  getCommentsByArticleId: getCommentsByArticleIdService,
  postCommentFromUserName: postCommentFromUserNameService,
} = require("../service/articles.service");
exports.getAllArticles = (req, res) => {
  getAllArticlesService().then((articles) => {
    res.status(200).send(articles);
  });
};
exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params;
  getArticleByIdService(article_id)
    .then((articles) => {
      res.status(200).send(articles);
    })
    .catch((err) => {
      next(err);
    });
};
exports.getCommentsByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  getCommentsByArticleIdService(article_id)
    .then((comments) => {
      res.status(200).send(comments);
    })
    .catch((err) => {
      next(err);
    });
};
exports.postCommentFromUserName = (req, res) => {
  // comment to post available on req.body
  const comment = req.body;
  // article id available on req.params
  const { article_id } = req.params;
  postCommentFromUserNameService(article_id, comment).then((comment) => {
    res.status(201).send(comment);
  });
};
