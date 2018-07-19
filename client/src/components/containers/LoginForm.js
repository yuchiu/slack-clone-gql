import React from "react";
import { graphql } from "react-apollo";
import Proptypes from "prop-types";
import { Form, Input, Button, Message } from "semantic-ui-react";
import { InlineError } from "../presentations";
import { usergql } from "../../gql";
import { validateClientForm } from "../../utils";

class LoginForm extends React.Component {
  state = {
    clientErrors: {},
    email: "",
    password: "",
    emailError: "",
    passwordError: ""
  };

  onChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  onSubmit = async () => {
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
        this.props.history.push("/workspace");
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
      <React.Fragment>
        <Form>
          <Form.Field error={emailError}>
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
          <Form.Field error={passwordError}>
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
          {clientErrors.password && (
            <InlineError text={clientErrors.password} />
          )}
          <br />
          <Button onClick={this.onSubmit.bind(this)}>Log In</Button>
        </Form>
        {errorList.length ? (
          <Message error header="Errors with Register" list={errorList} />
        ) : null}
      </React.Fragment>
    );
  }
}

LoginForm.propTypes = {
  mutate: Proptypes.func,
  history: Proptypes.object
};

export default graphql(usergql.loginMutation)(LoginForm);
