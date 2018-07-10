import React from "react";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";
import {
  Form,
  Container,
  Header,
  Input,
  Button,
  Message
} from "semantic-ui-react";
import Proptypes from "prop-types";
import { NavBar } from "../presentations";

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

  async onSubmit() {
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
      this.props.history.push("/");
    } else {
      const err = {};
      errors.forEach(({ path, message }) => {
        err[`${path}Error`] = message;
      });
      this.setState(err);
    }
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
      <div>
        <NavBar />
        <Container text>
          <Header as="h2">Register</Header>
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
            <Button onClick={this.onSubmit.bind(this)}>Register</Button>
          </Form>
          {errorList.length ? (
            <Message error header="Errors with Register" list={errorList} />
          ) : null}
        </Container>
      </div>
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
      verified
      errors {
        path
        message
      }
    }
  }
`;

export default graphql(registerMutation)(Register);
