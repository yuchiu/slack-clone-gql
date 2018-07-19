import React from "react";
import { graphql } from "react-apollo";
import { Form, Input, Button, Message } from "semantic-ui-react";
import Proptypes from "prop-types";
import { InlineError } from "../presentations";
import { usergql } from "../../gql";
import { validateClientForm } from "../../utils";

class RegisterForm extends React.Component {
  state = {
    clientErrors: {},
    username: "",
    email: "",
    password: "",
    usernameError: "",
    emailError: "",
    passwordError: ""
  };

  onChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  // validate user's login info on client side
  onSubmit = async () => {
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
      const { username, email, password } = this.state;
      const response = await this.props.mutate({
        variables: { username, email, password }
      });
      const { verified, errors } = response.data.register;
      // validation info returned by server
      if (verified) {
        this.props.history.push("/workspace");
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
      clientErrors,
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
      <React.Fragment>
        <Form>
          <Form.Field error={!!usernameError}>
            <Input
              focus
              placeholder="username"
              name="username"
              value={username}
              onChange={this.onChange.bind(this)}
              fluid
            />
          </Form.Field>
          {clientErrors.email && <InlineError text={clientErrors.username} />}
          <Form.Field error={!!emailError}>
            <Input
              focus
              placeholder="email"
              name="email"
              onChange={this.onChange.bind(this)}
              value={email}
              fluid
            />
          </Form.Field>
          {clientErrors.email && <InlineError text={clientErrors.email} />}
          <Form.Field error={!!passwordError}>
            <Input
              focus
              type="password"
              name="password"
              placeholder="password"
              value={password}
              onChange={this.onChange.bind(this)}
              fluid
            />
          </Form.Field>
          {clientErrors.email && <InlineError text={clientErrors.password} />}
          <Button onClick={this.onSubmit.bind(this)}>Register</Button>
          <br />
        </Form>
        {errorList.length ? (
          <Message error header="Errors with Register" list={errorList} />
        ) : null}
      </React.Fragment>
    );
  }
}

RegisterForm.propTypes = {
  mutate: Proptypes.func,
  history: Proptypes.object
};

export default graphql(usergql.registerMutation)(RegisterForm);
