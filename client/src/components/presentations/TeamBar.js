import React from "react";
import Proptypes from "prop-types";
import { Link } from "react-router-dom";

const TeamBar = ({ allTeams }) => (
  <div className="team-bar-wrapper">
    <ul>
      {allTeams.map((team, i) => (
        <Link to={`/workspace/${team.id}`} key={i}>
          <li>{team.letter}</li>
        </Link>
      ))}
      <Link to="/create-team">
        <li>+</li>
      </Link>
    </ul>
  </div>
);

TeamBar.propTypes = {
  allTeams: Proptypes.array
};
export default TeamBar;
