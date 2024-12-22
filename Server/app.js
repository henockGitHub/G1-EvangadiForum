require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const port = 5500;

// database connection
const dbconnection = require("./db/dbConfig");
// user route middleware
// console.log(process.env.JWT_SECRET)
const useRoutes = require("./Route/userRoute");
const useRoutes2 = require("./Route/questionRoute");
const useRoutes3 = require("./Route/answerRoute");
// json middleware to extract json data
app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// user route
app.use("/api/answer", useRoutes3);
app.use("/api/users", useRoutes);
app.use("/api/question", useRoutes2);
// question Route

// answer ROute

async function start() {
  try {
    const result = await dbconnection.execute("select 'test'");
  } catch (error) {
    console.log(error.message);
  }
}
start();
app.listen(5500, (err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log(`listening on ${port}`);
  }
});
