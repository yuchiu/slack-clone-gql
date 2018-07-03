import express from 'express';
import bodyParser from 'body-parser'
import {graphqlExpress, graphiqlExpress} from 'apollo-server-express'
import typeDefs from './schema'
import resolvers from './resolvers'

import {makeExecutableSchema} from 'graphql-tools'

export const schema = makeExecutableSchema({typeDefs, resolvers})

const PORT = 8081;

const app = express()

const graphqlEndpoint = '/graphql';

app.use(graphqlEndpoint, bodyParser.json(), graphqlExpress({schema}))

app.use('/graphiql', graphiqlExpress({endpointURL: graphqlEndpoint}))

app.listen(PORT)