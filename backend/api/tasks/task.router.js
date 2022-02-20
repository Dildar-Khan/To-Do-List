const express = require("express");
const { addTask, updateTask, getAllTasks, deleteTask } = require("./task.controller");
const checkAuth = require("../middlewares/check-auth");

const taskRouter = express.Router();

taskRouter.post("/addTask", checkAuth, addTask);
taskRouter.put("/updateTask/:id", checkAuth, updateTask);
taskRouter.get("/", checkAuth, getAllTasks);
taskRouter.delete("/delete/:id", checkAuth, deleteTask);

module.exports = taskRouter;
