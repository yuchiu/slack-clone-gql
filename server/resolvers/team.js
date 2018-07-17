import { formatErrors, permission } from '../utils';

export default {
  Query: {
    // verify if there is a user logged in before creating team
    // eslint-disable-next-line max-len
    allTeams: permission.createResolver(async (parent, args, { models, user }) => models.Team.findAll({ where: { owner: user.id } }, { raw: true })),
  },
  Mutation: {
    // verify if there is a user logged in before creating team
    // eslint-disable-next-line max-len
    addTeamMember: permission.createResolver(async (parent, { email, teamId }, { models, user }) => {
      try {
        // use promise to run both findOne in parallel
        const teamPromise = models.Team.findOne({ where: { id: teamId } }, { raw: true });
        const userToAddPromise = models.User.findOne({ where: { email } }, { raw: true });
        const [team, userToAdd] = await Promise.all([teamPromise, userToAddPromise]);
        // check if the user making this request is the owner
        if (team.owner !== user.id) {
          return {
            verified: false,
            errors: [{ path: 'email', message: 'Only team owner can add user to the team' }],
          };
        }
        // check if the email user adding does exist
        if (!userToAdd) {
          return {
            verified: false,
            errors: [{ path: 'email', message: 'Could not find the user email you entered' }],
          };
        }
        await models.Member.create({ userId: userToAdd.id, teamId });
        return {
          verified: true,
        };
      } catch (err) {
        console.log(err);
        return {
          verified: false,
          errors: formatErrors(err),
        };
      }
    }),
    createTeam: permission.createResolver(async (parent, args, { models, user }) => {
      try {
        const response = await models.sequelize.transaction(
          async () => {
            const team = await models.Team.create({ ...args, owner: user.id });
            await models.Channel.create({ name: 'general', public: true, teamId: team.id });
            return team;
          },
        );
        return {
          verified: true,
          team: response,
        };
      } catch (err) {
        console.log(err);
        return {
          verified: false,
          errors: formatErrors(err),
        };
      }
    }),
  },
  // not ideal
  Team: {
    channels: ({ id }, args, { models }) => models.Channel.findAll({ where: { teamId: id } }),
  },

};
