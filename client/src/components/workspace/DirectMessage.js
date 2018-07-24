import React from "react";
import { graphql, compose } from "react-apollo";
import findIndex from "lodash.findindex";
import { Redirect } from "react-router-dom";

import PropTypes from "prop-types";
import { Header, SendMessage } from "./presentations";
import Sidebar from "./Sidebar";
import DirectMessagesContainer from "./DirectMessagesContainer";
import { meQuery, createDirectMessageMutation } from "../../graphql";

const DirectMessage = ({
  mutate,
  data: { loading, me },
  match: {
    params: { teamId, userId }
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
      <Header channelName={"Someone's username"} />
      <DirectMessagesContainer teamId={teamId} userId={userId} />
      <SendMessage
        onSubmit={async text => {
          await mutate({
            variables: { text, receiverId: userId, teamId }
          });
        }}
        placeholder={userId}
      />
    </div>
  );
};
DirectMessage.propTypes = {
  data: PropTypes.object,
  params: PropTypes.object,
  match: PropTypes.object,
  mutate: PropTypes.func
};

export default compose(
  graphql(createDirectMessageMutation),
  graphql(meQuery, {
    options: {
      fetchPolicy: "network-only"
    }
  })
)(DirectMessage);
