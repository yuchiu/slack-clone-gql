import { withFilter } from "graphql-subscriptions";

import { authPermission, pubsub, directMessagePermission } from "../utils/";

const NEW_DIRECT_MESSAGE = "NEW_DIRECT_MESSAGE";

export default {
  Subscription: {
    newDirectMessage: {
      subscribe: directMessagePermission.createResolver(
        withFilter(
          () => pubsub.asyncIterator(NEW_DIRECT_MESSAGE),
          (payload, args, { user }) =>
            // check if the team are correct
            payload.teamId === args.teamId &&
            // check if both users are either sender or receiver
            ((payload.senderId === user.id &&
              payload.receiverId === args.userId) ||
              (payload.senderId === args.userId &&
                payload.receiverId === user.id))
        )
      )
    }
  },
  DirectMessage: {
    sender: ({ sender, senderId }, args, { models }) => {
      if (sender) {
        return sender;
      }

      return models.User.findOne({ where: { id: senderId } }, { raw: true });
    }
  },
  Query: {
    directMessages: authPermission.createResolver(
      async (parent, { teamId, otherUserId }, { models, user }) =>
        models.DirectMessage.findAll(
          {
            order: [["created_at", "ASC"]],
            where: {
              teamId,
              [models.sequelize.Op.or]: [
                {
                  [models.sequelize.Op.and]: [
                    { receiverId: otherUserId },
                    { senderId: user.id }
                  ]
                },
                {
                  [models.sequelize.Op.and]: [
                    { receiverId: user.id },
                    { senderId: otherUserId }
                  ]
                }
              ]
            }
          },
          { raw: true }
        )
    )
  },
  Mutation: {
    createDirectMessage: authPermission.createResolver(
      async (parent, args, { models, user }) => {
        try {
          const directMessage = await models.DirectMessage.create({
            ...args,
            senderId: user.id
          });

          pubsub.publish(NEW_DIRECT_MESSAGE, {
            teamId: args.teamId,
            senderId: user.id,
            receiverId: args.receiverId,
            newDirectMessage: {
              ...directMessage.dataValues,
              sender: {
                username: user.username
              }
            }
          });

          return true;
        } catch (err) {
          console.log(err);
          return false;
        }
      }
    )
  }
};
