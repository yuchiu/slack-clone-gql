import { permission } from '../utils';

export default {
  Query: {
    // eslint-disable-next-line max-len
    messages: permission.createResolver(async (parent, { channelId }, { models }) => {
      const messages = await models.Message.findAll({
        order: [['created_at', 'ASC']],
        where: {
          channelId,
        },
      }, { raw: true });
      return messages;
    }),
  },
  Mutation: {
    createMessage: permission.createResolver(async (parent, args, { models, user }) => {
      try {
        await models.Message.create({
          ...args,
          userId: user.id,
        });
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    }),
  },
  Message: {
    user: ({ userId }, args, { models }) => models.User.findOne({ where: { id: userId } }),
  },
};
