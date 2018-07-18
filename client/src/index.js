import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "react-apollo";
import "../assets/scss/main.scss";
import Routes from "./components/Routes";
import apolloClient from "./apollo";

const app = (
  <ApolloProvider client={apolloClient}>
    <Routes />
  </ApolloProvider>
);

ReactDOM.render(app, document.getElementById("root"));
