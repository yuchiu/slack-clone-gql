import React, { Component } from "react";
import { Form, Message, Button, Input, Header } from "semantic-ui-react";
import { graphql } from "react-apollo";
import Proptypes from "prop-types";
import { registerMutation } from "../../graphql";
import { NavBar } from "../global";

class Register extends Component {
  state = {
    username: "",
    usernameError: "",
    email: "",
    emailError: "",
    password: "",
    passwordError: ""
  };

  handleSubmit = async () => {
    this.setState({
      usernameError: "",
      emailError: "",
      passwordError: ""
    });

    const { username, email, password } = this.state;

    const response = await this.props.mutate({
      variables: { username, email, password }
    });
    const { verified, errors } = response.data.register;

    if (verified) {
      this.props.history.push("/login");
    } else {
      const err = {};
      errors.forEach(({ path, message }) => {
        err[`${path}Error`] = message;
      });

      this.setState(err);
    }
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const {
      username,
      email,
      password,
      usernameError,
      emailError,
      passwordError
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
      <div className="register">
        <NavBar />
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
          <Button onClick={this.handleSubmit}>Submit</Button>
        </Form>
        {errorList.length > 0 ? (
          <Message
            error
            header="There was some errors with your submission."
            list={errorList}
          />
        ) : null}
      </div>
    );
  }
}

Register.propTypes = {
  mutate: Proptypes.func,
  history: Proptypes.object
};

export default graphql(registerMutation)(Register);
