import React from "react";
import "./NavBar.css";
import { ReactComponent as CloudIcon } from "../../assets/icons/cloud.svg"; // Example icon

const NavBar = ({ children }) => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <CloudIcon className="navbar-logo-icon" />
          <a href="/" className="navbar-logo-text">
            SKY Report App
          </a>
        </div>
        <div className="navbar-menu">{children}</div>
      </div>
    </nav>
  );
};

export default NavBar;
