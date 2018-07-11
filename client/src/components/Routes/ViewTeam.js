import React from "react";
import { Channels, Teams, Header, SendMessage } from "../presentations";
import { MessagesDiv, ViewTeamLayoutDiv } from "../../styles/viewTeam";

class ViewTeam extends React.Component {
  render() {
    return (
      <ViewTeamLayoutDiv>
        <Teams teams={[{ id: 1, letter: "R" }, { id: 2, letter: "B" }]} />
        <Channels
          teamName={"My Team"}
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
