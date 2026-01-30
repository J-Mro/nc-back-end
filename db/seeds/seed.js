const db = require("../connection");
const format = require("pg-format");

const seed = ({ topicData, userData, articleData, commentData }) => {
  return db
    .query(
      `
      DROP TABLE IF EXISTS comments;
      `,
    )
    .then(() => {
      return db.query(
        `
        DROP TABLE IF EXISTS articles;
        `,
      );
    })
    .then(() => {
      return db.query(
        `
        DROP TABLE IF EXISTS users;
        `,
      );
    })
    .then(() => {
      return db.query(
        `
      DROP TABLE IF EXISTS topics;
      `,
      );
    })
    .then(() => {
      return db.query(
        `
    CREATE TABLE topics (
    slug VARCHAR(40) PRIMARY KEY,
    description VARCHAR(40),
    img_url VARCHAR(1000)
    );`,
      );
    })
    .then(() => {
      return db.query(
        `
    CREATE TABLE users (
    username VARCHAR(255) PRIMARY KEY,
    name VARCHAR(40),
    avatar_url VARCHAR(1000)
    );`,
      );
    })
    .then(() => {
      return db.query(
        `
      CREATE TABLE articles (
      article_id SERIAL PRIMARY KEY NOT NULL,
      title VARCHAR(255),
      topic VARCHAR(255) REFERENCES topics(slug),
      author VARCHAR(255) REFERENCES users(username),
      body TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      votes INT DEFAULT 0,
      article_img_url VARCHAR(1000)
      );
      `,
      );
    })
    .then(() => {
      return db.query(
        `
      CREATE TABLE comments (
      comment_id SERIAL PRIMARY KEY,
      article_id INT REFERENCES articles(article_id) NOT NULL,
      body TEXT,
      votes INT DEFAULT 0,
      author VARCHAR(40) REFERENCES users(username),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      `,
      );
    })
    .then(() => {
      const formattedTopics = topicData.map((topic) => {
        return [topic.slug, topic.description, topic.img_url];
      });
      const queryStr = format(
        `INSERT INTO topics (slug, description, img_url) VALUES %L RETURNING *;`,
        formattedTopics,
      );
      // console.log(queryStr, " << this is the queryStr");
      return db.query(queryStr);
    })
    .then(() => {
      const formattedUsers = userData.map((user) => {
        return [user.username, user.name, user.avatar_url];
      });
      const queryStr = format(
        `INSERT INTO users (username, name, avatar_url) VALUES %L RETURNING *;`,
        formattedUsers,
      );
      return db.query(queryStr);
    })
    .then(() => {
      const formattedArticles = articleData.map((article) => {
        return [
          article.title,
          article.topic,
          article.author,
          article.body,
          article.created_at,
          article.votes,
          article.article_img_url,
        ];
      });
      const queryStr = format(
        `INSERT INTO articles (title, topic, author, body, created_at, votes, article_img_url) VALUES %L RETURNING *;`,
        formattedArticles,
      );
      return db.query(queryStr);
    })
    .then((result) => {
      const articles = result.rows;
      const formattedComments = commentData.map((comment) => {
        for (const article of articles) {
          if (article.title === comment.article_title) {
            comment.article_id = article.article_id;
            return [
              comment.article_id,
              comment.body,
              comment.votes,
              comment.author,
              comment.created_at,
            ];
          }
        }
      });
      const queryStr = format(
        `INSERT INTO comments (article_id, body, votes, author, created_at) VALUES %L RETURNING *;`,
        formattedComments,
      );
      return db.query(queryStr);
    });
};

module.exports = seed;
