import React from "react";
import Proptypes from "prop-types";
import { Header as Title } from "semantic-ui-react";

class Header extends React.Component {
  render() {
    return (
      <div className="header-wrapper">
        <Title>#{this.props.channelName}</Title>
      </div>
    );
  }
}

Header.propTypes = {
  channelName: Proptypes.string
};
export default Header;
