import React from "react";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";
import Proptypes from "prop-types";
import {
  Form,
  Container,
  Header,
  Input,
  Button,
  Message
} from "semantic-ui-react";
import { NavBar } from "../presentations";

class Login extends React.Component {
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
    const { email, password, emailError, passwordError } = this.state;
    const errorList = [];
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
          <Header as="h2">Log In</Header>
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
        </Container>
      </div>
    );
  }
}
Login.propTypes = {
  mutate: Proptypes.func,
  history: Proptypes.object
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
