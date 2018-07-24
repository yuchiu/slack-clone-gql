import { permissions, formatErrors } from "../utils/";

export default {
  Mutation: {
    createChannel: permissions.createResolver(
      async (parent, args, { models, user }) => {
        try {
          const member = await models.Member.findOne(
            { where: { teamId: args.teamId, userId: user.id } },
            { raw: true }
          );
          if (!member.admin) {
            return {
              verified: false,
              errors: [
                {
                  path: "name",
                  message:
                    "You have to be the owner of the team to create channels"
                }
              ]
            };
          }

          const channel = await models.Channel.create(args);
          return {
            verified: true,
            channel
          };
        } catch (err) {
          console.log(err);
          return {
            verified: false,
            errors: formatErrors(err, models)
          };
        }
      }
    )
  }
};
