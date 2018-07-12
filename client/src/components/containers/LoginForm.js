import React from "react";
import { graphql } from "react-apollo";
import Proptypes from "prop-types";
import { Form, Input, Button, Message } from "semantic-ui-react";
import { loginMutation } from "../../gql";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      emailError: "",
      passwordError: ""
    };
  }

  onChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  async onSubmit() {
    this.setState({
      emailError: "",
      passwordError: ""
    });
    const { email, password } = this.state;
    const response = await this.props.mutate({
      variables: { email, password }
    });
    const { verified, token, refreshToken, errors } = response.data.login;
    if (verified) {
      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);
      this.props.history.push("/workspace");
    } else {
      const err = {};
      errors.forEach(({ path, message }) => {
        err[`${path}Error`] = message;
      });
      this.setState(err);
    }
  }

  render() {
    const { email, password, emailError, passwordError } = this.state;
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

export default graphql(loginMutation)(LoginForm);
