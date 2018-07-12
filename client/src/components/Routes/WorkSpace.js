import React from "react";
import { Header, SendMessage } from "../presentations";
import { SideBar } from "../containers";

class WorkSpace extends React.Component {
  render() {
    return (
      <div className="workspace-wrapper">
        <SideBar currentTeamId={1} />
        <Header channelName={"general"} />
        <div>Messages</div>
        <SendMessage channelName={"general"} />
      </div>
    );
  }
}

export default WorkSpace;
