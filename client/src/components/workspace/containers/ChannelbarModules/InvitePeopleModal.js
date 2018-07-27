import React from "react";
import { Form, Input, Button, Modal, Message } from "semantic-ui-react";
import { graphql } from "react-apollo";
import Proptypes from "prop-types";

import { addTeamMemberMutation } from "../../../../graphql";
import { formatErrors, validateClientForm } from "../../../../utils";
import { InlineError } from "../../../global";

class InvitePeopleModal extends React.Component {
  state = {
    clientError: {},
    email: "",
    serverError: ""
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = async () => {
    this.setState({
      serverError: ""
    });
    // validate user's login info on client side
    const clientError = validateClientForm.invitePeople(this.state);
    this.setState({ clientError });

    // proceed to send data to server if there's no error
    if (Object.keys(clientError).length === 0) {
      const { teamId, mutate, onClose } = this.props;
      const { email } = this.state;
      const response = await mutate({
        variables: { teamId, email }
      });

      const { verified, errors } = response.data.addTeamMember;
      console.log(response.data);
      if (verified) {
        this.setState({ email: "" });
        onClose();
      } else {
        const serverError = formatErrors(errors).email[0];
        this.setState({ serverError });
      }
    }
  };

  handleClose = e => {
    const { onClose } = this.props;
    e.preventDefault();
    this.setState({ name: "" });
    onClose();
  };

  render() {
    const { open } = this.props;
    const { email, serverError, clientError } = this.state;
    const errorList = [];

    if (serverError) {
      errorList.push(serverError);
    }

    return (
      <Modal open={open} onClose={this.handleClose}>
        <Modal.Header>Invite People</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field>
              <Input
                value={email}
                onChange={this.handleChange}
                name="email"
                fluid
                placeholder="User's Email"
              />
            </Form.Field>
            {clientError.email && <InlineError text={clientError.email} />}
            <br />
            <Form.Group widths="equal">
              <Button onClick={this.handleSubmit} fluid>
                Invite
              </Button>
              <Button fluid onClick={this.handleClose}>
                Cancel
              </Button>
            </Form.Group>
          </Form>
          {errorList.length > 0 ? (
            <Message
              error
              header="There was some errors with your submission."
              list={errorList}
            />
          ) : null}
        </Modal.Content>
      </Modal>
    );
  }
}

InvitePeopleModal.propTypes = {
  mutate: Proptypes.func,
  open: Proptypes.bool,
  onClose: Proptypes.func
};

export default graphql(addTeamMemberMutation)(InvitePeopleModal);
