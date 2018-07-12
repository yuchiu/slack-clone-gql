import React from "react";
import { Link } from "react-router-dom";

class NotFound extends React.Component {
  render() {
    return (
      <nav className="navbar">
        <Link to="/">Home</Link>
        <Link to="/workspace">View Team</Link>
        <Link to="/login">Log In</Link>
        <Link to="/register">Register</Link>
      </nav>
    );
  }
}

export default NotFound;
