import React, { Component } from "react";
import { graphql } from "react-apollo";
import {
  Message,
  Form,
  Button,
  Input,
  Header,
  Container
} from "semantic-ui-react";
import Proptypes from "prop-types";
import { loginMutation } from "../../graphql";
import { NavBar, InlineError } from "../global";
import { validateClientForm } from "../../utils";

class Login extends Component {
  state = {
    email: "",
    password: "",
    clientErrors: {},
    emailError: "",
    passwordError: ""
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = async () => {
    this.setState({
      emailError: "",
      passwordError: ""
    });
    // validate user's login info on client side
    const clientErrors = validateClientForm.signIn(this.state);
    this.setState({ clientErrors });

    // proceed to send data to server if there's no error
    if (Object.keys(clientErrors).length === 0) {
      const { email, password } = this.state;
      const response = await this.props.mutate({
        variables: { email, password }
      });
      const { verified, token, refreshToken, errors } = response.data.login;
      // validation info returned by server
      if (verified) {
        localStorage.setItem("token", token);
        localStorage.setItem("refreshToken", refreshToken);
        this.props.history.push("/");
        this.setState({
          error: {},
          email: "",
          password: "",
          emailError: "",
          passwordError: ""
        });
      } else {
        const err = {};
        errors.forEach(({ path, message }) => {
          err[`${path}Error`] = message;
        });
        this.setState(err);
      }
    }
  };

  render() {
    const {
      email,
      password,
      clientErrors,
      emailError,
      passwordError
    } = this.state;
    const errorList = [];

    if (emailError) {
      errorList.push(emailError);
    }

    if (passwordError) {
      errorList.push(passwordError);
    }

    return (
      <div className="login">
        <NavBar />
        <Container text>
          <Header as="h2">Login</Header>
          <Form>
            <Form.Field error={!!emailError}>
              <Input
                type="email"
                name="email"
                onChange={this.handleChange}
                value={email}
                placeholder="Email"
                fluid
              />
            </Form.Field>
            {clientErrors.email && <InlineError text={clientErrors.email} />}
            <Form.Field error={!!passwordError}>
              <Input
                name="password"
                onChange={this.handleChange}
                value={password}
                type="password"
                placeholder="Password"
                fluid
              />
            </Form.Field>
            {clientErrors.password && (
              <InlineError text={clientErrors.password} />
            )}
            <br />
            <Button onClick={this.handleSubmit}>Submit</Button>
          </Form>
          {errorList.length > 0 ? (
            <Message
              error
              header="There was some errors with your submission."
              list={errorList}
            />
          ) : null}
        </Container>
      </div>
    );
  }
}
Login.propTypes = {
  mutate: Proptypes.func,
  history: Proptypes.object
};

export default graphql(loginMutation)(Login);
