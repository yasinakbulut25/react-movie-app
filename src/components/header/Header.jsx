import React, { useState } from "react";
import Logo from "../../assets/logo.svg";
import { Link, NavLink } from "react-router-dom";
import "./header.scss";

function Header() {
  const [navCheck, setNavCheck] = useState(false);

  const navLinks = [
    {
      display: "Home",
      path: "/",
      icon: "house",
    },
    {
      display: "Movies",
      path: "/movies",
      icon: "collection-play",
    },
    {
      display: "TV Series",
      path: "/tv",
      icon: "play",
    },
    {
      display: "Search",
      path: "/search",
      icon: "search",
    },
  ];

  const handleNavbar = () => {
    setNavCheck(true);
    document.addEventListener("click", (e) => {
      if (
        e.target.className !== "navbar active" &&
        e.target.className !== "bi bi-list" &&
        e.target.className !== "menu-btn"
      ) {
        setNavCheck(false);
      }
    });
  };

  return (
    <header className="header">
      <button onClick={handleNavbar} type="button" className="menu-btn">
        <i className="bi bi-list"></i>
      </button>

      <Link to="/">
        <img className="logo" src={Logo} alt="logo" />
      </Link>

      <nav className={navCheck ? "navbar active" : "navbar"}>
        <div className="mobile-dark-section"></div>
        <Link to="/">
          <img className="logo nav-logo" src={Logo} alt="logo" />
        </Link>
        {navLinks.map((link) => (
          <NavLink key={link.path} className="nav-link" to={link.path}>
            <i className={`bi bi-${link.icon}`}></i>
            {link.display}
          </NavLink>
        ))}
      </nav>

      <Link to="" className="register-link">
        <i className="bi bi-box-arrow-in-right"></i> Sign In
      </Link>
    </header>
  );
}

export default Header;
