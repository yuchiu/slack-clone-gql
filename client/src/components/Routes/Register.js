import React from "react";
import Proptypes from "prop-types";
import { Container, Header } from "semantic-ui-react";
import { RegisterForm } from "../containers";
import { NavBar } from "../presentations";

const Register = ({ history }) => (
  <React.Fragment>
    <NavBar />
    <Container text>
      <Header as="h2">Register</Header>
      <RegisterForm history={history} />
    </Container>
  </React.Fragment>
);

Register.propTypes = {
  history: Proptypes.object
};
export default Register;
