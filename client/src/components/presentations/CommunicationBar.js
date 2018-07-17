import React from "react";
import Proptypes from "prop-types";
import { Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

const CommunicationBar = ({
  onAddChannelClick,
  teamName,
  username,
  users,
  channels,
  teamId
}) => (
  <div className="communication-bar-wrapper">
    <div className="push-left-div communication-bar-header">
      <h1 className="communication-bar-teamname">
        {teamName}
        <Icon className="team-bell" name="bell outline" />
      </h1>
      <h2 className="communication-bar-username">
        <span className="green-span">●</span>
        {username}
      </h2>
    </div>
    <div className="channel-section">
      <ul>
        <div className="threads">
          <span className="" /> <Icon name="comment alternate" />All Threads
        </div>
        <div>
          <h1 className="section-header">
            CHANNELS<Icon
              className="add-channel-button"
              name="plus circle"
              onClick={onAddChannelClick}
            />
          </h1>
        </div>
        {channels.map(channel => (
          <Link key={channel.id} to={`/workspace/${teamId}/${channel.id}`}>
            <li className="channel_name"># {channel.name} </li>
          </Link>
        ))}
      </ul>
    </div>
    <div className="direct-messages-section">
      <ul>
        <h1 className="section-header">
          DIRECT MESSAGES<Icon
            className="add-direct-message-button"
            name="plus circle"
          />
        </h1>
        {users.map(user => (
          <li className="user-List-item" key={user.id}>
            <span className="green-span">●</span>
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

CommunicationBar.propTypes = {
  onAddChannelClick: Proptypes.func,
  channels: Proptypes.array,
  teamName: Proptypes.string,
  username: Proptypes.string,
  users: Proptypes.array,
  teamId: Proptypes.number
};
export default CommunicationBar;
