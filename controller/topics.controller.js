const {
  getAllTopics: getAllTopicsService,
} = require("../service/topics.service");

exports.getAllTopics = (req, res) => {
  getAllTopicsService().then((topics) => {
    console.log(topics, "<< topics");
    console.log(topics.rows, " << topics rows");
    res.status(200).send(topics);
  });
};
