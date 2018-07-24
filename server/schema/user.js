export default `
  type User {
    id: Int!
    username: String!
    email: String!
    teams: [Team!]!
  }

  type Query {
    me: User!
    allUsers: [User!]!
  }

  type RegisterResponse {
    verified: Boolean!
    user: User
    errors: [Error]
  }

  type LoginResponse {
    verified: Boolean!
    token: String
    refreshToken: String
    errors: [Error]
  }

  type Mutation {
    register(username: String!, email: String!, password: String!): RegisterResponse!
    login(email: String!, password: String!): LoginResponse!
  }
`;
