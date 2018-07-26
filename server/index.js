import path from "path";
import express from "express";
import jwt from "jsonwebtoken";
import cors from "cors";
import helmet from "helmet";
import { graphqlExpress, graphiqlExpress } from "apollo-server-express";
import { makeExecutableSchema } from "graphql-tools";
import { fileLoader, mergeTypes, mergeResolvers } from "merge-graphql-schemas";
import { createServer } from "http";
import { execute, subscribe } from "graphql";
import { SubscriptionServer } from "subscriptions-transport-ws";

import models from "./models";
import { auth } from "./utils/";

// keys
import SECRET1 from "./utils/SECRET1.json";
import SECRET2 from "./utils/SECRET2.json";

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, "./schema")));
const resolvers = mergeResolvers(
  fileLoader(path.join(__dirname, "./resolvers"))
);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

const app = express();
const graphqlEndpoint = "/graphql";
// middleware to auth
const addUser = async (req, res, next) => {
  const token = req.headers["x-token"];
  if (token) {
    try {
      const { user } = jwt.verify(token, SECRET1.key);
      req.user = user;
    } catch (err) {
      const refreshToken = req.headers["x-refresh-token"];
      const newTokens = await auth.refreshTokens(
        token,
        refreshToken,
        models,
        SECRET1.key,
        SECRET2.key
      );
      if (newTokens.token && newTokens.refreshToken) {
        res.set("Access-Control-Expose-Headers", "x-token, x-refresh-token");
        res.set("x-token", newTokens.token);
        res.set("x-refresh-token", newTokens.refreshToken);
      }
      req.user = newTokens.user;
    }
  }
  next();
};

app
  .use(cors())
  .use(addUser)
  .use(helmet())
  .use(
    graphqlEndpoint,
    express.json(),
    graphqlExpress(req => ({
      schema,
      context: {
        models,
        user: req.user,
        SECRET: SECRET1.key,
        SECRET2: SECRET2.key
      }
    }))
  )
  .use(
    "/graphiql",
    graphiqlExpress({
      endpointURL: graphqlEndpoint,
      subscriptionsEndpoint: "ws://localhost:8081/subscriptions"
    })
  );

const server = createServer(app);

// refresh db in testing environment, otherwise proceed without refreshing db
if (process.env.NODE_ENV === "testslack") {
  models.sequelize.sync({ force: true }).then(() => {
    server.listen(8081, () => {
      // eslint-disable-next-line
      new SubscriptionServer(
        {
          execute,
          subscribe,
          schema,
          onConnect: async ({ token, refreshToken }, webSocket) => {
            if (token && refreshToken) {
              try {
                const { user } = jwt.verify(token, SECRET1.key);
                return { models, user };
              } catch (err) {
                const newTokens = await auth.refreshTokens(
                  token,
                  refreshToken,
                  models,
                  SECRET1.key,
                  SECRET2.key
                );
                return { models, user: newTokens.user };
              }
            }
            return { models };
          }
        },
        {
          server,
          path: "/subscriptions"
        }
      );
    });
  });
} else {
  models.sequelize.sync({}).then(() => {
    server.listen(8081, () => {
      // eslint-disable-next-line
      new SubscriptionServer(
        {
          execute,
          subscribe,
          schema,
          onConnect: async ({ token, refreshToken }, webSocket) => {
            if (token && refreshToken) {
              try {
                const { user } = jwt.verify(token, SECRET1.key);
                return { models, user };
              } catch (err) {
                const newTokens = await auth.refreshTokens(
                  token,
                  refreshToken,
                  models,
                  SECRET1.key,
                  SECRET2.key
                );
                return { models, user: newTokens.user };
              }
            }
            return { models };
          }
        },
        {
          server,
          path: "/subscriptions"
        }
      );
    });
  });
}
