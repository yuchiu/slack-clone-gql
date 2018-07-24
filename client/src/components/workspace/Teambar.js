import React from "react";
import { Link } from "react-router-dom";
import Proptypes from "prop-types";
import { Team } from "./presentations";

const Teambar = ({ teams }) => (
  <div className="teambar">
    <ul className="teambar__list">
      {teams.map((team, i) => <Team key={i} team={team} />)}
      <Link to="/create-team">
        <li className="teambar__list__item teambar__list__item--add-team">+</li>
      </Link>
    </ul>
  </div>
);

Teambar.propTypes = {
  teams: Proptypes.array
};

export default Teambar;
