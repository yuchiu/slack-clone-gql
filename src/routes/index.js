import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Home, Register } from "../components/layout";

class Routes extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/register" exact component={Register} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Routes;
