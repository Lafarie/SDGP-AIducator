import React from "react";
import "../App.css";
import { Link } from "react-router-dom";
import Logo from "../Images/footerlogo.svg";
import facebook from "../Images/facebook.svg";
import instagram from "../Images/instagram.svg";
import twitter from "../Images/twitter.svg";


function Footer() {
  return (
    <footer>
      <div id="footer-row">
        <div id="footer-set-one">
          <h3>AIducator</h3>
          <Link to="/">Home</Link>
          <Link to="/forum">Forum</Link>
          <Link to="/quiz">Quiz</Link>
          <Link to="/library">Library</Link>
          <Link to="/video">Video</Link>
          <Link to="/todo">To-Do</Link>
        </div>
        <div id="footer-set-two">
          <h3>Help</h3>
          <Link to="/library">3D Models</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/about">About Us</Link>
          <Link to="/sign-in">Sign In</Link>
        </div>
        <div id="footer-logo">
        <img id="footer-aiducator-logo" src={Logo} alt="AIducator Logo" />
        <div id="logo-inside">
            <img id="facebook-logo" src={facebook} alt="facebook" onClick={ ()=> window.location.href = 'https://www.facebook.com'} />
            <img id="insta-logo" src={instagram} alt="instagram"  onClick={ ()=> window.location.href = 'https://www.instagram.com'}/>
            <img id="twiter-logo" src={twitter} alt="twitter" onClick={ ()=> window.location.href = 'https://www.twitter.com'}/>
        </div>
        </div>
        
      </div>

      <div id="footer-set-three">
        <h3>©️ 2024 AIducator</h3>
        <p>|</p>
        <Link to="/privacy-policy"> Privacy Policy</Link>
        <p>|</p>
        <Link to="/terms-of-service">Terms of Service</Link>
        <p>|</p>
        <Link to="/cookie-policy">Cookie Policy</Link>
      </div>
    </footer>
  );
}

export default Footer;
