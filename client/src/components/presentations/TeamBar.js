import React from "react";
import Proptypes from "prop-types";

class TeamBar extends React.Component {
  render() {
    return (
      <div className="team-bar-wrapper">
        Teams
        <ul>
          {this.props.teams.map(team => <li key={team.id}>{team.letter}</li>)}
        </ul>
      </div>
    );
  }
}

TeamBar.propTypes = {
  teams: Proptypes.array
};
export default TeamBar;
