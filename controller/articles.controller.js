const {
  getAllArticles: getAllArticlesService,
  getArticleById: getArticleByIdService,
} = require("../service/articles.service");
exports.getAllArticles = (req, res) => {
  getAllArticlesService().then((articles) => {
    res.status(200).send(articles);
  });
};
exports.getArticleById = (req, res) => {
  const { article_id } = req.params;
  getArticleByIdService(article_id)
    .then((articles) => {
      res.status(200).send(articles);
    })
    .catch((err) => {
      res.status(404).send({ msg: err.message });
    });
};
