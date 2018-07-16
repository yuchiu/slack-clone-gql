import React from "react";
import Proptypes from "prop-types";
import { Header as Title } from "semantic-ui-react";

const Header = ({ channelName }) => (
  <div className="header-wrapper">
    <Title>#{channelName}</Title>
  </div>
);
Header.propTypes = {
  channelName: Proptypes.string
};
export default Header;
