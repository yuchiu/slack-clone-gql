import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";

import "../assets/scss/main.scss";
import Routes from "./components/Routes";

const client = new ApolloClient({
  uri: "http://localhost:8081/graphql"
});

const app = (
  <ApolloProvider client={client}>
    <Routes />
  </ApolloProvider>
);

ReactDOM.render(app, document.getElementById("root"));
