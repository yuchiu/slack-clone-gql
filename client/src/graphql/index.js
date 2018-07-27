import { createChannelMutation } from "./channelgql";
import {
  createMessageMutation,
  messagesQuery,
  newChannelMessageSubscription
} from "./messagegql";
import {
  meQuery,
  addTeamMemberMutation,
  createTeamMutation,
  getTeamMembersQuery
} from "./teamgql";
import { allUsersQuery, registerMutation, loginMutation } from "./usergql";
import {
  createDirectMessageMutation,
  directMessagesQuery,
  directMessageMeQuery,
  newDirectMessageSubscription
} from "./directMessagegql";

export {
  createChannelMutation,
  createMessageMutation,
  messagesQuery,
  meQuery,
  addTeamMemberMutation,
  createTeamMutation,
  registerMutation,
  allUsersQuery,
  loginMutation,
  newChannelMessageSubscription,
  createDirectMessageMutation,
  directMessagesQuery,
  directMessageMeQuery,
  newDirectMessageSubscription,
  getTeamMembersQuery
};
