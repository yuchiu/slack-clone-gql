import React from "react";
import { Link } from "react-router-dom";
import Proptypes from "prop-types";

const Teams = ({ teams }) => (
  <div className="teambar">
    <ul className="teambar__list">
      {teams.map((team, i) => (
        <Link key={i} to={`/workspace/${team.id}`}>
          <li className="teambar__list__item">{team.letter}</li>
        </Link>
      ))}
      <Link to="/create-team">
        <li className="teambar__list__item teambar__list__item--add-team">+</li>
      </Link>
    </ul>
  </div>
);
Teams.propTypes = {
  teams: Proptypes.array
};

export default Teams;
