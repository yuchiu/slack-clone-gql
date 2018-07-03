export default {
  Query: {
    getUser: (parent, { id }, { models }) => models.User.findOne({ where: { id } }),
    getAllUser: (parent, args, { models }) => models.User.findAll(),
  },
  Mutation: {
    // object models is passed from ../index.js as context object
    createUser: (parent, args, { models }) => models.User.create(args),
  },

};
