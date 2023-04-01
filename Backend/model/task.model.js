let mongoose = require("mongoose");

let taskSchema = mongoose.Schema(
  {
    board: { type: String, required: true },
    task: { type: String, required: true },
    person_allocated: { type: String, required: true },
    p_email: { type: String, optional: true },
    status: { type: String, optional: true },
    start_date: { type: Date, optional: true },
    end_date: { type: Date, optional: true },
    extra: { type: String, optional: true },
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
