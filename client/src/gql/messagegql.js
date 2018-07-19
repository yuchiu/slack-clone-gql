import { gql } from "apollo-boost";

export default {
  createMessageMutation: gql`
    mutation($channelId: Int!, $text: String!) {
      createMessage(channelId: $channelId, text: $text)
    }
  `,
  messagesQuery: gql`
    query($channelId: Int!) {
      messages(channelId: $channelId) {
        id
        text
        user {
          username
        }
        created_at
      }
    }
  `
};
