import React from "react";
import Proptypes from "prop-types";
import { Modal, Input, Button, Form } from "semantic-ui-react";
import { graphql } from "react-apollo";
import { createChannelMutation } from "../../gql";

class InvitePeopleModal extends React.Component {
  state = {
    name: ""
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = async () => {
    const { teamId, mutate, onClose, setSubmitting } = this.props;
    const { name } = this.state;
    await mutate({
      variables: { teamId, name }
    });
    this.setState({ name: "" });
    onClose();
    setSubmitting(false);
  };

  render() {
    const { open, onClose, handleBlur, isSubmitting } = this.props;
    const { name } = this.state;
    return (
      <Modal open={open} onClose={onClose}>
        <Modal.Header>Invite People</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field>
              <Input
                value={name}
                onChange={this.handleChange.bind(this)}
                onBlur={handleBlur}
                name="name"
                fluid
                placeholder="user email"
              />
            </Form.Field>
            <Form.Group widths="equal">
              <Button
                disabled={isSubmitting}
                onClick={this.handleSubmit.bind(this)}
                fluid
              >
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

export default graphql(createChannelMutation)(InvitePeopleModal);
