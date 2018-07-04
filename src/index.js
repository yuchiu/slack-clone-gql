import React from "react";
import ReactDOM from "react-dom";
import {
  ApolloProvider,
  ApolloClient,
  createNetworkInterface
} from "react-apollo";

import "../assets/scss/main.scss";
import Routes from "./routes";

const networkInterface = createNetworkInterface({
  uri: "http://localhost:8081/graphql"
});

const client = new ApolloClient({
  networkInterface
});

const app = (
  <ApolloProvider client={client}>
    <Routes />
  </ApolloProvider>
);

ReactDOM.render(app, document.getElementById("root"));
