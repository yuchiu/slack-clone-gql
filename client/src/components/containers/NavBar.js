import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";

class NavBar extends React.Component {
  render() {
    return (
      <Menu>
        <Menu.Item>
          <Link to="/">Slack</Link>
        </Menu.Item>

        <Menu.Item position="right">
          <Link to="/login">Log In</Link>
        </Menu.Item>
        <Menu.Item position="right">
          <Link to="/register">Register</Link>
        </Menu.Item>
        <Menu.Item position="right">
          <Link to="/workspace">Your Workspaces</Link>
        </Menu.Item>
      </Menu>
    );
  }
}

export default NavBar;
