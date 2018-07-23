import { gql } from "apollo-boost";

export const allUsersQuery = gql`
  {
    allUsers {
      id
      email
    }
  }
`;
export const registerMutation = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
      verified
      errors {
        path
        message
      }
    }
  }
`;
export const loginMutation = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      verified
      token
      refreshToken
      errors {
        path
        message
      }
    }
  }
`;
