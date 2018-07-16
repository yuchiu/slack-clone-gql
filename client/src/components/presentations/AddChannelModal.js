import React from "react";
import { Header, Modal } from "semantic-ui-react";

export default ({ open, onClose }) => (
  <Modal open={open} onClose={onClose}>
    <Modal.Header>Select a Photo</Modal.Header>
    <Modal.Content image>
      <Modal.Description>
        <Header>Default Profile Image</Header>
        <p>
          We've found the following gravatar image associated with your e-mail
          address.
        </p>
        <p>Is it okay to use this photo?</p>
      </Modal.Description>
    </Modal.Content>
  </Modal>
);
