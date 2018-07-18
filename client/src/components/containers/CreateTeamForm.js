import React from "react";
import { graphql } from "react-apollo";
import Proptypes from "prop-types";
import { Form, Input, Button, Message } from "semantic-ui-react";
import { createTeamMutation } from "../../gql";

class CreateTeamForm extends React.Component {
  state = {
    name: "",
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
      <React.Fragment>
        <Form>
          <Form.Field error={!!nameError}>
            <Input
              focus
              name="name"
              placeholder="name"
              value={name}
              onChange={this.handleChange}
              fluid
            />
          </Form.Field>
          <Button onClick={this.handleSubmit}>CreateTeam</Button>
        </Form>
        {errorList.length ? (
          <Message error header="Errors with Register" list={errorList} />
        ) : null}
      </React.Fragment>
    );
  }
}

CreateTeamForm.propTypes = {
  mutate: Proptypes.func,
  history: Proptypes.object
};

export default graphql(createTeamMutation)(CreateTeamForm);
