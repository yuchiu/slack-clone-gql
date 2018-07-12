import React from "react";
import { graphql } from "react-apollo";
import PropTypes from "prop-types";
import { CommunicationBar, TeamBar } from "../presentations";
import { getAllTeamsQuery } from "../../gql";

class SideBar extends React.Component {
  loadTeams() {
    const { data } = this.props;
    if (data.loading) {
      return (
        <React.Fragment>
          <TeamBar teams={[{ id: 1, letter: " " }]} />
          <CommunicationBar
            teamName={"Loading Team"}
            username={"Loading"}
            channels={[{ id: 1, name: "loading" }]}
            users={[{ id: 1, name: "loading" }]}
          />
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <TeamBar teams={[{ id: 1, letter: "R" }, { id: 2, letter: "B" }]} />
        <CommunicationBar
          teamName={"My Team"}
          username={"yuchiu"}
          channels={[{ id: 1, name: "general" }, { id: 2, name: "random" }]}
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
  data: PropTypes.object
};

export default graphql(getAllTeamsQuery)(SideBar);
