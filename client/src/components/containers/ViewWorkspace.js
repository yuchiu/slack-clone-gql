import React from "react";
import Proptypes from "prop-types";
import { graphql } from "react-apollo";
import findIndex from "lodash/findIndex";
import { Header, SendMessage, SideBar, Messages } from "../presentations";
import { allTeamsQuery } from "../../gql";

const ViewWorkspace = ({
  data: { loading, allTeams },
  match: {
    params: { teamId, channelId }
  }
}) => {
  if (loading) {
    return null;
  }
  const teamIdx = teamId
    ? findIndex(allTeams, ["id", parseInt(teamId, 10)])
    : 0;
  const currentTeam = allTeams[teamIdx];

  const channelIdx = channelId
    ? findIndex(currentTeam.channels, ["id", parseInt(channelId, 10)])
    : 0;
  const currentChannel = currentTeam.channels[channelIdx];
  return (
    <React.Fragment>
      <SideBar allTeams={allTeams} currentTeam={currentTeam} />
      <Header channelName={currentChannel.name} />
      <Messages channelId={currentChannel.id}>messages</Messages>
      <SendMessage channelName={currentChannel.name} />
    </React.Fragment>
  );
};

ViewWorkspace.propTypes = {
  data: Proptypes.object,
  params: Proptypes.object,
  match: Proptypes.object
};
export default graphql(allTeamsQuery)(ViewWorkspace);
