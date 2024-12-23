import "./questionPage.css";
// import { FaRegArrowAltCircleRight } from "react-icons/fa";
// import { FaCircle } from 'react-icons/fa'; // Import the icon from React Icons
import  { useContext, useState } from "react";
import { UserLoginInfo } from '../../../App'
import axios from '../../../axiosConfig'
import  {useRef} from 'react'
import Swal from 'sweetalert2'
import { IoIosArrowDropright } from "react-icons/io";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';



function QuestionPage() {

   const { user } = useContext(UserLoginInfo); // Destructure user from context
   const [loading, setLoading]=useState(false)

   const titleDom=useRef()
   const descriptionDom=useRef()
   const questionidDom=useRef()

   async function hadleQuestionPost(e){
    e.preventDefault();
    setLoading(true)
   console.log( String(user.userid))
   try {
      await axios.post('/question/postquestion', {
       questionid: questionidDom.current.value,
       userid:String(user.userid),
       title:  titleDom.current.value,
       description: descriptionDom.current.value,
       tag:"tag"
      
      });
      setLoading(false)
      await Swal.fire({
        title: "Success!",
        text: "question is successfully recorded!",
        icon: "success",
        confirmButtonText: "OK"
      })
      
   } catch (error) {
    console.log(error.response)
    
   }
  }
  return (
    
      <div>
        <div className="steps_toFollow">
          <h3>Steps for writing a good question</h3>
          <ul className={{}}>
            <li><IoIosArrowDropright size="25" style={{gap:'30px'}}/>  Summerize your question in a one-line title. </li> 
            <li > <IoIosArrowDropright size="25" style={{gap:'30px'}}/>Describe your problem in more detail.</li> 
              <li > <IoIosArrowDropright size="25" style={{gap:'30px'}}/>Describe what you tried and what you expected to happen.</li> 
             <li > <IoIosArrowDropright size="25" style={{gap:'30px'}}/>Review your question and post it to the site.</li>
          </ul>
        </div>
        
        <div className="question_form">
          <div className="question_title">
            <h3>Post your questions</h3>
           {loading ?
            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
           </Box>:
          ""
          }
          </div>
          <form  onSubmit={hadleQuestionPost} action="/submit" method="POST">
            <input type="text" placeholder="Title" ref={titleDom}/>

            <textarea placeholder="Question Description..." ref={descriptionDom}/>
            <input type="text" placeholder="Questionid" ref={questionidDom}/>

            <button type="submit">Post Your Question</button>
          </form>
          
        </div>
      </div>
   
  );
}

export default QuestionPage;
