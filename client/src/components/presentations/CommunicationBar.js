import React from "react";
import Proptypes from "prop-types";
import { Icon } from "semantic-ui-react";

const CommunicationBar = ({
  onAddChannelClick,
  teamName,
  username,
  users,
  channels
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
        {channels.map(channel => <li key={channel.id}># {channel.name} </li>)}
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
  users: Proptypes.array
};
export default CommunicationBar;
