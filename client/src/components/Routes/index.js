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
  WorkSpace
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

class Routes extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/register" exact component={Register} />
          <Route path="/Login" exact component={Login} />
          <PrivateRoute path="/create-team" exact component={CreateTeam} />
          <PrivateRoute path="/workspace" exact component={WorkSpace} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

export default Routes;
