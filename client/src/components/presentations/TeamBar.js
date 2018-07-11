import React from "react";
import Proptypes from "prop-types";
import {
  TeamBarDiv,
  TeamBarLi,
  TeamBarUl
} from "../../styles/viewTeam/TeamBar";

class TeamBar extends React.Component {
  render() {
    return (
      <TeamBarDiv>
        Teams
        <TeamBarUl>
          {this.props.teams.map(team => (
            <TeamBarLi key={team.id}>{team.letter}</TeamBarLi>
          ))}
        </TeamBarUl>
      </TeamBarDiv>
    );
  }
}

TeamBar.propTypes = {
  teams: Proptypes.func
};
export default TeamBar;
