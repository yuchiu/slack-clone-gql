import React from "react";
import Proptypes from "prop-types";
import { ChannelsDiv } from "../../styles/viewTeam";

class Channels extends React.Component {
  render() {
    return (
      <ChannelsDiv>
        {this.props.teamName}
        <br />
        Channels
        {this.props.channels.map(channel => (
          <li key={channel.id}># {channel.name}</li>
        ))}
        Direct Messages
        {this.props.users.map(user => <li key={user.id}>{user.name}</li>)}
      </ChannelsDiv>
    );
  }
}

Channels.propTypes = {
  channels: Proptypes.func,
  teamName: Proptypes.string,
  users: Proptypes.func
};
export default Channels;
