import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import { isAuthenticated } from "../../utils";

class NavBar extends React.Component {
  handleLogout = () => {
    localStorage.clear();
  };

  render() {
    return (
      <div>
        {isAuthenticated() && (
          <Menu>
            <Menu.Item>
              <Link to="/">Slack</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/create-team">Create Team</Link>
            </Menu.Item>

            <Menu.Item position="right">
              <Link to="/" onClick={this.handleLogout}>
                Log out
              </Link>
            </Menu.Item>
            <Menu.Item position="right">
              <Link to="/workspace/view-channel/">Your Workspaces</Link>
            </Menu.Item>
          </Menu>
        )}
        {!isAuthenticated() && (
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
              <Link to="/workspace/view-channel/">Your Workspaces</Link>
            </Menu.Item>
          </Menu>
        )}
      </div>
    );
  }
}

export default NavBar;
