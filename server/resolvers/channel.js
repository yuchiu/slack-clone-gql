import { formatErrors } from '../utils';

export default {
  Mutation: {
    createChannel: async (parent, args, { models }) => {
      try {
        const channel = await models.Channel.create(args);
        return {
          verified: true,
          channel,
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
