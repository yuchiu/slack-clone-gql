export default `
  type Team {
    id: Int!
    owner: User!
    name: String!
    members: [User!]!
    channels: [Channel!]!
  }
  type CreateTeamResponse{
    verified: Boolean!
    team: Team!
    errors: [Error!]
  }
  type Query {
    allTeams: [Team!]
  }
  type Mutation {
    createTeam(name: String!): CreateTeamResponse!
  }
`;
