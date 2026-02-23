const cors = require("cors");
const express = require("express");
const app = express();
const topicsRouter = require("./routes/topics.routes");
const articlesRouter = require("./routes/articles.router");
const usersRouter = require("./routes/users.router");
const commentsRouter = require("./routes/comments.router");
const NotFoundError = require("./errors/NotFoundError");
const BadRequestError = require("./errors/BadRequestError");

// app.use(cors());

app.use(express.json());

app.use("/api/topics", topicsRouter);
app.use("/api/articles", articlesRouter);
app.use("/api/users", usersRouter);
app.use("/api/comments", commentsRouter);

app.all("/*path", (req, res, next) => {
  res.status(404).send({ msg: "Path not found" });
});

app.use((err, req, res, next) => {
  if (err instanceof NotFoundError) {
    res.status(404).send({ msg: err.message });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  if (err instanceof BadRequestError) {
    res.status(400).send({ msg: err.message });
  } else {
    next(err);
  }
});
app.use((err, req, res, next) => {
  res.status(500).send({ msg: "server error" });
});

module.exports = app;
