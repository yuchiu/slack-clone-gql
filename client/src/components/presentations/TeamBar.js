import React from "react";
import Proptypes from "prop-types";
import { Link } from "react-router-dom";

class TeamBar extends React.Component {
  render() {
    return (
      <div className="team-bar-wrapper">
        Teams
        <ul>
          {this.props.teams.map(team => (
            <Link to={`/workspace/${team.id}`} key={team.id}>
              <li>{team.letter}</li>
            </Link>
          ))}
        </ul>
      </div>
    );
  }
}

TeamBar.propTypes = {
  teams: Proptypes.array
};
export default TeamBar;
