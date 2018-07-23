import React, { Component, Fragment } from "react";
import decode from "jwt-decode";

import Proptypes from "prop-types";
import Channels from "./Channels";
import Teams from "./Teams";
import AddChannelModel from "./AddChannelModal";
import InvitePeopleModal from "./InvitePeopleModal";

class Sidebar extends Component {
  state = {
    openAddChannelModal: false,
    openInvitePeopleModal: false
  };

  toggleAddChannelModal = e => {
    if (e) {
      e.preventDefault();
    }
    this.setState({ openAddChannelModal: !this.state.openAddChannelModal });
  };

  toggleInvitePeopleModal = e => {
    if (e) {
      e.preventDefault();
    }
    this.setState({ openInvitePeopleModal: !this.state.openInvitePeopleModal });
  };

  render() {
    const { teams, team } = this.props;
    const { openInvitePeopleModal, openAddChannelModal } = this.state;
    let username = "";
    let isOwner = false;

    try {
      const token = localStorage.getItem("token");
      const { user } = decode(token);
      // eslint-disable-next-line prefer-destructuring
      username = user.username;
      isOwner = user.id === team.owner;
    } catch (err) {
      console.log(err);
    }

    return (
      <Fragment>
        <Teams
          className="team-bar-container"
          key="team-sidebar"
          teams={teams}
        />
        <Channels
          key="channels-sidebar"
          teamName={team.name}
          username={username}
          teamId={team.id}
          channels={team.channels}
          users={[{ id: 1, name: "slackbot" }, { id: 2, name: "user1" }]}
          onAddChannelClick={this.toggleAddChannelModal}
          onInvitePeopleClick={this.toggleInvitePeopleModal}
          isOwner={isOwner}
        />
        <AddChannelModel
          teamId={team.id}
          onClose={this.toggleAddChannelModal}
          open={openAddChannelModal}
          key="sidebar-add-channel-modal"
        />
        <InvitePeopleModal
          teamId={team.id}
          onClose={this.toggleInvitePeopleModal}
          open={openInvitePeopleModal}
          key="Invite-people-modal"
        />
      </Fragment>
    );
  }
}
Sidebar.propTypes = {
  teams: Proptypes.array,
  team: Proptypes.object
};

export default Sidebar;
