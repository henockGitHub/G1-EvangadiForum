import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate here
import logo from './../../assets/images/evangadi-logo-black.png';
import { AuthContext } from '../../Hooks/AuthContext';
import classes from './Header.module.css';
import './header.css';

function Header() {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleAuthButtonClick = () => {
    if (isLoggedIn) {
      logout(); // Call logout function from context
      navigate('/'); // Redirect to home page after sign out
    } else {
      navigate('/auth'); // Redirect to login page
    }
  };

  return (
    <section className={classes.fixed}>
      <div className={classes.header_container}>
        {/* first column of the head part */}
        <div className={classes.logo_container}>
          <img src={logo} alt="Evangadi logo" />
        </div>
        {/* second column of the head part */}
        <div className={classes.header_link}>
        <Link to="/" className={classes.link}> <span>Home</span> </Link>  
        <Link to="/Howitworks" className={classes.link}><span>How it works</span> </Link>
          <Link to="/auth">
            <button className={classes.hearder_btn} onClick={handleAuthButtonClick}>
              {isLoggedIn ? 'SIGN OUT' : 'SIGN IN'}
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}


export default Header
