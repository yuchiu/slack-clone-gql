import React from "react";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";
import Proptypes from "prop-types";
import { Container, Header, Input, Button } from "semantic-ui-react";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  onChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  async onLogin() {
    const { email, password } = this.state;
    const response = await this.props.mutate({
      variables: { email, password }
    });
    console.log(response);
    const { verified, token, refreshToken } = response.data.login;
    if (verified) {
      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);
    }
  }

  render() {
    const { email, password } = this.state;
    return (
      <Container text>
        <Header as="h2">Log In</Header>
        <Input
          focus
          placeholder="email"
          name="email"
          onChange={this.onChange.bind(this)}
          value={email}
          fluid
        />
        <Input
          focus
          type="password"
          name="password"
          placeholder="password"
          value={password}
          onChange={this.onChange.bind(this)}
          fluid
        />
        <Button onClick={this.onLogin.bind(this)}>Log In</Button>
      </Container>
    );
  }
}
Login.propTypes = {
  mutate: Proptypes.func
};

const loginMutation = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      verified
      token
      refreshToken
      errors {
        path
        message
      }
    }
  }
`;

export default graphql(loginMutation)(Login);
