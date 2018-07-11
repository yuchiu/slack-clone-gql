import React from "react";
import {
  Channels,
  Messages,
  Teams,
  Input,
  Header,
  ViewTeamLayout
} from "../../styles/viewTeam";

class ViewTeam extends React.Component {
  render() {
    return (
      <ViewTeamLayout>
        <Teams>Teams</Teams>
        <Channels>Channels</Channels>
        <Header>Header</Header>
        <Messages>Messages</Messages>
        <Input>Input</Input>
      </ViewTeamLayout>
    );
  }
}

export default ViewTeam;
