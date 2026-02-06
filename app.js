const express = require("express");
const app = express();
const topicsRouter = require("./routes/topics.routes");
const articlesRouter = require("./routes/articles.router");
const usersRouter = require("./routes/users.router");
const NotFoundError = require("./errors/NotFoundError");

app.use(express.json());

app.use("/api/topics", topicsRouter);
app.use("/api/articles", articlesRouter);
app.use("/api/users", usersRouter);

app.all("/*path", (req, res, next) => {
  res.status(404).send({ msg: "Path not found" });
});

app.use((err, req, res, next) => {
  if (err instanceof NotFoundError) {
    res.status(404).send({ msg: err.message });
  }
});

module.exports = app;
