import { gql } from "apollo-boost";

export const allUsersQuery = gql`
  {
    allUsers {
      id
      email
    }
  }
`;

export const createChannelMutation = gql`
  mutation($teamId: Int!, $name: String!) {
    createChannel(teamId: $teamId, name: $name) {
      verified
      channel {
        id
        name
      }
    }
  }
`;

export const addTeamMember = gql`
  mutation($teamId: Int!, $email: String!) {
    addTeamMember(email: $email, teamId: $teamId) {
      verified
      errors {
        path
        message
      }
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

export const allTeamsQuery = gql`
  {
    allTeams {
      id
      name
      channels {
        id
        name
      }
    }
    invitedTeams {
      id
      name
      channels {
        id
        name
      }
    }
  }
`;
