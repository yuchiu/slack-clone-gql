import React from "react";
import { graphql, compose } from "react-apollo";
import findIndex from "lodash.findindex";
import { Redirect } from "react-router-dom";

import PropTypes from "prop-types";
import { Header, SendMessage } from "./presentations";
import Sidebar from "./Sidebar";
import MessagesContainer from "./MessagesContainer";
import { meQuery, createMessageMutation } from "../../graphql";

const ViewChannel = ({
  mutate,
  data: { loading, me },
  match: {
    params: { teamId, channelId }
  }
}) => {
  if (loading) {
    return null;
  }

  // combined invited teams and owner's teams
  const { teams, username } = me;

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
        username={username}
      />
      {channel && <Header channelName={channel.name} />}
      {channel && <MessagesContainer channelId={channel.id} />}
      {channel && (
        <SendMessage
          placeholder={channel.name}
          onSubmit={async text => {
            await mutate({
              variables: { text, channelId: channel.id }
            });
          }}
        />
      )}
    </div>
  );
};
ViewChannel.propTypes = {
  data: PropTypes.object,
  params: PropTypes.object,
  match: PropTypes.object,
  mutate: PropTypes.func
};

export default compose(
  graphql(createMessageMutation),
  graphql(meQuery, {
    options: {
      fetchPolicy: "network-only"
    }
  })
)(ViewChannel);
