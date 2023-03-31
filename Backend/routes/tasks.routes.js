let express = require("express");
let taskRouter = express.Router();
let jwt = require("jsonwebtoken");

let { TaskModel } = require("../model/task.model");

taskRouter.post("/add", async (req, res) => {
  try {
    let task = new TaskModel(req.body);
    await task.save();
    res.status(200).send({ msg: "task has been added" });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

taskRouter.get("/", async (req, res) => {
  let token = req.headers.authorization;
  let decoded = jwt.verify(token, "monday");
  try {
    if (decoded) {
      let tasks = await TaskModel.find({ user: decoded.userID });
      res.status(200).send({ msg: `Here are all the tasks `, tasks });
    }
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

taskRouter.get("/:id", async (req, res) => {
  let id = req.params.id;
  try {
    let task = await TaskModel.find({ _id: id });
    res.status(200).send(task);
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

taskRouter.patch("/update/:id", async (req, res) => {
  let payload = req.body;
  let id = req.params.id;
  try {
    await TaskModel.findByIdAndUpdate({ _id: id }, payload);
    res.status(200).send({ msg: "tasks has been updated" });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

taskRouter.delete("/delete/:id", async (req, res) => {
  let id = req.params.id;
  try {
    await TaskModel.findByIdAndDelete({ _id: id });
    res.status(200).send({ msg: "tasks has been deleted" });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

module.exports = {
  taskRouter,
};
