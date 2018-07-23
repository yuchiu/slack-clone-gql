import React from "react";
import { Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import Proptypes from "prop-types";

const Bubble = ({ on = true }) =>
  on ? <span className="channelbar__List__bubble">●</span> : "○";

const Channels = ({
  teamName,
  username,
  channels,
  users,
  onAddChannelClick,
  teamId,
  onInvitePeopleClick,
  isOwner
}) => (
  <div className="channelbar">
    <div className="channelbar__header">
      <h1 className="channelbar__header__teamname">
        {teamName}
        <Icon className="team-bell" name="bell outline" />
      </h1>
      <h1 className="channelbar__header__username">{username}</h1>
    </div>
    <ul className="channelbar__List">
      <span>
        <Icon name="comment alternate" />All Threads
      </span>
      <h1 className="channelbar__List__header">
        CHANNELS
        {isOwner && (
          <Icon
            className="channelbar__List__header__icon"
            onClick={onAddChannelClick}
            name="add circle"
          />
        )}
      </h1>
      {channels.map(channel => (
        <Link key={channel.id} to={`/workspace/${teamId}/${channel.id}`}>
          <li className="channelbar__List__item channelbar__List__item--link">
            # {channel.name}
          </li>
        </Link>
      ))}
    </ul>
    <ul className="channelbar__List">
      <h1 className="channelbar__List__header">
        DIRECT MESSAGES<Icon
          className="channelbar__List__header__icon channelbar__List__header__icon--closer"
          name="plus circle"
        />
      </h1>
      {users.map(user => (
        <li
          className="channelbar__List__item  channelbar__List__item--link"
          key={user.id}
        >
          <Bubble /> {username}
        </li>
      ))}
    </ul>
    {isOwner && (
      <div className="channelbar__invite" onClick={onInvitePeopleClick}>
        + Invite People
      </div>
    )}
  </div>
);
Channels.propTypes = {
  onAddChannelClick: Proptypes.func,
  channels: Proptypes.array,
  teamName: Proptypes.string,
  isOwner: Proptypes.bool,
  username: Proptypes.string,
  onInvitePeopleClick: Proptypes.func,
  users: Proptypes.array,
  teamId: Proptypes.number
};
Bubble.propTypes = {
  on: Proptypes.bool
};

export default Channels;
