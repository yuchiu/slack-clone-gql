import { formatErrors, permission } from '../utils';

export default {
  Query: {
    // verify if there is a user logged in before creating team
    // eslint-disable-next-line
    getAllTeams: permission.createResolver(async (parent, args, { models, user }) => models.Team.findAll({ owner: user.id }, { raw: true })),
  },
  Mutation: {
    // verify if there is a user logged in before creating team
    createTeam: permission.createResolver(async (parent, args, { models, user }) => {
      try {
        await models.Team.create({ ...args, owner: user.id });
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
  },
  // not ideal
  Team: {
    channels: ({ id }, args, { models }) => models.Channel.findAll({ teamId: id }),
  },

};
