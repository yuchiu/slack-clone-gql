import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import path from 'path';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';

import models from './models';

const allTypes = fileLoader(path.join(__dirname, './types'));
const typeDefs = mergeTypes(allTypes);

const allResolvers = fileLoader(path.join(__dirname, './resolvers'));
const resolvers = mergeResolvers(allResolvers);

const schema = makeExecutableSchema({ typeDefs, resolvers });

const PORT = 8081;

const app = express();

const graphqlEndpoint = '/graphql';

// object in context is passed to functions in resolvers, it's being use in ./resolvers
app.use(graphqlEndpoint, bodyParser.json(), graphqlExpress({
  schema,
  context: {
    models,
    user: { id: 1 },
  },
}));

app.use('/graphiql', graphiqlExpress({ endpointURL: graphqlEndpoint }));

models.sequelize.sync().then(() => {
  app.listen(PORT);
});
