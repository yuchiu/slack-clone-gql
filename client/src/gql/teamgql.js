import { gql } from "apollo-boost";

export default {
  addTeamMemberMutation: gql`
    mutation($teamId: Int!, $email: String!) {
      addTeamMember(email: $email, teamId: $teamId) {
        verified
        errors {
          path
          message
        }
      }
    }
  `,
  createTeamMutation: gql`
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
  `,
  allTeamsQuery: gql`
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
      invitedTeams {
        id
        name
        owner
        channels {
          id
          name
        }
      }
    }
  `
};
