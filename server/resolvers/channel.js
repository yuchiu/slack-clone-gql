export default {
  Mutation: {
    createChannel: async (parent, args, { models }) => {
      try {
        await models.Channel.create(args);
        return {
          verified: true,
        };
      } catch (err) {
        console.log(err);
        return {
          verified: false,
        };
      }
    },
  },
};
