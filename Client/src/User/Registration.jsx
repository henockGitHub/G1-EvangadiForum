import { useRef } from 'react';
import axios from '../../axiosConfig';
import './user.css';
import { useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Registration() {
  const navigate = useNavigate();
  const usernameDom = useRef();
  const firstnameDom = useRef();
  const lastnameDom = useRef();
  const emailDom = useRef();
  const passwordDom = useRef();

  async function hadleform(e) {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      await axios.post('/users/register', {
        username: usernameDom.current.value,
        firstname: firstnameDom.current.value,
        lastname: lastnameDom.current.value,
        email: emailDom.current.value,
        password: passwordDom.current.value
      });
      alert("successful");
      navigate("/auth"); // Redirect to the '/auth' route after successful registration
    } catch (error) {
      console.log(error.response); // Log any errors that occur during the registration process
    }
  }

  return (
    <div className="container_forum">
      <section>
        <div className="main_body">
          <form className="form" onSubmit={hadleform} action="/submit" method="POST">
            <center>
              <p style={{ color: 'black' }}> Join the network</p><br />
              <span> already have an account? <Link to="/auth" className=""> SignIn</Link> </span>
            </center>
            <input type="user_name" id="user_name" name="user_name" placeholder="user_name" ref={emailDom} required />
            <div className="form_element">
              <input type="first_name" name="first_name" placeholder="first_name" ref={firstnameDom} required />
              <input type="last_name" id="last_name" name="last_name" placeholder="last_name" ref={lastnameDom} required />
            </div>
            <input type="text" id="username" name="email" placeholder=" email" ref={usernameDom} required />
            <input type="password" id="password" name="password" placeholder="your password" ref={passwordDom} required />
            <center>
              <span> I agree to the <a href="">privacy policy</a> and <a href="">terms of services</a></span>
              <br />
            </center>
            <button className="form_button" type="submit">Register</button>
            <span className="center2">
              <Link to="/auth"> already have an account</Link>
            </span>
          </form>
          <div className="text_sec">
            <span style={{ color: '#FF8C00', fontSize: '20px' }}>About </span><br /><br />
            <span className="title_text">Evangadi Networks</span><br /><br />
            <span>No matter what stage of life you are in, whether you’re just starting elementary school or being promoted to CEO of a Fortune 500 company, you have much to offer to those who are trying to follow in your footsteps. Wheather you are willing to share your knowledge or you are just looking to meet mentors of your own, please start by joining the network here.</span> <br /><br />
            <button className="how_button" onClick=""> HOW IT WORK</button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Registration;
