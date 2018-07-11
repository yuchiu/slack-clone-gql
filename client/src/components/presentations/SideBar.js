import React from "react";
import Proptypes from "prop-types";
import {
  SideBarDiv,
  PushLeft,
  SideBarH1,
  SideBarUl,
  SideBarLi,
  Green,
  SideBarLiHeader
} from "../../styles/viewTeam/SideBar";

class SideBar extends React.Component {
  render() {
    return (
      <SideBarDiv>
        <PushLeft>
          <SideBarH1>{this.props.teamName}</SideBarH1>
          <br />
          {this.props.username}
          <br />
        </PushLeft>
        <div>
          <SideBarUl>
            <SideBarLiHeader>Channels</SideBarLiHeader>
            {this.props.channels.map(channel => (
              <SideBarLi key={channel.id}># {channel.name}</SideBarLi>
            ))}
          </SideBarUl>
        </div>
        <div>
          <SideBarUl>
            <SideBarLiHeader>Direct Messages</SideBarLiHeader>
            {this.props.users.map(user => (
              <SideBarLi key={user.id}>
                <Green>●</Green>
                {user.name}
              </SideBarLi>
            ))}
          </SideBarUl>
        </div>
      </SideBarDiv>
    );
  }
}

SideBar.propTypes = {
  channels: Proptypes.func,
  teamName: Proptypes.string,
  username: Proptypes.string,
  users: Proptypes.func
};
export default SideBar;
