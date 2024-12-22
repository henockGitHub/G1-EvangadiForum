import { useRef, useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from '../../axiosConfig';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Hooks/AuthContext';
import './user.css';

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // State for form submission
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useContext(AuthContext);

  const handleTogglePassword = () => setShowPassword((prev) => !prev);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleHowItWorks = () => navigate('/HowItWorks');

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value;

    if (!validateEmail(email)) {
      await Swal.fire({
        title: "Invalid Email",
        text: "Please enter a valid email address.",
        icon: "error",
        confirmButtonText: "OK",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await axios.post('/users/login', { email, password });
      const { token } = response.data;

      localStorage.setItem('user-token', token);
      login(); // Update context
      await Swal.fire({
        title: "Success!",
        text: "User logged in successfully!",
        icon: "success",
        confirmButtonText: "OK",
      });

      navigate('/');
    } catch (error) {
      console.error(error.response?.data?.msg || "An unexpected error occurred.");
      await Swal.fire({
        title: "Error",
        text: error.response?.data?.msg || "An unexpected error occurred.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container_forum">
      <section>
        <div className="main_body">
          <form className="form" onSubmit={handleFormSubmit}>
            <center>
              <p style={{ fontFamily: 'Arial' }}>Log in to your account</p>
              <span>
                Don't have an account? <Link to="/register">Create account</Link>
              </span>
            </center>
            <input
              type="text"
              name="email"
              placeholder="Email"
              ref={emailRef}
              className="input1"
              required
            />
            <div className="input-container">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Your password"
                ref={passwordRef}
                required
              />
              <button
                type="button"
                onClick={handleTogglePassword}
                className="icon-button"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? '🙉' : '🙈'}
              </button>
            </div>
            <Link to="" style={{ textAlign: 'right' }}>
              Forgot Password
            </Link>
            <button className="form_button" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>
            <center>
              <span>
                I agree to the <Link to="/privacy">privacy policy</Link> and{' '}
                <Link to="">terms of services</Link>
              </span>
            </center>
          </form>
          <div className="text_sec">
            <Link to="/about">
              <span style={{ color: '#FF8C00', fontSize: '20px' }}>About</span>
            </Link>
            <p className="title_text">Evangadi Networks</p>
            <p>
              No matter what stage of life you are in, whether you’re just starting elementary
              school or being promoted to CEO of a Fortune 500 company, you have much to offer to
              those who are trying to follow in your footsteps.
            </p>
            <p>
              Whether you are willing to share your knowledge or looking to meet mentors of your
              own, start by joining the network here.
            </p>
            <button className="how_button" onClick={handleHowItWorks}>
              HOW IT WORKS
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
