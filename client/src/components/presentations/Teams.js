import React from "react";
import Proptypes from "prop-types";
import { TeamsDiv } from "../../styles/viewTeam";

class Teams extends React.Component {
  render() {
    return (
      <TeamsDiv>
        Teams
        {this.props.teams.map(team => <li key={team.id}>{team.letter}</li>)}
      </TeamsDiv>
    );
  }
}

Teams.propTypes = {
  teams: Proptypes.func
};
export default Teams;
