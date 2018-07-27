import React, { Component } from "react";
import {
  Message,
  Form,
  Button,
  Input,
  Header,
  Container
} from "semantic-ui-react";
import { graphql } from "react-apollo";
import Proptypes from "prop-types";

import { createTeamMutation } from "../../graphql";
import { InlineError } from "../global";
import { validateClientForm } from "../../utils";

class CreateTeamForm extends Component {
  state = {
    name: "",
    clientErrors: {},
    errors: {
      nameError: ""
    }
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = async () => {
    this.setState({
      errors: {
        nameError: ""
      }
    });
    // validate user's login info on client side
    const clientErrors = validateClientForm.createTeam(this.state);
    this.setState({ clientErrors });

    // proceed to send data to server if there's no error
    if (Object.keys(clientErrors).length === 0) {
      const { history, mutate } = this.props;
      const { name } = this.state;

      let response = null;
      try {
        response = await mutate({
          variables: { name }
        });
      } catch (err) {
        history.push("/login");
        return;
      }

      const { verified, errors, team } = response.data.createTeam;

      if (verified) {
        console.log("dasad");
        history.push(`/workspace/view-channel/${team.id}`);
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
      clientErrors,
      name,
      errors: { nameError }
    } = this.state;
    const errorList = [];

    if (nameError) {
      errorList.push(nameError);
    }

    return (
      <Container text>
        <Header as="h2">Create a team</Header>
        <Form>
          <Form.Field error={!!nameError}>
            <Input
              name="name"
              onChange={this.handleChange}
              value={name}
              placeholder="Name"
              fluid
            />
          </Form.Field>
          {clientErrors.name && <InlineError text={clientErrors.name} />}
          <br />
          <Button onClick={this.handleSubmit}>Submit</Button>
        </Form>
        {errorList.length > 0 ? (
          <Message
            error
            header="There was some errors with your submission"
            list={errorList}
          />
        ) : null}
      </Container>
    );
  }
}
CreateTeamForm.propTypes = {
  mutate: Proptypes.func,
  history: Proptypes.object
};
export default graphql(createTeamMutation)(CreateTeamForm);
