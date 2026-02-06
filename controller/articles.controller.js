const {
  getAllArticles: getAllArticlesService,
  getArticleById: getArticleByIdService,
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
