import React, { Component } from "react";
import {
  Form,
  Message,
  Button,
  Input,
  Header,
  Container
} from "semantic-ui-react";
import { graphql } from "react-apollo";
import PropTypes from "prop-types";

import { registerMutation } from "../../graphql";
import { InlineError } from "../global";
import { validateClientForm } from "../../utils";

class RegisterForm extends Component {
  state = {
    clientErrors: {},
    username: "",
    usernameError: "",
    email: "",
    emailError: "",
    password: "",
    passwordError: ""
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async () => {
    this.setState({
      usernameError: "",
      emailError: "",
      passwordError: ""
    });

    // validate user's login info on client side
    const clientErrors = validateClientForm.signUp(this.state);
    this.setState({ clientErrors });

    // proceed to send data to server if there's no error
    if (Object.keys(clientErrors).length === 0) {
      const { history, mutate } = this.props;
      const { username, email, password } = this.state;

      const response = await mutate({
        variables: { username, email, password }
      });
      const { verified, errors } = response.data.register;

      if (verified) {
        history.push("/login");
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
      username,
      email,
      password,
      usernameError,
      emailError,
      passwordError,
      clientErrors
    } = this.state;

    const errorList = [];

    if (usernameError) {
      errorList.push(usernameError);
    }

    if (emailError) {
      errorList.push(emailError);
    }

    if (passwordError) {
      errorList.push(passwordError);
    }

    return (
      <Container text>
        <Header as="h2">Register</Header>
        <Form>
          <Form.Field error={!!usernameError}>
            <Input
              name="username"
              onChange={this.handleChange}
              value={username}
              type="text"
              placeholder="Username"
              fluid
            />
          </Form.Field>
          {clientErrors.username && (
            <InlineError text={clientErrors.username} />
          )}
          <Form.Field error={!!emailError}>
            <Input
              name="email"
              onChange={this.handleChange}
              value={email}
              type="email"
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
    );
  }
}

RegisterForm.propTypes = {
  mutate: PropTypes.func,
  history: PropTypes.object
};

export default graphql(registerMutation)(RegisterForm);
