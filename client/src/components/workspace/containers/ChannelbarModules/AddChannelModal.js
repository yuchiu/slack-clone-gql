import React from "react";
import { Form, Input, Button, Modal, Message } from "semantic-ui-react";
import PropTypes from "prop-types";
import { graphql } from "react-apollo";
import findIndex from "lodash.findindex";

import { meQuery, createChannelMutation } from "../../../../graphql";
import { InlineError } from "../../../global";
import { formatErrors, validateClientForm } from "../../../../utils";

class AddChannelModal extends React.Component {
  state = {
    clientError: {},
    name: "",
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
    const clientError = validateClientForm.addChannel(this.state);
    this.setState({ clientError });

    // proceed to send data to server if there's no error
    if (Object.keys(clientError).length === 0) {
      const { teamId, mutate, onClose } = this.props;
      const { name } = this.state;
      const response = await mutate({
        variables: { teamId, name },
        update: (store, { data: { createChannel } }) => {
          const { verified, channel } = createChannel;
          if (!verified) {
            return;
          }
          const data = store.readQuery({ query: meQuery });
          const teamIdx = findIndex(data.me.teams, ["id", teamId]);
          data.me.teams[teamIdx].channels.push(channel);
          store.writeQuery({ query: meQuery, data });
        }
      });
      const { verified, errors } = response.data.createChannel;
      if (verified) {
        this.setState({ name: "" });
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
    const { name, clientError, serverError } = this.state;
    const errorList = [];
    if (serverError) {
      errorList.push(serverError);
    }

    return (
      <Modal open={open} onClose={this.handleClose}>
        <Modal.Header>Add Channel</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field>
              <Input
                value={name}
                onChange={this.handleChange.bind(this)}
                name="name"
                fluid
                placeholder="Channel name"
              />
              {clientError.name && <InlineError text={clientError.name} />}
            </Form.Field>
            <Form.Group widths="equal">
              <Button onClick={this.handleSubmit.bind(this)} fluid>
                Create Channel
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
AddChannelModal.propTypes = {
  mutate: PropTypes.func,
  open: PropTypes.bool,
  onClose: PropTypes.func
};

export default graphql(createChannelMutation)(AddChannelModal);
