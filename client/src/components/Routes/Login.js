import React from "react";
import Proptypes from "prop-types";
import { Container, Header } from "semantic-ui-react";
import { NavBar, LoginForm } from "../containers";

class Login extends React.Component {
  render() {
    return (
      <div>
        <NavBar />
        <Container text>
          <Header as="h2">Log In</Header>
          <LoginForm history={this.props.history} />
        </Container>
      </div>
    );
  }
}

Login.propTypes = {
  history: Proptypes.object
};

export default Login;
