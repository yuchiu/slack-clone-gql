import React from "react";
import PropTypes from "prop-types";

const Messages = ({ channelId }) => <div>{channelId}</div>;

Messages.propTypes = { channelId: PropTypes.number };

export default Messages;
