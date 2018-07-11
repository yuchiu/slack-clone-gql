import React from "react";
import Proptypes from "prop-types";
import { Header as Title } from "semantic-ui-react";
import { HeaderDiv } from "../../styles/viewTeam";

class Header extends React.Component {
  render() {
    return (
      <HeaderDiv>
        <Title>#{this.props.channelName}</Title>
      </HeaderDiv>
    );
  }
}

Header.propTypes = {
  channelName: Proptypes.string
};
export default Header;
