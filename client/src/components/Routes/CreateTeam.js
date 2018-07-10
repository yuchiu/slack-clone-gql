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

class CreateTeam extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      errors: {
        nameError: ""
      }
    };
  }

  onChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  async onSubmit() {
    const { name } = this.state;
    const response = await this.props.mutate({
      variables: { name }
    });
    const { verified, errors } = response.data.createTeam;

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
      name,
      errors: { nameError }
    } = this.state;
    const errorList = [];
    if (nameError) {
      errorList.push(nameError);
    }
    return (
      <div>
        <NavBar />
        <Container text>
          <Header as="h2">Create Team</Header>
          <Form>
            <Form.Field error={!!nameError}>
              <Input
                focus
                name="name"
                placeholder="name"
                value={name}
                onChange={this.onChange.bind(this)}
                fluid
              />
            </Form.Field>
            <Button onClick={this.onSubmit.bind(this)}>CreateTeam</Button>
          </Form>
          {errorList.length ? (
            <Message error header="Errors with Register" list={errorList} />
          ) : null}
        </Container>
      </div>
    );
  }
}

const createTeamMutation = gql`
  mutation($name: String!) {
    createTeam(name: $name) {
      verified
      errors {
        path
        message
      }
    }
  }
`;

CreateTeam.propTypes = {
  mutate: Proptypes.func,
  history: Proptypes.object
};

export default graphql(createTeamMutation)(CreateTeam);
