import React from "react";
import { SideBar, TeamBar, Header, SendMessage } from "../presentations";
import { MessagesDiv } from "../../styles/viewTeam/Messages";
import { ViewTeamLayoutDiv } from "../../styles/viewTeam/ViewTeamLayout";

class ViewTeam extends React.Component {
  render() {
    return (
      <ViewTeamLayoutDiv>
        <TeamBar teams={[{ id: 1, letter: "R" }, { id: 2, letter: "B" }]} />
        <SideBar
          teamName={"My Team"}
          username={"yuchiu"}
          channels={[{ id: 1, name: "general" }, { id: 2, name: "random" }]}
          users={[{ id: 1, name: "slackbot" }, { id: 2, name: "user1" }]}
        />
        <Header channelName={"general"} />
        <MessagesDiv>Messages</MessagesDiv>
        <SendMessage channelName={"general"} />
      </ViewTeamLayoutDiv>
    );
  }
}

export default ViewTeam;
