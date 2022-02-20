const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { devConfig } = require("./config/devConfig");

const restRouter = require("./api/index");

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(devConfig.database, { useNewUrlParser: true })
  .then((db) => {
    console.log("Database is connected now");
  })
  .catch((error) => console.log(error));

app.use("/api", restRouter);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.message = "Invalid route";
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  return res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
