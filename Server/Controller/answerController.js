// database connection
const dbconnection = require("../db/dbConfig");
const bcrypt = require("bcrypt");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
async function postAnswer(req, res) {
  const { userid, questionid, answer } = req.body;
  const userid1 = parseInt(userid);

  console.log(userid, questionid, answer);
  if (!answer) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "please, provide your answer" });
  }
  try {
    await dbconnection.query(
      "insert into answers ( userid, questionid, answer) values ( ?, ?, ?)",
      [userid1, questionid, answer]
    );
    return res
      .status(StatusCodes.CREATED)
      .json({ message: "Answer posted successfully" });
  } catch (err) {
    //    console.log(err);
    return res
      .status(500)
      .json({
        message: "something went wrong, please try again later  " + err,
      });
  }
}

module.exports = { postAnswer };
