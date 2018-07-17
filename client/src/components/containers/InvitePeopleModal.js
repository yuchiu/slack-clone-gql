import React from "react";
import Proptypes from "prop-types";
import { Modal, Input, Button, Form } from "semantic-ui-react";
import { graphql } from "react-apollo";
import { addTeamMember } from "../../gql";
import { formatErrors } from "../../utils";
import InlineError from "../presentations/InlineError";

class InvitePeopleModal extends React.Component {
  state = {
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
  };

  render() {
    const { open, onClose, handleBlur } = this.props;
    const { email, emailError } = this.state;
    return (
      <Modal open={open} onClose={onClose}>
        <Modal.Header>Invite People</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field>
              <Input
                value={email}
                onChange={this.handleChange}
                onBlur={handleBlur}
                name="email"
                fluid
                placeholder="User's Email"
              />
            </Form.Field>
            {emailError && <InlineError text={emailError} />}
            <Form.Group widths="equal">
              <Button onClick={this.handleSubmit} fluid>
                Invite
              </Button>
              <Button fluid onClick={onClose}>
                Cancel
              </Button>
            </Form.Group>
          </Form>
        </Modal.Content>
      </Modal>
    );
  }
}

InvitePeopleModal.propTypes = {
  open: Proptypes.boolean,
  onClose: Proptypes.func,
  handleBlur: Proptypes.func,
  isSubmitting: Proptypes.func,
  setSubmitting: Proptypes.func,
  mutate: Proptypes.func
};

export default graphql(addTeamMember)(InvitePeopleModal);
