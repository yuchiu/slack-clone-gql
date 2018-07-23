import { createChannelMutation } from "./channelgql";
import {
  createMessageMutation,
  messagesQuery,
  newChannelMessageSubscription
} from "./messagegql";
import {
  allTeamsQuery,
  addTeamMemberMutation,
  createTeamMutation
} from "./teamgql";
import { allUsersQuery, registerMutation, loginMutation } from "./usergql";

export {
  createChannelMutation,
  createMessageMutation,
  messagesQuery,
  allTeamsQuery,
  addTeamMemberMutation,
  createTeamMutation,
  registerMutation,
  allUsersQuery,
  loginMutation,
  newChannelMessageSubscription
};
