import React from "react";
import PropTypes from "prop-types";
import decode from "jwt-decode";
import AddChannelModal from "../containers/AddChannelModal";
import InvitePeopleModal from "../containers/InvitePeopleModal";
import TeamBar from "./TeamBar";
import CommunicationBar from "./CommunicationBar";

class SideBar extends React.Component {
  state = {
    isAddChannelModalOpen: false,
    isInvitePeopleModalOpen: false
  };

  toggleAddChannelModal = e => {
    if (e) {
      e.preventDefault();
    }
    this.setState(state => ({
      isAddChannelModalOpen: !state.isAddChannelModalOpen
    }));
  };

  toggleInvitePeopleModal = e => {
    if (e) {
      e.preventDefault();
    }
    this.setState(state => ({
      isInvitePeopleModalOpen: !state.isInvitePeopleModalOpen
    }));
  };

  loadTeams() {
    const { allTeams, currentTeam } = this.props;
    const { isAddChannelModalOpen, isInvitePeopleModalOpen } = this.state;
    let username = "";
    try {
      const token = localStorage.getItem("token");
      const { user } = decode(token);
      // eslint-disable-next-line prefer-destructuring
      username = user.username;
    } catch (err) {
      console.log(err);
    }
    return (
      <React.Fragment>
        <TeamBar
          allTeams={allTeams.map(t => ({
            id: t.id,
            letter: t.name.charAt(0).toUpperCase()
          }))}
        />
        <CommunicationBar
          teamName={currentTeam.name}
          username={username}
          channels={currentTeam.channels}
          teamId={currentTeam.id}
          users={[{ id: 1, name: "slackbot" }, { id: 2, name: "user1" }]}
          onAddChannelClick={this.toggleAddChannelModal}
          onInvitePeopleClick={this.toggleInvitePeopleModal}
        />
        <AddChannelModal
          open={isAddChannelModalOpen}
          onClose={this.toggleAddChannelModal}
          key="sidebar-add-channel-modal"
          teamId={currentTeam.id}
        />
        <InvitePeopleModal
          open={isInvitePeopleModalOpen}
          onClose={this.toggleInvitePeopleModal}
          key="sidebar-invite-people-modal"
          teamId={currentTeam.id}
        />
      </React.Fragment>
    );
  }

  render() {
    return <React.Fragment>{this.loadTeams()}</React.Fragment>;
  }
}

SideBar.propTypes = {
  allTeams: PropTypes.array,
  currentTeam: PropTypes.object
};

export default SideBar;
