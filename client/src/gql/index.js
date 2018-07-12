import { gql } from "apollo-boost";

export const getAllUsersQuery = gql`
  {
    getAllUsers {
      id
      email
    }
  }
`;
export const createTeamMutation = gql`
  mutation($name: String!) {
    createTeam(name: $name) {
      verified
      team {
        id
      }
      errors {
        path
        message
      }
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

export const getAllTeamsQuery = gql`
  {
    getAllTeams {
      id
      name
      channels {
        id
        name
      }
    }
  }
`;
