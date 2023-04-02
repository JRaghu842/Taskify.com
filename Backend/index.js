let express = require("express");
let app = express();
let cors = require("cors");
let chartjs = require("chart.js");
require("dotenv").config();

const { connection } = require("./db");
const { taskRouter } = require("./routes/tasks.routes");
const { userRouter } = require("./routes/users.routes");
const { auth } = require("./middlewares/auth.middleware");

app.use(express.json());
app.use(cors());

app.use("/users", userRouter);
app.use(auth);
app.use("/tasks", taskRouter);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Connected to MongoDBAtlas");
  } catch (error) {
    console.log("Not able to Connect to DB");
    console.log(error);
  }
  console.log(`Server is live at port ${process.env.port}`);
});
