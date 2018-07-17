import React from "react";
import Proptypes from "prop-types";
import { Modal, Input, Button, Form } from "semantic-ui-react";
import { graphql } from "react-apollo";
import { addTeamMember } from "../../gql";

class InvitePeopleModal extends React.Component {
  state = {
    email: ""
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = async () => {
    const { teamId, mutate, onClose, setSubmitting } = this.props;
    const { email } = this.state;
    const response = await mutate({
      variables: { teamId, email }
    });
    this.setState({ email: "" });
    console.log(response);
    onClose();
    setSubmitting(false);
  };

  render() {
    const { open, onClose, handleBlur, isSubmitting } = this.props;
    const { email } = this.state;
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
            <Form.Group widths="equal">
              <Button disabled={isSubmitting} onClick={this.handleSubmit} fluid>
                Invite
              </Button>
              <Button disabled={isSubmitting} fluid onClick={onClose}>
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
