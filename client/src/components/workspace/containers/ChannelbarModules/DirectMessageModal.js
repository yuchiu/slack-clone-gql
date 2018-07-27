import React from "react";
import { Form, Input, Button, Modal } from "semantic-ui-react";
import Downshift from "downshift";
import { graphql } from "react-apollo";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import { getTeamMembersQuery } from "../../../../graphql";

const DirectMessageModal = ({
  history,
  open,
  onClose,
  teamId,
  data: { loading, getTeamMembers }
}) => (
  <Modal open={open} onClose={onClose}>
    <Modal.Header>Add Direct Message</Modal.Header>
    <Modal.Content>
      <Form>
        <Form.Field>
          {!loading && (
            <Downshift
              onChange={selectedUser => {
                history.push(
                  `/workspace/view-direct-message/${teamId}/${selectedUser.id}`
                );
                onClose();
              }}
            >
              {({
                getInputProps,
                getItemProps,
                isOpen,
                inputValue,
                selectedItem,
                highlightedIndex
              }) => (
                <div>
                  <Input
                    {...getInputProps({ placeholder: "user name" })}
                    fluid
                  />
                  {isOpen ? (
                    <div style={{ border: "1px solid #ccc" }}>
                      {getTeamMembers
                        .filter(
                          i =>
                            !inputValue ||
                            i.username
                              .toLowerCase()
                              .includes(inputValue.toLowerCase())
                        )
                        .map((item, index) => (
                          <div
                            {...getItemProps({ item })}
                            key={item.id}
                            style={{
                              backgroundColor:
                                highlightedIndex === index ? "gray" : "white",
                              fontWeight:
                                selectedItem === item ? "bold" : "normal"
                            }}
                          >
                            {item.username}
                          </div>
                        ))}
                    </div>
                  ) : null}
                </div>
              )}
            </Downshift>
          )}
        </Form.Field>
        <Button fluid onClick={onClose}>
          Cancel
        </Button>
      </Form>
    </Modal.Content>
  </Modal>
);

DirectMessageModal.propTypes = {
  open: PropTypes.bool,
  data: PropTypes.object,
  history: PropTypes.object,
  teamId: PropTypes.number,
  onClose: PropTypes.func
};

export default withRouter(graphql(getTeamMembersQuery)(DirectMessageModal));
