import React from "react";
import { Sidebar, Teambar, Header, SendMessage } from "../presentations";

class WorkSpace extends React.Component {
  render() {
    return (
      <div className="workspace-wrapper">
        <Teambar teams={[{ id: 1, letter: "R" }, { id: 2, letter: "B" }]} />
        <Sidebar
          teamName={"My Team"}
          username={"yuchiu"}
          channels={[{ id: 1, name: "general" }, { id: 2, name: "random" }]}
          users={[{ id: 1, name: "slackbot" }, { id: 2, name: "user1" }]}
        />
        <Header channelName={"general"} />
        <div>Messages</div>
        <SendMessage channelName={"general"} />
      </div>
    );
  }
}

export default WorkSpace;
