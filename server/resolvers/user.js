import { auth, formatErrors, authPermission } from "../utils/";

export default {
  User: {
    teams: (parent, args, { models, user }) =>
      models.sequelize.query(
        "select * from teams as team join members as member on team.id = member.team_id where member.user_id = ?",
        {
          replacements: [user.id],
          model: models.Team,
          raw: true
        }
      )
  },
  Query: {
    allUsers: (parent, args, { models }) => models.User.findAll(),
    getUser: (parent, { userId }, { models }) =>
      models.User.findOne({
        where: { id: userId }
      }),
    me: authPermission.createResolver((parent, args, { models, user }) =>
      models.User.findOne({ where: { id: user.id } })
    )
  },
  Mutation: {
    login: (parent, { email, password }, { models, SECRET, SECRET2 }) =>
      auth.tryLogin(email, password, models, SECRET, SECRET2),
    register: async (parent, args, { models }) => {
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
