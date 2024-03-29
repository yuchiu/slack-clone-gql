import { withFilter } from "graphql-subscriptions";

import { authPermission, teamAccessPermission, pubsub } from "../utils/";

const NEW_CHANNEL_MESSAGE = "NEW_CHANNEL_MESSAGE";

export default {
  Subscription: {
    newChannelMessage: {
      subscribe: teamAccessPermission.createResolver(
        withFilter(
          () => pubsub.asyncIterator(NEW_CHANNEL_MESSAGE),
          (payload, args) => payload.channelId === args.channelId
        )
      )
    }
  },
  Message: {
    user: ({ user, userId }, args, { models }) => {
      if (user) {
        return user;
      }

      return models.User.findOne({ where: { id: userId } }, { raw: true });
    }
  },
  Query: {
    messages: authPermission.createResolver(
      async (parent, { channelId }, { models }) =>
        models.Message.findAll(
          { order: [["created_at", "ASC"]], where: { channelId } },
          { raw: true }
        )
    )
  },
  Mutation: {
    createMessage: authPermission.createResolver(
      async (parent, args, { models, user }) => {
        try {
          const message = await models.Message.create({
            ...args,
            userId: user.id
          });

          const asyncFunc = async () => {
            const currentUser = await models.User.findOne({
              where: {
                id: user.id
              }
            });

            pubsub.publish(NEW_CHANNEL_MESSAGE, {
              channelId: args.channelId,
              newChannelMessage: {
                ...message.dataValues,
                user: currentUser.dataValues
              }
            });
          };

          asyncFunc();

          return true;
        } catch (err) {
          console.log(err);
          return false;
        }
      }
    )
  }
};
