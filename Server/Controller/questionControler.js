// database connection
const dbconnection=require('../db/dbConfig')
const bcrypt=require('bcrypt')
const {StatusCodes}=require('http-status-codes')
const jwt=require('jsonwebtoken')
async function postQuestion(req, res) {
    const { questionid, userid, title, description, tag } = req.body;
    const  userid1=parseInt(userid)
    // Create a new date object
    // const currentTimestamp = new Date();
  
    // // Adjust the time by UTC+3 hours
    // const adjustedDate = new Date(
    //   currentTimestamp.getTime() + 3 * 60 * 60 * 1000
    // );
  
    // Format the date as 'YYYY-MM-DD HH:mm:ss'
    // const formattedTimestamp = adjustedDate
    //   .toISOString()
    //   .slice(0, 19)
    //   .replace("T", " ");
    console.log(userid,title, description)
    if (!userid || !title || !description) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "All fields are required" });
    }
    // const questionid_encript = crypto.randomBytes(10).toString("hex");
    try {
      await  dbconnection.query(
        "insert into questions (questionid, userid, title, description, tag) values ( ?, ?, ?, ?, ?)",
        [questionid, userid1, title, description, tag]
      );
      return res
        .status(StatusCodes.CREATED)
        .json({ message: "question posted successfully" });
    } catch (err) {
      //    console.log(err);
      return res
        .status(500)
        .json({ message: "something went wrong, please try again later  "  + err });
    }
  }
  
  async function getQuestionAndAnswer(req, res) {
    const questionid = req.params.questionID;
    console.log(questionid)
    try {
      const [rows] = await dbconnection.query(
        `SELECT 
            q.questionid, 
            q.title, 
            q.description, 
           
            u2.username as question_username,
            a.answerid, 
            a.userid AS answer_userid, 
            a.answer,
            
            u.username as answer_username
         FROM 
            questions q   
         LEFT JOIN 
            answers a ON q.questionid = a.questionid
            LEFT JOIN users u on u.userid = a.userid
            left join users u2 on u2.userid = q.userid
         WHERE 
            q.questionid = ?
            order by a.answerid desc
            `,
        [questionid]
      );
  
      // Check if the question exists
      if (rows.length === 0) {
        try {
            const [rows] = await dbconnection.query( `SELECT 
    u.userid, 
    u.username, 
    q.questionid, 
    q.title, 
    q.description
    FROM 
        user u
    INNER JOIN 
        question q
    ON 
    u.userid = q.userid 
    WHERE 
            q.questionid = ?` ,
            [questionid])
        } catch (error) {
            
        }
        // return res
        //   .status(StatusCodes.BAD_REQUEST)
        //   .json({ message: "Question not found" });
      }
  
      // Reshape the data to include answers under the question
      const questionDetails = {
        id: rows[0].questionid,
        title: rows[0].title,
        description: rows[0].description,
        qtn_createdAt: rows[0].question_createdAt,
        qtn_username: rows[0].question_username,
        answers: rows
          .map((answer) => ({
            answerid: answer.answerid,
            userid: answer.answer_userid,
            username: answer.answer_username,
            answer: answer.answer,
            createdAt: answer.createdAt,
          }))
          .filter((answer) => answer.answerid !== null), // Filter out any null answers
      };
  
      res.status(StatusCodes.OK).json(questionDetails);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Error fetching question details" + error });
    }
  }
async function allquestion(req,res){
    // const [allquestions] = await dbconnection.query("select userid,description,questionid, title from questions order by id DESC ")
    const [allquestions] = await dbconnection.query("SELECT  questions.id,questions.questionid,  questions.title, questions.description, users.username FROM  questions INNER JOIN users ON  questions.userid = users.userid order by questions.id DESC ")
    res.status(StatusCodes.OK).json({msg: "valid result", allquestions})
    
}

module.exports={postQuestion,getQuestionAndAnswer,allquestion}
