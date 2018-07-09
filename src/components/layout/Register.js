import React from "react";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";
import { Container, Header, Input, Button } from "semantic-ui-react";
import Proptypes from "prop-types";

class Register extends React.Component {
  constructor() {
    super();
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

  async onSubmit() {
    const { username, email, password } = this.state;
    const response = await this.props.mutate({
      variables: { username, email, password }
    });

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
    return (
      <Container text>
        <Header as="h2">Header</Header>
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
          error={passwordError}
          focus
          type="password"
          name="password"
          placeholder="password"
          value={password}
          onChange={this.onChange.bind(this)}
          fluid
        />
        <Button onClick={this.onSubmit.bind(this)}>Submit</Button>
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
