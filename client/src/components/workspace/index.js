import React from "react";
import { graphql } from "react-apollo";
import findIndex from "lodash.findindex";
import { Redirect } from "react-router-dom";

import Proptypes from "prop-types";
import Header from "./Header";
import SendMessage from "./SendMessage";
import Sidebar from "./Sidebar";
import MessagesContainer from "./MessagesContainer";
import { allTeamsQuery } from "../../graphql";

const Workspace = ({
  data: { loading, allTeams, inviteTeams },
  match: {
    params: { teamId, channelId }
  }
}) => {
  if (loading) {
    return null;
  }

  // combined invited teams and owner's teams
  const teams = [...allTeams, ...inviteTeams];

  if (!teams.length) {
    return <Redirect to="/create-team" />;
  }

  // if workspace link query have any other value other than integer, redirect to default initial workspace
  const teamIdInteger = parseInt(teamId, 10);
  const teamIdx = teamIdInteger ? findIndex(teams, ["id", teamIdInteger]) : 0;

  // if workspace link query integer is unusually large, redirect to default initial workspace
  const team = teamIdx === -1 ? teams[0] : teams[teamIdx];

  // if channel link query have any other value other than integer, redirect to default initial workspace
  const channelIdInteger = parseInt(channelId, 10);
  const channelIdx = channelIdInteger
    ? findIndex(team.channels, ["id", channelIdInteger])
    : 0;

  // if channel link query integer is unusually large, redirect to default initial workspace
  const channel =
    channelIdx === -1 ? team.channels[0] : team.channels[channelIdx];

  return (
    <div className="workspace">
      <Sidebar
        teams={teams.map(t => ({
          id: t.id,
          letter: t.name.charAt(0).toUpperCase()
        }))}
        team={team}
      />
      {channel && <Header channelName={channel.name} />}
      {channel && <MessagesContainer channelId={channel.id} />}
      {channel && (
        <SendMessage channelName={channel.name} channelId={channel.id} />
      )}
    </div>
  );
};
Workspace.propTypes = {
  data: Proptypes.object,
  params: Proptypes.object,
  match: Proptypes.object
};

export default graphql(allTeamsQuery)(Workspace);
