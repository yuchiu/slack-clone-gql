import React from "react";
import Proptypes from "prop-types";
import { Link } from "react-router-dom";

const TeamBar = ({ teams }) => (
  <div className="team-bar-wrapper">
    <ul>
      {teams.map(team => (
        <Link to={`/workspace/${team.id}`} key={team.id}>
          <li>{team.letter}</li>
        </Link>
      ))}
    </ul>
  </div>
);

TeamBar.propTypes = {
  teams: Proptypes.array
};
export default TeamBar;
