import { gql } from "apollo-boost";

export default {
  createChannelMutation: gql`
    mutation($teamId: Int!, $name: String!) {
      createChannel(teamId: $teamId, name: $name) {
        verified
        channel {
          id
          name
        }
      }
    }
  `
};
