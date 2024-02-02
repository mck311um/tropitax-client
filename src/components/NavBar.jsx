import React from "react";
import { Link } from "react-router-dom";
import "../assets/style.css";

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="title-and-toggle">
        <Link to="/" className="title">
          TropiTax
        </Link>
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/add-person">Add Person</Link>
        </li>
        <li>
          <Link to="/photos">Update Person</Link>
        </li>
        <li>
          <Link to="/file">Get PIT Form</Link>
        </li>
        <li>
          <Link to="/persons">View Persons</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
