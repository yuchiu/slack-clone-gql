import React from "react";
import Proptypes from "prop-types";
import { graphql } from "react-apollo";
import findIndex from "lodash/findIndex";
import { Redirect } from "react-router-dom";
import { Header, SideBar, Messages } from "../presentations";
import SendMessage from "./SendMessage";
import { allTeamsQuery } from "../../gql";

const ViewWorkspace = ({
  data: { loading, allTeams, invitedTeams },
  match: {
    params: { teamId, channelId }
  }
}) => {
  if (loading) {
    return null;
  }
  // combined invited teams and owner's teams
  const combinedTeams = [...allTeams, ...invitedTeams];

  // if a new user have no team yet, redirect to create-team
  if (!combinedTeams.length) {
    return <Redirect to="/create-team" />;
  }
  // if workspace link query have any other value other than integer, redirect to default initial workspace
  const teamIdInteger = parseInt(teamId, 10);

  const teamIdx = teamIdInteger
    ? findIndex(combinedTeams, ["id", teamIdInteger])
    : 0;
  // if workspace link query integer is unusually large, redirect to default initial workspace
  const currentTeam =
    teamIdx === -1 ? combinedTeams[0] : combinedTeams[teamIdx];

  // if channel link query have any other value other than integer, redirect to default initial workspace
  const channelIdInteger = parseInt(channelId, 10);
  const channelIdx = channelIdInteger
    ? findIndex(currentTeam.channels, ["id", channelIdInteger])
    : 0;
  // if channel link query integer is unusually large, redirect to default initial workspace
  const currentChannel =
    channelIdx === -1
      ? currentTeam.channels[0]
      : currentTeam.channels[channelIdx];

  return (
    <React.Fragment>
      <SideBar allTeams={combinedTeams} currentTeam={currentTeam} />
      {currentChannel && <Header channelName={currentChannel.name} />}
      {currentChannel && (
        <Messages channelId={currentChannel.id}>messages</Messages>
      )}
      {currentChannel && <SendMessage channelName={currentChannel.name} />}
    </React.Fragment>
  );
};

ViewWorkspace.propTypes = {
  data: Proptypes.object,
  params: Proptypes.object,
  match: Proptypes.object
};
export default graphql(allTeamsQuery)(ViewWorkspace);
