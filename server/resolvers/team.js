import formatErrors from '../utils/formatErrors';

export default {
  Mutation: {
    createTeam: async (parent, args, { models, user }) => {
      try {
        await models.Team.create({ ...args, owner: user.id });
        console.log(`-----------------${user}---------------`);
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
    },
  },
};
