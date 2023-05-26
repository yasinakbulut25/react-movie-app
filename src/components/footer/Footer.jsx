import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.svg";
import "./footer.scss";

function Footer() {
  return (
    <footer className="footer">
      <Link to="/">
        <img className="logo" src={Logo} alt="logo" />
      </Link>
      <span>
        © Developed by
        <Link target="_blank" to="https://www.linkedin.com/in/yasinakbulut/">
          Yasin Akbulut
        </Link>
      </span>
    </footer>
  );
}

export default Footer;
