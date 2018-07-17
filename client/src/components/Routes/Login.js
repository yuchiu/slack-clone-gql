import React from "react";
import Proptypes from "prop-types";
import { Container, Header } from "semantic-ui-react";
import { NavBar, LoginForm } from "../containers";

const Login = ({ history }) => (
  <React.Fragment>
    <NavBar />
    <Container text>
      <Header as="h2">Log In</Header>
      <LoginForm history={history} />
    </Container>
  </React.Fragment>
);

Login.propTypes = {
  history: Proptypes.object
};
export default Login;
