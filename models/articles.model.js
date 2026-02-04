const db = require("../db/connection");
exports.fetchAllArticles = () => {
  return db.query(`SELECT * FROM ARTICLES`).then(({ rows }) => {
    return rows;
  });
};
