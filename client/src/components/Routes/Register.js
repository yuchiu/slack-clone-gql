import React from "react";
import Proptypes from "prop-types";
import { Container, Header } from "semantic-ui-react";
import { NavBar, RegisterForm } from "../containers";

class Register extends React.Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <Container text>
          <Header as="h2">Register</Header>
          <RegisterForm history={this.props.history} />
        </Container>
      </React.Fragment>
    );
  }
}
Register.propTypes = {
  history: Proptypes.object
};

export default Register;
