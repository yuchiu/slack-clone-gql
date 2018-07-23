import { gql } from "apollo-boost";

export const allTeamsQuery = gql`
  {
    allTeams {
      id
      name
      owner
      channels {
        id
        name
      }
    }
    inviteTeams {
      id
      name
      owner
      channels {
        id
        name
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
