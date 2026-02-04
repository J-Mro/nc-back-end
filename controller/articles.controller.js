const {
  getAllArticles: getAllArticlesService,
} = require("../service/articles.service");
exports.getAllArticles = (req, res) => {
  getAllArticlesService().then((articles) => {
    res.status(200).send(articles);
  });
};
