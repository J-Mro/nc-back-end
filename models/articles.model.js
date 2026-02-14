const db = require("../db/connection");
const format = require("pg-format");
exports.fetchAllArticles = (sort_by, order, topic) => {
  const queryStrJoin = `
        SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url, CAST(COUNT(comments.comment_id) AS int) AS comment_count
        FROM articles
        LEFT JOIN comments
        ON articles.article_id = comments.article_id `;
  let queryStrFilters = ``;
  if (topic !== undefined) {
    queryStrFilters += `WHERE topic = '${topic}' GROUP BY articles.article_id
        ORDER BY articles.%I ${order};`;
    const finalQuery = queryStrJoin + queryStrFilters;
    const formattedFinalQuery = format(finalQuery, sort_by);
    return db.query(formattedFinalQuery).then(({ rows }) => {
      return rows;
    });
  } else {
    const queryStr = format(
      `
        SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url, CAST(COUNT(comments.comment_id) AS int) AS comment_count
        FROM articles
        LEFT JOIN comments
        ON articles.article_id = comments.article_id
        GROUP BY articles.article_id
        ORDER BY articles.%I ${order};`,
      sort_by,
    );
    return db.query(queryStr).then(({ rows }) => {
      return rows;
    });
  }
};
exports.fetchArticleById = (article_id) => {
  return db
    .query(
      `SELECT articles.*, CAST(COUNT(comments.comment_id) AS int) AS comment_count
       FROM articles
       LEFT JOIN comments
       ON articles.article_id = comments.article_id
       WHERE articles.article_id = $1
       GROUP BY articles.article_id;`,
      [article_id],
    )
    .then(({ rows }) => {
      return rows[0];
    });
};
// `SELECT articles.*, FROM articles WHERE article_id = $1`;
exports.fetchCommentsByArticleId = (article_id) => {
  return db
    .query(
      `SELECT comment_id, votes, created_at, author, body, article_id FROM comments WHERE article_id = $1 ORDER BY created_at DESC`,
      [article_id],
    )
    .then(({ rows }) => {
      return rows;
    });
};
exports.checkArticleIdExists = (article_id) => {
  return db
    .query(`SELECT * FROM articles WHERE article_id = $1`, [article_id])
    .then(({ rows }) => {
      return rows.length === 1;
    });
};
exports.checkUserExists = (username) => {
  return db
    .query(`SELECT * FROM users WHERE username = $1`, [username])
    .then(({ rows }) => {
      return rows.length === 1;
    });
};
exports.storeCommentFromUserName = (article_id, comment) => {
  const { username: author, body } = comment;
  return db
    .query(
      `INSERT INTO comments (article_id, body, author) VALUES ($1, $2, $3) RETURNING *`,
      [article_id, body, author],
    )
    .then(({ rows }) => {
      return rows[0];
    });
};
exports.updateVotesByArticleId = (article_id, inc_votes) => {
  return db
    .query(
      `UPDATE articles SET votes = votes + ${inc_votes} WHERE article_id = $1 RETURNING *;`,
      [article_id],
    )
    .then(({ rows }) => {
      return rows[0];
    });
};
