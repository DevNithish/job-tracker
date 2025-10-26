import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          JobTracker
        </Link>

        <div className="nav-links">
          <Link
            to="/"
            className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
          >
            My Applications
          </Link>
          <Link
            to="/new"
            className={`nav-link ${
              location.pathname === "/new" ? "active" : ""
            }`}
          >
            New Application
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
