import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { isAuthenticated } from "../utils";
import Home from "./home";
import Register from "./register";
import Login from "./login";
import CreateTeam from "./createTeam";
import { ViewDirectMessage, ViewChannel } from "./workspace";

// eslint-disable-next-line
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/login" }} />
      )
    }
  />
);

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/register" exact component={Register} />
      <Route path="/login" exact component={Login} />
      <PrivateRoute
        path="/workspace/view-channel/:teamId?/:channelId?"
        exact
        component={ViewChannel}
      />
      <PrivateRoute
        path="/workspace/view-direct-message/:teamId/:userId"
        exact
        component={ViewDirectMessage}
      />
      <PrivateRoute path="/create-team" exact component={CreateTeam} />
    </Switch>
  </BrowserRouter>
);

export default Router;
