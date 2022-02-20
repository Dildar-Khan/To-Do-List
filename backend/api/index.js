const express = require("express");

const authRouter = require("./auth/auth.router");
const taskRouter = require("./tasks/task.router");

const restRouter = express.Router();

restRouter.use("/auth", authRouter);
restRouter.use("/tasks", taskRouter);

module.exports = restRouter;
