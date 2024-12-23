// import LayOut from "../Layout/Layout";
import { FaCircleArrowRight } from "react-icons/fa6";
import {useState,useEffect,useRef, useContext} from 'react'
import {useParams} from 'react-router-dom'

import { UserLoginInfo } from "../../App";
import axios from '../../axiosConfig'


import userAvatar from "../../assets/icons/user-avatar.svg";
import "./Answer.css";
import Swal from 'sweetalert2'
// import CircularProgress from '@mui/material/CircularProgress';
// import Box from '@mui/material/Box';

function Answer() {

    // Destructure user from context
  const [loading, setLoading]=useState(false)   
  const { questionID } = useParams();
  const { user } = useContext(UserLoginInfo);
  const [questionDetils, setQuestionDetils] =useState({
    title: "",
    description: "",
    answers: [], // Ensure this is initialized
  });
  const [loading1,setLoading1]=useState([false])
  const today = new Date();
  const formattedDate = today.toISOString().split('T')[0];
  
  useEffect(() => {
  const fetchQuestionData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/question/getquestion/${questionID}`);
      setQuestionDetils(response.data);
    } catch (error) {
      console.error("Error fetching question:", error);
    } finally {
      setLoading1(false);
    }
  };

  fetchQuestionData();
}, [questionID]);

const answerDom=useRef()
// function to handle answer insertion
async function hadleAnswerPost(e){
  setLoading1(true);
  e.preventDefault();
  console.log(questionDetils)
   console.log(user.userid, questionDetils.id, answerDom.current.value)
 try {
    await axios.post('/answer/postanswer', {
     userid:String(user.userid),
     questionid:questionDetils.id,
     answer: answerDom.current.value
     
    });
   setLoading1(false)
    await Swal.fire({
           title: "Success!",
           text: "Answer is successfully recorded!",
           icon: "success",
           confirmButtonText: "OK"
         })
 } catch (error) {
  console.log(error.response)
  
 }
}
  
  
  return (
    <div className="answer">
      <div className="answer--container">
        {/* // answer header */}
        <div className="answer-header">
          <h1>Question</h1>

          <div className="answer-header-question">
            <div className="answer-header-question-title">
              <span>
                <FaCircleArrowRight size={20} />
              </span>
              <h4>{`Question Title:   ${questionDetils.title}`}</h4>
            </div>
            <span className="answer-title-underline "></span>
            <div className=" question_description2 ">
              <h3>Question Description:<br/></h3>
               <span className="question_description question_description"> {questionDetils.description || "No description available"} </span>
              
            </div>
            <span className="answer-header-question-date ">
              <br/>
              {`Question created Date :${formattedDate}`}
            </span>
          </div>
        </div>

        <hr />
        {/* Answer comity header title */}
        <h3>Answers From The Community</h3>
        <hr />

     
        {questionDetils.answers.length > 0 ? (
          questionDetils.answers.map((answer1, index) => (
            <div key={index}>
             <img
                  src={userAvatar}
                  style={{ width: "30px", height: "30px" }}
                  alt="user"
                />
                <span> {answer1.username} </span>
              <span className="question_description">{answer1.answer || "No text provided"}</span>
              <br />
            </div>
          ))
        ) : (
          <p>No answers available for this question.</p>
        )}
        <div className="answer-ofList-container">
          <>
            <div className="answer--question-card">
              <div className="answer--question-card-user">
                <img
                  src={userAvatar}
                  style={{ width: "30px", height: "30px" }}
                  alt="user"
                />
                <span>{`User Name: ${user.username}`}</span>
              </div>
              {/* {loading1 ?
            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
           </Box>:
          ""
          } */}
              <div className="answer--question-card-title">
                
              </div>
              <span className="answer--question-card-date">
                {formattedDate}
              </span>
            </div>
            <hr />
          </>
          <p style={{color:'blue'}}>Answers</p>
        </div>

        {/* Answer content */}
        <form onSubmit={hadleAnswerPost} className="answer-content">
          <textarea rows="6" cols="100" placeholder="Your answer ...." ref={answerDom} onClick={hadleAnswerPost}/>
          <button type="submit">Post Answer </button>
        </form>
      </div>
    </div>
  );
}

export default Answer;
