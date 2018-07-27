import React from "react";
import { Icon } from "semantic-ui-react";
import Proptypes from "prop-types";

import { Channel, User } from "../presentations";
import {
  AddChannelModal,
  InvitePeopleModal,
  DirectMessageModal
} from "./ChannelbarModules";

class Channelbar extends React.Component {
  state = {
    openAddChannelModal: false,
    openInvitePeopleModal: false,
    openDirectMessageModal: false
  };

  toggleAddChannelModal = e => {
    if (e) {
      e.preventDefault();
    }
    this.setState({ openAddChannelModal: !this.state.openAddChannelModal });
  };

  toggleDirectMessageModal = e => {
    if (e) {
      e.preventDefault();
    }
    this.setState({
      openDirectMessageModal: !this.state.openDirectMessageModal
    });
  };

  toggleInvitePeopleModal = e => {
    if (e) {
      e.preventDefault();
    }
    this.setState({ openInvitePeopleModal: !this.state.openInvitePeopleModal });
  };

  render() {
    const { team, username } = this.props;
    const {
      openInvitePeopleModal,
      openAddChannelModal,
      openDirectMessageModal
    } = this.state;
    return (
      <div className="channelbar">
        <div className="channelbar__header">
          <h1 className="channelbar__header__teamname">
            <Icon className="team-bell" name="bell outline" />
            {team.name}
          </h1>
          <h1 className="channelbar__header__username">{username}</h1>
        </div>
        <ul className="channelbar__List">
          <span>
            <Icon name="comment alternate" />All Threads
          </span>
          <h1 className="channelbar__List__header">
            CHANNELS
            {team.admin && (
              <Icon
                className="channelbar__List__header__icon"
                onClick={this.toggleAddChannelModal}
                name="add circle"
              />
            )}
          </h1>
          {team.channels.map(channel => (
            <Channel key={channel.id} channel={channel} teamId={team.id} />
          ))}
        </ul>
        <ul className="channelbar__List">
          <h1 className="channelbar__List__header">
            DIRECT MESSAGES
            <Icon
              className="channelbar__List__header__icon channelbar__List__header__icon--closer"
              onClick={this.toggleDirectMessageModal}
              name="plus circle"
            />
          </h1>
          {team.directMessageMembers.map(user => (
            <User
              key={`users-${user.id}`}
              teamId={team.id}
              id={user.id}
              username={user.username}
            />
          ))}
        </ul>
        <AddChannelModal
          teamId={team.id}
          onClose={this.toggleAddChannelModal}
          open={openAddChannelModal}
          key="sidebar-add-channel-modal"
        />
        <DirectMessageModal
          teamId={team.id}
          onClose={this.toggleDirectMessageModal}
          open={openDirectMessageModal}
          key="sidebar-direct-message-modal"
        />
        <InvitePeopleModal
          teamId={team.id}
          onClose={this.toggleInvitePeopleModal}
          open={openInvitePeopleModal}
          key="Invite-people-modal"
        />
        {team.admin && (
          <div
            className="channelbar__invite"
            onClick={this.toggleInvitePeopleModal}
          >
            + Invite People
          </div>
        )}
      </div>
    );
  }
}

Channelbar.propTypes = {
  team: Proptypes.object,
  username: Proptypes.string
};

export default Channelbar;
