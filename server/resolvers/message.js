import { PubSub, withFilter } from 'graphql-subscriptions';
import { permission } from '../utils';
import NEW_CHANNEL_MESSAGE from '../constants';

const pubsub = new PubSub();


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
  Subscription: {
    newChannelMessage: {
      // eslint-disable-next-line max-len
      subscribe: withFilter(() => pubsub.asyncIterator(NEW_CHANNEL_MESSAGE),
        (payload, args) => payload.channelId === args.channelId),
    },
  },
  Mutation: {
    createMessage: permission.createResolver(async (parent, args, { models, user }) => {
      try {
        const message = await models.Message.create({
          ...args,
          userId: user.id,
        });
        pubsub.publish(NEW_CHANNEL_MESSAGE, {
          channelId: args.channelId,
          newChannelMessage: message.dataValues,
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
