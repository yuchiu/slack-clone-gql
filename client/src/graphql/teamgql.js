import { gql } from "apollo-boost";

export const meQuery = gql`
  {
    me {
      id
      username
      teams {
        id
        name
        admin
        directMessageMembers {
          id
          username
        }
        channels {
          id
          name
        }
      }
    }
  }
`;

export const addTeamMemberMutation = gql`
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
