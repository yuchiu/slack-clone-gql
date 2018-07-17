export default `
  type Channel {
    id: Int!
    name: String!
    public: Boolean!
    messages: [Message!]!
    users: [User!]!
  }
  type CreateChannelResponse{
    verified: Boolean!
    channel: Channel
    errors: [Error!]
  }
  type Mutation {
    createChannel(teamId: Int!, name: String!, public: Boolean=false): CreateChannelResponse!
  }
`;
