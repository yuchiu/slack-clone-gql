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
    getAllTeams: [Team!]
  }
  type Mutation {
    createTeam(name: String!): CreateTeamResponse!
  }
`;
