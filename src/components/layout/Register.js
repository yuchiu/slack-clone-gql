import React from "react";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";
import { Container, Header, Input, Button } from "semantic-ui-react";

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
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

  async onSubmit() {
    const response = await this.props.mutate({
      variables: this.state
    });
    console.log(response);
  }

  render() {
    const { username, email, password } = this.state;
    return (
      <Container text>
        <Header as="h2">Header</Header>
        <Input
          focus
          placeholder="username"
          name="username"
          value={username}
          onChange={this.onChange.bind(this)}
          fluid
        />
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
        <Button onClick={this.onSubmit.bind(this)}>Submit</Button>
      </Container>
    );
  }
}

const registerMutation = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password)
  }
`;

export default graphql(registerMutation)(Register);
