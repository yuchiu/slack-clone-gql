import React from "react";
import { graphql } from "react-apollo";
import PropTypes from "prop-types";
import decode from "jwt-decode";
import _ from "lodash";
import { CommunicationBar, TeamBar } from "../presentations";
import { getAllTeamsQuery } from "../../gql";

class SideBar extends React.Component {
  loadTeams() {
    const {
      data: { loading, getAllTeams },
      currentTeamId
    } = this.props;
    if (loading) {
      return (
        <React.Fragment>
          <TeamBar teams={[{ id: 0, letter: " " }]} />
          <CommunicationBar
            teamName={" "}
            username={" "}
            channels={[{ id: 0, name: " " }]}
            users={[{ id: 0, name: " " }]}
          />
        </React.Fragment>
      );
    }
    const teamIdx = _.findIndex(getAllTeams, ["id", currentTeamId]);
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
          users={[{ id: 1, name: "slackbot" }, { id: 2, name: "user1" }]}
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
  currentTeamId: PropTypes.number
};

export default graphql(getAllTeamsQuery)(SideBar);
