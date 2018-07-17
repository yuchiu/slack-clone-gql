import React from "react";
import { graphql } from "react-apollo";
import PropTypes from "prop-types";
import decode from "jwt-decode";
import findIndex from "lodash/findIndex";
import AddChannelModal from "./AddChannelModal";
import { CommunicationBar, TeamBar } from "../presentations";
import { getAllTeamsQuery } from "../../gql";

class SideBar extends React.Component {
  state = {
    isModalOpen: false
  };

  handleCloseAddChannelModal = () => {
    this.setState({ isModalOpen: false });
  };

  handleAddChannelClick = () => {
    this.setState({ isModalOpen: true });
  };

  loadTeams() {
    const {
      data: { loading, getAllTeams },
      currentTeamId
    } = this.props;
    if (loading) {
      return null;
    }
    /*
    find if we have the team Id,
    if we do we can go to the teamId,
    otherwise go to the first team ID which is "0"
    */
    const teamIdx = currentTeamId
      ? findIndex(getAllTeams, ["id", parseInt(currentTeamId, 10)])
      : 0;
    const team = getAllTeams[teamIdx];
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
          teams={getAllTeams.map(t => ({
            id: t.id,
            letter: t.name.charAt(0).toUpperCase()
          }))}
        />
        <CommunicationBar
          teamName={team.name}
          username={username}
          channels={team.channels}
          teamId={team.id}
          users={[{ id: 1, name: "slackbot" }, { id: 2, name: "user1" }]}
          onAddChannelClick={this.handleAddChannelClick}
        />
        <AddChannelModal
          open={this.state.isModalOpen}
          onClose={this.handleCloseAddChannelModal}
          key="sidebar-add-channel-modal"
          teamId={team.id}
        />
      </React.Fragment>
    );
  }

  render() {
    return <React.Fragment>{this.loadTeams()}</React.Fragment>;
  }
}

SideBar.propTypes = {
  data: PropTypes.object,
  currentTeamId: PropTypes.string
};

export default graphql(getAllTeamsQuery)(SideBar);
