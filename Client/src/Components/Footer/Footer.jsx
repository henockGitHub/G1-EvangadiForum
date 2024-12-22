import "./footer.css";
import evangadiTransLogo from "../../assets/images/evangadi-logo-footer.png";
import { CiFacebook } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa6";
import { FiYoutube } from "react-icons/fi";



function Footer() {
  return (
    <footer>
      
      <section className="footer">
        <div className="icons__container">
          <div>
            <img src={evangadiTransLogo} alt="Evangadi Logo" target="_blank" />
          </div >
          <div className="icons">

          <CiFacebook size="25"/>
          <FaInstagram size="25"/>
          <FiYoutube size="25"/>

          </div>


        </div>

        <div className="links__container">
          <span>Useful Links</span>
          <ul className="list">
            <li>
              <a href="https://www.evangadi.com/legal/terms/" target="_blank">
                Terms of Services
              </a>
            </li>
            <li>
              <a href="https://www.evangadi.com/legal/privacy/" target="_blank">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>

        <div className="contact__container">
          <span>Contact Info</span>
          <p>support@evangadi.com</p>
          <p>+1-202-386-2702</p>
        </div>
      </section>
    </footer>
  );
}

export default Footer;
