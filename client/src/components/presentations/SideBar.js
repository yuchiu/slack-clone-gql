import React from "react";
import Proptypes from "prop-types";

class Sidebar extends React.Component {
  render() {
    return (
      <div className="sidebar-wrapper">
        <div className="push-left-div">
          <h1>{this.props.teamName}</h1>
          <br />
          {this.props.username}
          <br />
        </div>
        <div>
          <ul>
            <li>Channels</li>
            {this.props.channels.map(channel => (
              <li key={channel.id}># {channel.name}</li>
            ))}
          </ul>
        </div>
        <div>
          <ul>
            <li>Direct Messages</li>
            {this.props.users.map(user => (
              <li key={user.id}>
                <span className="green-span">●</span>
                {user.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

Sidebar.propTypes = {
  channels: Proptypes.array,
  teamName: Proptypes.string,
  username: Proptypes.string,
  users: Proptypes.array
};
export default Sidebar;
