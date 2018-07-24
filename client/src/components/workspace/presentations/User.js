import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Bubble = ({ on = true }) =>
  on ? <span className="channelbar__List__bubble">●</span> : "○";

// eslint-disable-next-line no-unused-vars
const User = ({ id, username, teamId }) => (
  <Link to={`/workspace/view-direct-message/${teamId}/${id}`}>
    <li className="channelbar__List__item  channelbar__List__item--link">
      <Bubble /> {username}
    </li>
  </Link>
);
User.propTypes = {
  id: PropTypes.number,
  teamId: PropTypes.number,
  username: PropTypes.string
};
Bubble.propTypes = {
  on: PropTypes.bool
};

export default User;
