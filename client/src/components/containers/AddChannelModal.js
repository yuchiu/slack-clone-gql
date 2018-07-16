import React from "react";
import Proptypes from "prop-types";
import { Modal, Input, Button, Form } from "semantic-ui-react";
import { graphql } from "react-apollo";
import { createChannelMutation } from "../../gql";

class AddChannelModal extends React.Component {
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
    let response = null;
    let { teamId } = this.props;
    console.log(teamId);
    teamId = parseInt(teamId, 10);
    if (isNaN(teamId)) {
      teamId = 1;
    }
    const { name } = this.state;
    response = await this.props.mutate({
      variables: { teamId, name }
    });
    console.log(response);
    this.props.onClose();
    this.props.setSubmitting(false);
    this.setState({ name: "" });
  };

  render() {
    const { open, onClose, handleBlur, isSubmitting } = this.props;
    const { name } = this.state;
    return (
      <Modal open={open} onClose={onClose}>
        <Modal.Header>Add Channel</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field>
              <Input
                value={name}
                onChange={this.handleChange.bind(this)}
                onBlur={handleBlur}
                name="name"
                fluid
                placeholder="Channel name"
              />
            </Form.Field>
            <Form.Group widths="equal">
              <Button
                disabled={isSubmitting}
                onClick={this.handleSubmit.bind(this)}
                fluid
              >
                Create Channel
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

AddChannelModal.propTypes = {
  open: Proptypes.boolean,
  onClose: Proptypes.func,
  handleBlur: Proptypes.func,
  isSubmitting: Proptypes.func,
  setSubmitting: Proptypes.func,
  mutate: Proptypes.func
};

export default graphql(createChannelMutation)(AddChannelModal);