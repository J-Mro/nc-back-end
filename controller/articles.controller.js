const {
  getAllArticles: getAllArticlesService,
  getArticleById: getArticleByIdService,
  getCommentsByArticleId: getCommentsByArticleIdService,
  postCommentFromUserName: postCommentFromUserNameService,
  patchArticleById: patchArticleByIdService,
} = require("../service/articles.service");
exports.getAllArticles = (req, res, next) => {
  const { sort_by = "created_at", order = "desc", topic } = req.query;
  getAllArticlesService(sort_by, order, topic)
    .then((articles) => {
      res.status(200).send(articles);
    })
    .catch((err) => {
      next(err);
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
exports.postCommentFromUserName = (req, res, next) => {
  const comment = req.body;
  const { article_id } = req.params;
  postCommentFromUserNameService(article_id, comment)
    .then((comment) => {
      res.status(201).send(comment);
    })
    .catch((err) => {
      next(err);
    });
};
exports.patchArticleById = (req, res, next) => {
  const { article_id } = req.params;
  const incVotesObject = req.body;
  patchArticleByIdService(article_id, incVotesObject)
    .then((article) => {
      res.status(200).send(article);
    })
    .catch((err) => {
      next(err);
    });
};
