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
import { useRef, useState } from 'react'; // Importing hooks and state management from React
import axios from '../../axiosConfig'; // Importing axios for making HTTP requests
import './user.css'; // Importing CSS for styling the component
import { useNavigate, Link } from 'react-router-dom'; // Importing navigation hooks and Link component from react-router
import Swal from 'sweetalert2'; // Importing SweetAlert2 for alert dialogs
import { AuthContext } from '../../Hooks/AuthContext'; // Importing AuthContext for authentication management
import { useContext } from 'react'; // Importing useContext for accessing context

function Login() { // Function component named 'Login'
  const navigate = useNavigate(); // Hook to programmatically navigate
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
  const emailDom = useRef(); // Ref for email input
  const passwordDom = useRef(); // Ref for password input
  const { login } = useContext(AuthContext); // Deconstructing 'login' function from AuthContext

  const handleTogglePassword = () => { // Function to toggle password visibility
    setShowPassword((prev) => !prev);
  };

  // Function to handle navigation to the 'How It Works' page
  const howHandle = () => {
    navigate("/HowItWorks");
  }

  async function handleForm(e) { // Async function to handle form submission
    e.preventDefault(); // Preventing default form submission behavior

    try {
      // Making a POST request for user login with email and password
      const axiosResponse = await axios.post('/users/login', {
        email: emailDom.current.value,
        password: passwordDom.current.value
      }).then((response) => response.data);

      console.log(axiosResponse.data);
      localStorage.setItem("user-token", axiosResponse.token); // Storing token in local storage
      login(); // Updating the login state through context
      await Swal.fire({ // Displaying success alert
        title: "Success!",
        text: "User Logged in successfully!",
        icon: "success",
        confirmButtonText: "OK"
      });
      navigate("/"); // Redirecting to the homepage
    } catch (error) {
      console.log(error);
      await Swal.fire({ // Displaying error alert
        title: "Error",
        text: "An error occurred during login.",
        icon: "error",
        confirmButtonText: "OK"
      });
    }
  }

  return (
    <div className="container_forum">
      <section>
        <div className="main_body">
          <form className="form" onSubmit={handleForm} action="/submit" method="POST">
            <center>
              <p style={{ fontFamily: 'Arial' }}>Log in to your account <br /><br /></p>
              <span> Don't have an account? <Link to="/register" className=""> Create account </Link> </span>
            </center>
            <input type="text" id="username" name="email" placeholder=" Email" ref={emailDom} className="input1" required />
            <div className="input-container">
              <input type={showPassword ? "text" : "password"}
                     name="password"
                     id="password"
                     placeholder="Your password"
                     ref={passwordDom}
                     required />
              <button type="button" onClick={handleTogglePassword} className="icon-button">
                {showPassword ? "🙉" : "🙈"} {/* Toggle icon for password visibility */}
              </button>
            </div>
            <Link to="" style={{ textAlign: 'right' }}>Forgot Password?</Link>
            <button className="form_button" type="submit">Login</button>
            <center>
              <span> I agree to the <Link to="/privacy">privacy policy</Link> and <Link to="">terms of services </Link><br /></span>
            </center>
          </form>
          <div className="text_sec">
            <Link to="/about">
              <span style={{ color: '#FF8C00', fontSize: '20px' }}>About </span>
            </Link>
            <br /><br />
            <span className="title_text">Evangadi Networks</span> <br /><br />
            <span>No matter what stage of life you are in, whether you’re just starting elementary school or being promoted to CEO of a Fortune 500 company, you have much to offer to those who are trying to follow in your footsteps.
              Whether you are willing to share your knowledge or you are just looking to meet mentors of your own, please start by joining the network here.</span> <br /><br />
            <button className="how_button" onClick={howHandle}> HOW IT WORK</button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login; // Exporting the Login component
