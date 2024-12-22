
const express = require('express');
const router = express.Router();
const authMiddleware=require('../Middleware/authMiddleware')


const {postQuestion,getQuestionAndAnswer,allquestion, postAnswer}= require('../Controller/questionControler')

// Route to post question 
router.post("/postquestion", postQuestion);

// Route to get specific question
router.get('/getquestion/:questionID', getQuestionAndAnswer);

// Route to get all questions
router.get('/allquestion',allquestion);

// Export the router module
module.exports = router;
