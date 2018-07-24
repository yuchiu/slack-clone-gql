import React from "react";
import { graphql, compose } from "react-apollo";
import findIndex from "lodash.findindex";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";

import { Header, SendMessage } from "./presentations";
import Sidebar from "./Sidebar";
import DirectMessagesContainer from "./DirectMessagesContainer";
import {
  meQuery,
  directMessageMeQuery,
  createDirectMessageMutation
} from "../../graphql";

const DirectMessage = ({
  mutate,
  data: { loading, me, getUser },
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
      <Header channelName={getUser.username} />
      <DirectMessagesContainer teamId={team.id} userId={userId} />
      <SendMessage
        onSubmit={async text => {
          await mutate({
            variables: { text, receiverId: userId, teamId },
            optimisticResponse: {
              createDirectMessage: true
            },
            update: store => {
              const data = store.readQuery({ query: meQuery });
              const teamIdx2 = findIndex(data.me.teams, ["id", team.id]);
              const notAlreadyThere = data.me.teams[
                teamIdx2
              ].directMessageMembers.every(
                member => member.id !== parseInt(userId, 10)
              );
              if (notAlreadyThere) {
                data.me.teams[teamIdx2].directMessageMembers.push({
                  __typename: "User",
                  id: userId,
                  username: getUser.username
                });
                store.writeQuery({ query: meQuery, data });
              }
            }
          });
        }}
        placeholder={`aloha ${getUser.username}`}
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
  graphql(directMessageMeQuery, {
    options: props => ({
      fetchPolicy: "network-only",
      variables: {
        userId: props.match.params.userId
      }
    })
  })
)(DirectMessage);
