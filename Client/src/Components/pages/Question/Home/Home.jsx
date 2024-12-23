

// import React, { useContext, useEffect,useState } from "react";
// import classes from "./Home.module.css";
// import { UserLoginInfo } from "../../../App"; // Ensure the correct path to context
// import thumnail from "../../../assets/images/thumnail2.jpg";
// import {Link} from 'react-router-dom'

// import axios from '../../../axiosConfig'
// import {useNavigate} from 'react-router-dom'
// import Questionpage from '../QuestionPage/QuestionPage'

// function Home() {
//   const { user } = useContext(UserLoginInfo); // Destructure user from context

//   // Mocked list of questions (replace this with actual data if available)
//   // const questions = [
//   //   { id: 1, title: "What is JavaScript?", userName: "Sisay" },
//   //   { id: 2, title: "How to use React Hooks?", userName: "Alem" },
//   // ];
//   const navigate=useNavigate()

//   const [questions,setQuestion]=useState([])
  
//   const clickHandler = () => {
   
//     navigate("/question")
//   }

//   const getquestion = async ()=>{
//     try {
         

//       const questionData = await axios.get("/question/allquestion")
//         .then((res) => res.data);
     
//       setQuestion(questionData.allquestions); // Store the user data in state so that it can be accessed by others too
//       // console.log(questionData.allquestions)  
      
     
     
//     } catch (error) {
     
//       console.log(error);
      
//     }
//   }
//   useEffect(() => {
   
//    getquestion ()
// }, []);
//   return (
//     <div id="root">
//     <div className={classes.container}>
//       {/* Header Section */}
//       <header className={classes.header}>
//         <button className={classes.ask_btn} onClick={clickHandler}>Ask Question</button>
//         <div>
//           <span className={classes.welcome_text}>Welcome:</span>{" "}
//           <span className={classes.username}>
//             {user.username } {/* Fallback for guest users */}
//           </span>
         
//         </div>
       
//       </header>


//       {/* Search Section */}
//       <section className={classes.search_container}>
//         <input
//           type="text"
//           placeholder="Search question"
//           className={classes.search_bar}
//         />
//       </section>

//       <h2 style={{color:'#0056b3', paddingLeft:'20px'}}> Questions</h2>
//       <hr />

//       {/* Question List Section */}
//       <section className={classes.question_container} >
//       {questions.map((question) => (
        
        
//           <Link  key={question.questionid} to={`/answer/${question.questionid}`} className={classes.link} >
                
//            <article  className={classes.question}   >
//             <div className={classes.avatar}>
//             <img
//                 src={thumnail}
//                 alt="User Avatar"
//                 className={classes.thumbnail}
//                 width="25" height="25"
//                 />
//             </div>
//             <div className={classes.question_content}>
//               <p className={classes.question_title}>{question.title}</p>
//               <p className={classes.user_name}>{question.username}</p>
//             </div>
//             <div className={classes.arrow_icon}>&gt;</div>
            
//             {/* Divider (horizontal line) */}
            
           
//           </article>
//           <hr />
//         </Link>
        
//   ))}
//       </section>
   
//     </div>
//     </div>
//   );
// }

// export default Home;
import  { useContext, useEffect, useState } from "react";
import classes from "./Home.module.css";
import { UserLoginInfo } from "../../../App"; // Ensure the correct path to context
import thumnail from "../../../assets/images/thumnail2.jpg";
import { Link } from "react-router-dom";
import axios from "../../../axiosConfig";
import { useNavigate } from "react-router-dom";

function Home() {
  const { user } = useContext(UserLoginInfo);
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State to hold search input

  const clickHandler = () => {
    navigate("/question");
  };

  const getQuestions = async () => {
    try {
      const questionData = await axios.get("/question/allquestion").then((res) => res.data);
      setQuestions(questionData.allquestions);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getQuestions();
  }, []);

  // Filtered questions based on searchTerm
  const filteredQuestions = questions.filter((question) =>
    question.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div id="root">
      <div className={classes.container}>
        {/* Header Section */}
        <header className={classes.header}>
          <button className={classes.ask_btn} onClick={clickHandler}>
            Ask Question
          </button>
          <div>
            <span className={classes.welcome_text}>Welcome:</span>{" "}
            <span className={classes.username}>{user.username}</span>
          </div>
        </header>

        {/* Search Section */}
        <section className={classes.search_container}>
          <input
            type="text"
            placeholder="Search question"
            className={classes.search_bar}
            value={searchTerm} // Bind input value to searchTerm
            onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm on input change
          />
        </section>

        <h2 style={{ color: "#0056b3", paddingLeft: "20px" }}> Questions</h2>
        <hr />

        {/* Question List Section */}
        <section className={classes.question_container}>
          {filteredQuestions.map((question) => (
            <Link key={question.questionid} to={`/answer/${question.questionid}`} className={classes.link}>
              <article className={classes.question}>
                <div className={classes.avatar}>
                  <img
                    src={thumnail}
                    alt="User Avatar"
                    className={classes.thumbnail}
                    width="25"
                    height="25"
                  />
                </div>
                <div className={classes.question_content}>
                  <p className={classes.question_title}>{question.title}</p>
                  <p className={classes.user_name}>{question.username}</p>
                </div>
                <div className={classes.arrow_icon}>&gt;</div>
              </article>
              <hr />
            </Link>
          ))}
        </section>
      </div>
    </div>
  );
}

export default Home;
