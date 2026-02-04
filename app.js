const express = require("express");
const app = express();
const topicsRouter = require("./routes/topics.routes");
const articlesRouter = require("./routes/articles.router");

app.use(express.json());

app.use("/api/topics", topicsRouter);
app.use("/api/articles", articlesRouter);
module.exports = app;
