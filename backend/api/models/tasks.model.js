const mongoose = require("mongoose");
const taskSchema = mongoose.Schema({
  taskName: { type: String, required: true },
  inProgress: { type: Boolean, required: true },
  done: { type: Boolean, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});
module.exports = mongoose.model("Tasks", taskSchema);
