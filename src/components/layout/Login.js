import React from "react";
import { Container, Header, Input, Button, Message } from "semantic-ui-react";

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
    console.log(this.state);
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

export default Login;
