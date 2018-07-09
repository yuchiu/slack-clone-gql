import React from "react";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";
import { Container, Header, Input, Button, Message } from "semantic-ui-react";
import Proptypes from "prop-types";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      usernameError: "",
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

  async onRegister() {
    this.setState({
      usernameError: "",
      emailError: "",
      passwordError: ""
    });
    const { username, email, password } = this.state;
    const response = await this.props.mutate({
      variables: { username, email, password }
    });
    console.log(response);
    const { validation, errors } = response.data.register;

    if (validation) {
      this.props.history.push("/");
    } else {
      const err = {};
      errors.forEach(({ path, message }) => {
        err[`${path}Error`] = message;
      });
      this.setState(err);
    }

    console.log(response);
  }

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
      <Container text>
        <Header as="h2">Register</Header>
        <Input
          error={!!usernameError}
          focus
          placeholder="username"
          name="username"
          value={username}
          onChange={this.onChange.bind(this)}
          fluid
        />
        <Input
          error={!!emailError}
          focus
          placeholder="email"
          name="email"
          onChange={this.onChange.bind(this)}
          value={email}
          fluid
        />
        <Input
          error={!!passwordError}
          focus
          type="password"
          name="password"
          placeholder="password"
          value={password}
          onChange={this.onChange.bind(this)}
          fluid
        />
        <Button onClick={this.onRegister.bind(this)}>Register</Button>
        {usernameError || emailError || passwordError ? (
          <Message error header="Errors with Register" list={errorList} />
        ) : null}
      </Container>
    );
  }
}

Register.propTypes = {
  mutate: Proptypes.func,
  history: Proptypes.object
};

const registerMutation = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
      validation
      errors {
        path
        message
      }
    }
  }
`;

export default graphql(registerMutation)(Register);
