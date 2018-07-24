import { createChannelMutation } from "./channelgql";
import {
  createMessageMutation,
  messagesQuery,
  newChannelMessageSubscription
} from "./messagegql";
import { meQuery, addTeamMemberMutation, createTeamMutation } from "./teamgql";
import { allUsersQuery, registerMutation, loginMutation } from "./usergql";

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
  newChannelMessageSubscription
};
