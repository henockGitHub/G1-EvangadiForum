// import  {useRef} from 'react'
// import axios from '../../axiosConfig'
// import  './user.css';
// import {useNavigate, Link} from 'react-router-dom'
// import Swal from 'sweetalert2'


// function login() {
//   const navigate=useNavigate()
 
//   const emailDom=useRef()
//   const passwordDom=useRef()

 

//   // to handle how button
//   const howHandle=()=>{
//       navigate("/HowItWorks")
//   }
//   async function hadleform(e){
//     e.preventDefault();
   
//    try {
//       const axiosResponse = await axios.post('/users/login', {
      
//        email: emailDom.current.value,
//        password: passwordDom.current.value
//       })
//       .then((response) => response.data);
      
//       localStorage.setItem("user-token", axiosResponse.token); // Store the token in local storage
//       // console.log(response.data.token)
//       await Swal.fire({
//         title: "Success!",
//         text: "User Loggedin successfully!",
//         icon: "success",
//         confirmButtonText: "OK"
//       })
//      navigate("/")
//    } catch (error) {
//     console.log(error)
//     console.log("hello")
//     await Swal.fire({
//       title: "error",
//       text: "error",
//       icon: "error",
//       confirmButtonText: "OK"
//     })
    
//    }
//   }
//   return (
   
//     <div className="container_forum">
     
//     <section>
  
          
//           <div className="main_body">

         
//           <form className="form" onSubmit={hadleform} action="/submit" method="POST">
//               <center>
//               <p style={{fontFamily:'Arial'}}>LogIn into your account <br/><br/> </p>
//               <span> Don't have an account? <Link to="/register" className=""> Create account </Link> </span>
//               </center>  
              
              

              
//               <input type="text" id="username" name="email" placeholder=" email"  ref={emailDom} required />
              
              
//               <input type="password" id="password" name="password" placeholder="your password" ref= {passwordDom} required />
//               <Link to="" style={{ textAlign: 'right'}}>Forgot Password</Link>
              
              
//               <button className="form_button" type="submit">Login</button>
//               <center>
//               <span> I agree to the <Link to="/privacy" >privacy policy</Link> and <Link to="">terms of services </Link><br />  </span>
//               </center>
//               </form>
//           <div className="text_sec">
//                <Link to="/about">
//                <span style={{color:'#FF8C00', fontSize:'20px'}}>About </span> 
//                </Link> 
//                 <br/> <br/>
//                <span className="title_text">Evangadi Networks</span> <br/><br/>

//                <span>No matter what stage of life you are in, whether you’re just starting elementary school or being promoted to CEO of a Fortune 500 company, you have much to offer to those who are trying to follow in your footsteps.

//                 Wheather you are willing to share your knowledge or you are just looking to meet mentors of your own, please start by joining the network here. </span> <br/><br/>
//                 <button className="how_button" onClick={howHandle}> HOW IT WORK</button>
//             </div>
   
//           </div>
         
//     </section>
    
//     </div>
  
//   )
// }

// export default login
import  {useRef, useState} from 'react'
import axios from '../../axiosConfig'
import  './user.css';
import {useNavigate, Link} from 'react-router-dom'
import Swal from 'sweetalert2'
import { AuthContext } from '../../Hooks/AuthContext';
import { useContext } from 'react';


function login() {
  const navigate=useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const emailDom=useRef()
  const passwordDom=useRef()
  const { login } = useContext(AuthContext);

 
  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };
  // to handle how button
  const howHandle=()=>{
      navigate("/HowItWorks")
  }
  async function hadleform(e){
    e.preventDefault();
   
   try {
      const axiosResponse = await axios.post('/users/login', {
      
       email: emailDom.current.value,
       password: passwordDom.current.value
      })
      .then((response) => response.data);
      console.log(axiosResponse.data)
      localStorage.setItem("user-token", axiosResponse.token);
      login(); // Update login state
      // Store the token in local storage
      // console.log(response.data.token)
      await Swal.fire({
        title: "Success!",
        text: "User Loggedin successfully!",
        icon: "success",
        confirmButtonText: "OK"
      })
     navigate("/")
   } catch (error) {
    console.log(error)
    console.log("hello")
    await Swal.fire({
      title: "error",
      text: "error",
      icon: "error",
      confirmButtonText: "OK"
    })
    
   }
  }
  return (
   
    <div className="container_forum">
     
    <section>
  
          
          <div className="main_body">

         
          <form className="form" onSubmit={hadleform} action="/submit" method="POST">
              <center>
              <p style={{fontFamily:'Arial'}}>LogIn into your account <br/><br/> </p>
              <span> Don't have an account? <Link to="/register" className=""> Create account </Link> </span>
              </center>  
              
              

              
              <input type="text" id="username" name="email" placeholder=" email"  ref={emailDom} className="input1" required />
              
              <div className="input-container">

              <input type={showPassword ? "text" : "password"}
                      name="password"
                      id="password" 
                       placeholder="your password" 
                      ref= {passwordDom} 
                       required />
                <button type="button" onClick={handleTogglePassword} className="icon-button" >
                  {showPassword ? "🙉" : "🙈"}
               </button>
              </div>
              <Link to="" style={{ textAlign: 'right'}}>Forgot Password</Link>
              
              
              <button className="form_button" type="submit">Login</button>
              <center>
              <span> I agree to the <Link to="/privacy" >privacy policy</Link> and <Link to="">terms of services </Link><br />  </span>
              </center>
              </form>
          <div className="text_sec">
               <Link to="/about">
               <span style={{color:'#FF8C00', fontSize:'20px'}}>About </span> 
               </Link> 
                <br/> <br/>
               <span className="title_text">Evangadi Networks</span> <br/><br/>

               <span>No matter what stage of life you are in, whether you’re just starting elementary school or being promoted to CEO of a Fortune 500 company, you have much to offer to those who are trying to follow in your footsteps.

                Wheather you are willing to share your knowledge or you are just looking to meet mentors of your own, please start by joining the network here. </span> <br/><br/>
                <button className="how_button" onClick={howHandle}> HOW IT WORK</button>
            </div>
   
          </div>
         
    </section>
    
    </div>
  
  )
}

export default login
