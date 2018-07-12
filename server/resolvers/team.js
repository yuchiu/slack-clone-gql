import { formatErrors, permission } from '../utils';

export default {
  Query: {
    // verify if there is a user logged in before creating team
    // eslint-disable-next-line max-len
    getAllTeams: permission.createResolver(async (parent, args, { models, user }) => models.Team.findAll({ where: { owner: user.id } }, { raw: true })),
  },
  Mutation: {
    // verify if there is a user logged in before creating team
    createTeam: permission.createResolver(async (parent, args, { models, user }) => {
      try {
        const team = await models.Team.create({ ...args, owner: user.id });
        await models.Channel.create({ name: 'general', public: true, teamId: team.id });
        return {
          verified: true,
          team,
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
