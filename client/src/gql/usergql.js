import { gql } from "apollo-boost";

export default {
  allUsersQuery: gql`
    {
      allUsers {
        id
        email
      }
    }
  `,
  registerMutation: gql`
    mutation($username: String!, $email: String!, $password: String!) {
      register(username: $username, email: $email, password: $password) {
        verified
        errors {
          path
          message
        }
      }
    }
  `,
  loginMutation: gql`
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
  `
};
