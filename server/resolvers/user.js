import { tryLogin, formatErrors } from '../utils';

export default {
  Query: {
    getUser: (parent, { id }, { models }) => models.User.findOne({ where: { id } }),
    getAllUsers: (parent, args, { models }) => models.User.findAll(),
  },
  Mutation: {
    login: (parent,
      { email, password },
      { models, SECRET, SECRET2 }) => tryLogin(email, password, models, SECRET, SECRET2),
    register: async (parent, args, { models }) => {
      try {
        const user = await models.User.create(args);

        return {
          verified: true,
          user,
        };
      } catch (err) {
        return {
          verified: false,
          errors: formatErrors(err, models),
        };
      }
    },
  },
};
