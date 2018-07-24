import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Channel = ({ channel, teamId }) => (
  <Link to={`/workspace/${teamId}/${channel.id}`}>
    <li className="channelbar__List__item channelbar__List__item--link">
      # {channel.name}
    </li>
  </Link>
);

Channel.propTypes = {
  channel: PropTypes.object,
  teamId: PropTypes.number
};

export default Channel;
