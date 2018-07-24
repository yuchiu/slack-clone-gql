import React, { Component, Fragment } from "react";
import Proptypes from "prop-types";
import Channelbar from "./Channelbar";
import Teambar from "./Teambar";
import AddChannelModel from "./AddChannelModal";
import InvitePeopleModal from "./InvitePeopleModal";
import DirectMessageModal from "./DirectMessageModal";

class Sidebar extends Component {
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
    const { teams, team, username } = this.props;
    const {
      openInvitePeopleModal,
      openAddChannelModal,
      openDirectMessageModal
    } = this.state;

    return (
      <Fragment>
        <Teambar
          className="team-bar-container"
          key="team-sidebar"
          teams={teams}
        />
        <Channelbar
          key="channels-sidebar"
          teamName={team.name}
          username={username}
          teamId={team.id}
          channels={team.channels}
          users={[{ id: 1, name: "slackbot" }, { id: 2, name: "user1" }]}
          onAddChannelClick={this.toggleAddChannelModal}
          onInvitePeopleClick={this.toggleInvitePeopleModal}
          onDirectMessageClick={this.toggleDirectMessageModal}
          isOwner={team.admin}
        />
        <AddChannelModel
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
      </Fragment>
    );
  }
}
Sidebar.propTypes = {
  teams: Proptypes.array,
  username: Proptypes.string,
  team: Proptypes.object
};

export default Sidebar;
