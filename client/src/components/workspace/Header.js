import React from "react";
import Proptypes from "prop-types";

const Header = ({ channelName }) => (
  <div className="header">
    <h1>#{channelName}</h1>
  </div>
);
Header.propTypes = {
  channelName: Proptypes.string
};

export default Header;
