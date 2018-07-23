import React, { Component } from "react";
import { Message, Form, Button, Input, Header } from "semantic-ui-react";
import { graphql } from "react-apollo";
import Proptypes from "prop-types";
import { createTeamMutation } from "../../graphql";
import { NavBar } from "../global";

class CreateTeam extends Component {
  state = {
    name: "",
    errors: {
      nameError: ""
    }
  };

  handleSubmit = async () => {
    const { name } = this.state;
    let response = null;

    try {
      response = await this.props.mutate({
        variables: { name }
      });
    } catch (err) {
      this.props.history.push("/login");
      return;
    }

    const { verified, errors, team } = response.data.createTeam;

    if (verified) {
      this.props.history.push(`/workspace/${team.id}`);
    } else {
      const err = {};
      errors.forEach(({ path, message }) => {
        err[`${path}Error`] = message;
      });
      this.setState(err);
    }
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

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
      <div className="create-team">
        <NavBar />
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
          <Button onClick={this.handleSubmit}>Submit</Button>
        </Form>
        {errorList.length > 0 ? (
          <Message
            error
            header="There was some errors with your submission"
            list={errorList}
          />
        ) : null}
      </div>
    );
  }
}
CreateTeam.propTypes = {
  mutate: Proptypes.func,
  history: Proptypes.object
};
export default graphql(createTeamMutation)(CreateTeam);
