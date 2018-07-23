import { auth } from "../utils/";
import formatErrors from "../utils/formatErrors";

export default {
  Query: {
    getUser: (_, { id }, { models }) => models.User.findOne({ where: { id } }),
    allUsers: (_, args, { models }) => models.User.findAll()
  },
  Mutation: {
    login: (_, { email, password }, { models, SECRET, SECRET2 }) =>
      auth.tryLogin(email, password, models, SECRET, SECRET2),
    register: async (_, args, { models }) => {
      try {
        const user = await models.User.create(args);

        return {
          verified: true,
          user
        };
      } catch (err) {
        return {
          verified: false,
          errors: formatErrors(err, models)
        };
      }
    }
  }
};
