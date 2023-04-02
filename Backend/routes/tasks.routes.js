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

// taskRouter.get("/", async (req, res) => {
//   let token = req.headers.authorization;
//   let decoded = jwt.verify(token, "monday");
//   let {
//     board,
//     task,
//     status,
//     person_allocated,
//     p_email,
//     start_date,
//     end_date,
//     user,
//     sortby,
//     page,
//     limit,
//   } = req.query;
//   try {
//     if (decoded) {
//       let query = {};
//       if (board) {
//         query.board = { $regex: board, $options: "i" };
//       }
//       if (task) {
//         query.task = { $regex: task, $options: "i" };
//       }
//       if (status) {
//         query.status = { $regex: status, $options: "i" };
//       }
//       if (person_allocated) {
//         query.person_allocated = { $regex: person_allocated, $options: "i" };
//       }

//       if (p_email) {
//         query.p_email = { $regex: p_email, $options: "i" };
//       }
//       if (start_date) {
//         query.start_date = { $gte: new Date(start_date) };
//       }
//       if (end_date) {
//         query.end_date = { $lte: new Date(end_date) };
//       }

//       query.user = decoded.userID;

//       let sort = {};

//       if (sortby) {
//         sort[sortby] = 1;
//       }

//       let pagenumber = Number(page) || 1;
//       let pagelimit = Number(limit) || 10;
//       let skip = (pagenumber - 1) * pagelimit;

//       let tasks = await TaskModel.find(query)
//         .sort(sort)
//         .skip(skip)
//         .limit(pagelimit);
//       res.status(200).send({ msg: `Here are all the tasks `, tasks });
//     }
//   } catch (error) {
//     res.status(400).send({ msg: error.message });
//   }
// });

taskRouter.get("/", async (req, res) => {
  let token = req.headers.authorization;
  let decoded = jwt.verify(token, "monday");
  let {
    board,
    task,
    status,
    person_allocated,
    p_email,
    start_date,
    end_date,
    user,
    sortbyasc,
    sortbydesc,
    page,
    limit,
    search,
    fields,
  } = req.query;
  try {
    if (decoded) {
      let query = {};
      if (search) {
        query["$or"] = fields
          .split(",")
          .map((field) => ({ [field]: { $regex: search, $options: "i" } }));
      }
      if (board) {
        query.board = { $regex: board, $options: "i" };
        // query.board = board;
      }
      if (task) {
        query.task = { $regex: task, $options: "i" };
      }
      if (status) {
        query.status = { $regex: status, $options: "i" };
      }
      if (person_allocated) {
        query.person_allocated = { $regex: person_allocated, $options: "i" };
        // query.person_allocated = person_allocated;
      }

      if (p_email) {
        query.p_email = { $regex: p_email, $options: "i" };
      }
      if (start_date) {
        query.start_date = { $gte: new Date(start_date) };
      }
      if (end_date) {
        query.end_date = { $lte: new Date(end_date) };
      }

      query.user = decoded.userID;

      let sort = {};

      if (sortbyasc) {
        sort[sortbyasc] = 1;
      }

      if (sortbydesc) {
        sort[sortbydesc] = -1;
      }

      let pagenumber = Number(page) || 1;
      let pagelimit = Number(limit) || 10;
      let skip = (pagenumber - 1) * pagelimit;

      let tasks = await TaskModel.find(query)
        .sort(sort)
        .skip(skip)
        .limit(pagelimit);
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
