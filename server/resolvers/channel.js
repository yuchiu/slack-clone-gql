import { formatErrors, permission } from '../utils';

export default {
  Mutation: {
    createChannel: permission.createResolver(async (parent, args, { models, user }) => {
      try {
        const team = await models.Team.findOne({ where: { id: args.teamId } }, { raw: true });
        if (team.owner !== user.id) {
          return {
            verified: false,
            errors: [
              {
                path: 'name',
                message: 'You have to be the owner of the team to create channels',
              },
            ],
          };
        }
        const channel = await models.Channel.create(args);
        return {
          verified: true,
          channel,
        };
      } catch (err) {
        console.log(err);
        return {
          verified: false,
          errors: formatErrors(err, models),
        };
      }
    }),
  },
};
