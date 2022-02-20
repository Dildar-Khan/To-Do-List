const Task = require("../models/tasks.model");

exports.addTask = (req, res) => {
  const task = new Task({
    taskName: req.body.taskName,
    inProgress: req.body.inProgress,
    done: req.body.done,
    createdBy: req.userData.userId,
  });

  task
    .save()
    .then((createdTask) => {
      res.status(200).json({
        message: "task created",
        task: {
          id: createdTask._id,
          taskName: createdTask.taskName,
          inProgress: createdTask.inProgress,
          done: createdTask.done,
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "task creation failed",
      });
    });
};

exports.updateTask = (req, res) => {
  Task.findOneAndUpdate({ _id: req.params.id, createdBy: req.userData.userId }, req.body, { new: true })
    .then((result) => {
      if (result) {
        res.status(200).json({ message: "Updated Successfully!" });
      } else {
        res.status(401).json({ message: "Not Authorized!" });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Task not updated!",
      });
    });
};

exports.deleteTask = (req, res) => {
  Task.findOneAndRemove({ _id: req.params.id, createdBy: req.userData.userId })
    .then((result) => {
      if (result) {
        res.status(200).json({ message: "Post Deleted!" });
      } else {
        res.status(401).json({ message: "Not Authorized!" });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Deletion failed!",
      });
    });
};

exports.getAllTasks = (req, res) => {
  Task.find({ createdBy: req.userData.userId })
    .then((documents) => {
      return res.status(200).json({
        message: "Tasks are fetching now!",
        tasks: documents,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "fetching tasks failed!",
      });
    });
};
