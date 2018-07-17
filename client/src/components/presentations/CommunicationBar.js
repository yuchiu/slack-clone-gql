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
    <div className="push-left-div">
      <h1>{teamName}</h1>
      <br />
      {username}
      <br />
    </div>
    <div>
      <ul>
        <li>
          Channels
          <Icon name="add circle" onClick={onAddChannelClick} />
        </li>
        {channels.map(channel => (
          <Link key={channel.id} to={`/workspace/${teamId}/${channel.id}`}>
            <li># {channel.name} </li>
          </Link>
        ))}
      </ul>
    </div>
    <div>
      <ul>
        <li>Direct Messages</li>
        {users.map(user => (
          <li key={user.id}>
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
