const express = require("express");
const router = express.Router();

//  user controller
const { postAnswer } = require("../Controller/answerController");

// Route for posting answer
router.post("/postanswer", postAnswer);

module.exports = router;
