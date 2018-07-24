import React from "react";
import { Form, Input, Button, Modal, Message } from "semantic-ui-react";
import { graphql } from "react-apollo";
import Proptypes from "prop-types";
import { addTeamMemberMutation } from "../../graphql";
import { formatErrors, validateClientForm } from "../../utils";
import { InlineError } from "../global";

class InvitePeopleModal extends React.Component {
  state = {
    clientErrors: {},
    email: "",
    emailError: ""
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = async () => {
    this.setState({
      emailError: ""
    });
    // validate user's login info on client side
    const clientErrors = validateClientForm.invitePeople(this.state);
    this.setState({ clientErrors });

    // proceed to send data to server if there's no error
    if (Object.keys(clientErrors).length === 0) {
      const { teamId, mutate, onClose } = this.props;
      const { email } = this.state;
      const response = await mutate({
        variables: { teamId, email }
      });

      const { verified, errors } = response.data.addTeamMember;
      console.log(response);
      if (verified) {
        this.setState({ email: "" });
        onClose();
      } else {
        const emailError = formatErrors(errors).email[0];
        this.setState({ emailError });
      }
    }
  };

  render() {
    const { open, onClose } = this.props;
    const { email, emailError, clientErrors } = this.state;
    const errorList = [];

    if (emailError) {
      errorList.push(emailError);
    }

    return (
      <Modal open={open} onClose={onClose}>
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
            {clientErrors.email && <InlineError text={clientErrors.email} />}
            <br />
            <Form.Group widths="equal">
              <Button onClick={this.handleSubmit} fluid>
                Invite
              </Button>
              <Button fluid onClick={onClose}>
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
