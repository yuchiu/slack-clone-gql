import React from "react";
import PropTypes from "prop-types";

const Bubble = ({ on = true }) =>
  on ? <span className="channelbar__List__bubble">●</span> : "○";

// eslint-disable-next-line no-unused-vars
const User = ({ user, username }) => (
  <li className="channelbar__List__item  channelbar__List__item--link">
    <Bubble /> {username}
  </li>
);

User.propTypes = {
  user: PropTypes.object,
  username: PropTypes.string
};
Bubble.propTypes = {
  on: PropTypes.bool
};

export default User;
