const {
  getAllTopics: getAllTopicsService,
} = require("../service/topics.service");

exports.getAllTopics = (req, res) => {
  getAllTopicsService().then((topics) => {
    res.status(200).send(topics);
  });
};
