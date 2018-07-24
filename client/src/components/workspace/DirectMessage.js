import React from "react";
import { graphql, compose } from "react-apollo";
import findIndex from "lodash.findindex";
import { Redirect } from "react-router-dom";

import Proptypes from "prop-types";
import { Header, SendMessage } from "./presentations";
import Sidebar from "./Sidebar";
import MessagesContainer from "./MessagesContainer";
import { meQuery, createMessageMutation } from "../../graphql";

const Workspace = ({
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
      {/* <Header channelName={channel.name} />
      <MessagesContainer channelId={channel.id} /> */}
      <SendMessage onSubmit={() => {}} placeholder={userId} />
    </div>
  );
};
Workspace.propTypes = {
  data: Proptypes.object,
  params: Proptypes.object,
  match: Proptypes.object
};

export default compose(
  graphql(createMessageMutation),
  graphql(meQuery, {
    options: {
      fetchPolicy: "network-only"
    }
  })
)(Workspace);
