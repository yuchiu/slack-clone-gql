export default `
  type Team {
    id: Int!
    owner: Int!
    name: String!
    members: [User!]!
    channels: [Channel!]!
  }
  type CreateTeamResponse{
    verified: Boolean!
    team: Team
    errors: [Error!]
  }
  type Query {
    allTeams: [Team!]!
    invitedTeams: [Team!]!
  }

  type VoidResponse {
    verified: Boolean!
    errors: [Error!]
  }

  type Mutation {
    createTeam(name: String!): CreateTeamResponse!
    addTeamMember(email: String!, teamId: Int!): VoidResponse!
  }
`;
