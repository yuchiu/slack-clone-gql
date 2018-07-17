import React from "react";
import decode from "jwt-decode";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import {
  Home,
  Login,
  Register,
  NotFound,
  CreateTeam,
  Workspace
} from "./AllRoutes";

const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  const refreshToken = localStorage.getItem("refreshToken");
  try {
    decode(token);
    decode(refreshToken);
  } catch (err) {
    return false;
  }
  return true;
};
// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login"
          }}
        />
      )
    }
  />
);

const Routes = () => (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/register" exact component={Register} />
      <Route path="/Login" exact component={Login} />
      <PrivateRoute
        path="/workspace/:teamId?/:channelId?"
        exact
        component={Workspace}
      />
      <PrivateRoute path="/create-team" exact component={CreateTeam} />
      <Route component={NotFound} />
    </Switch>
  </Router>
);

export default Routes;
