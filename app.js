const express = require("express");
const app = express();
const topicsRouter = require("./routes/topics.routes");

app.use(express.json());

app.use("/api/topics", topicsRouter);
module.exports = app;
