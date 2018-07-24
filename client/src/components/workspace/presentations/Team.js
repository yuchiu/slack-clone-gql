import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Team = ({ team }) => (
  <Link to={`/workspace/${team.id}`}>
    <li className="teambar__list__item">{team.letter}</li>
  </Link>
);

Team.propTypes = {
  team: PropTypes.object
};

export default Team;
