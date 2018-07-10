export default `
  type Team {
    owner: User!
    members: [User!]!
    channels: [Channel!]!
  }
  type CreateTeamResponse{
    verified: Boolean!
    errors: [Error!]
  }
  type Mutation {
    createTeam(name: String!): CreateTeamResponse!
  }
`;
