import React from "react";
import { Form, Input, Button, Modal } from "semantic-ui-react";
import Proptypes from "prop-types";
import { graphql } from "react-apollo";
import findIndex from "lodash.findindex";
import { allTeamsQuery, createChannelMutation } from "../../graphql";

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
    const { teamId, mutate, onClose } = this.props;
    const { name } = this.state;
    await mutate({
      variables: { teamId, name },
      update: (store, { data: { createChannel } }) => {
        const { verified, channel } = createChannel;
        if (!verified) {
          return;
        }
        const data = store.readQuery({ query: allTeamsQuery });
        console.log(data);
        const teamIdx = findIndex(data.allTeams, ["id", teamId]);
        data.allTeams[teamIdx].channels.push(channel);
        store.writeQuery({ query: allTeamsQuery, data });
      }
    });
    this.setState({ name: "" });
    onClose();
  };

  render() {
    const { open, onClose } = this.props;
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
                name="name"
                fluid
                placeholder="Channel name"
              />
            </Form.Field>
            <Form.Group widths="equal">
              <Button onClick={this.handleSubmit.bind(this)} fluid>
                Create Channel
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
AddChannelModal.propTypes = {
  mutate: Proptypes.func,
  open: Proptypes.bool,
  onClose: Proptypes.func
};

export default graphql(createChannelMutation)(AddChannelModal);
