let mongoose = require("mongoose");

let taskSchema = mongoose.Schema(
  {
    board: String,
    task: String,
    person_allocated: String,
    p_email: String,
    status: String,
    start_date: Date,
    end_date: Date,
    extra: String,
    user: String,
  },
  {
    versionKey: false,
  }
);

let TaskModel = mongoose.model("task", taskSchema);

module.exports = {
  TaskModel,
};
