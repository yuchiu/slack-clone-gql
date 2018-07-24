export default `
  type Team {
    id: Int!
    name: String!
    members: [User!]!
    channels: [Channel!]!
    admin: Boolean!
  }

  type CreateTeamResponse {
    verified: Boolean!
    team: Team
    errors: [Error!]
  }

  type VoidResponse {
    verified: Boolean!
    errors: [Error!]
  }

  type Query {
    allTeams: [Team!]!
    inviteTeams: [Team!]!
  }

  type Mutation {
    createTeam(name: String!): CreateTeamResponse!
    addTeamMember(email: String!, teamId: Int!): VoidResponse!
  }
`;
