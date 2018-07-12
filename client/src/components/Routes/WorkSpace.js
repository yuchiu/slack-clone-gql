import React from "react";
import Proptypes from "prop-types";
import { Header, SendMessage } from "../presentations";
import { SideBar } from "../containers";

class WorkSpace extends React.Component {
  render() {
    const { params } = this.props.match;
    return (
      <div className="workspace-wrapper">
        <SideBar currentTeamId={params.teamId} />
        <Header channelName={"general"} />
        <div>Messages</div>
        <SendMessage channelName={"general"} />
      </div>
    );
  }
}
WorkSpace.propTypes = {
  params: Proptypes.object,
  match: Proptypes.object
};

export default WorkSpace;
