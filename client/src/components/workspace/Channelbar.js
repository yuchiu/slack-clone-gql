import React from "react";
import { Icon } from "semantic-ui-react";
import Proptypes from "prop-types";
import { Channel, User } from "./presentations";

const Channelbar = ({
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
        <Icon className="team-bell" name="bell outline" />
        {teamName}
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
        <Channel key={channel.id} channel={channel} teamId={teamId} />
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
        <User key={user.id} user={user} username={username} />
      ))}
    </ul>
    {isOwner && (
      <div className="channelbar__invite" onClick={onInvitePeopleClick}>
        + Invite People
      </div>
    )}
  </div>
);
Channelbar.propTypes = {
  onAddChannelClick: Proptypes.func,
  channels: Proptypes.array,
  teamName: Proptypes.string,
  isOwner: Proptypes.bool,
  username: Proptypes.string,
  onInvitePeopleClick: Proptypes.func,
  users: Proptypes.array,
  teamId: Proptypes.number
};

export default Channelbar;