import React from "react";
import PropTypes from "prop-types";
import { graphql } from "react-apollo";
import { Comment } from "semantic-ui-react";
import { Message } from "../presentations";
import { messagesQuery } from "../../gql";

class MessagesContainer extends React.Component {
  loadMessages() {
    const {
      data: { loading, messages }
    } = this.props;
    if (loading) {
      return null;
    }
    return messages.map(message => (
      <Message key={message.id} message={message} />
    ));
  }

  render() {
    return (
      <div className="message-wrapper">
        <Comment.Group className="messages-container">
          {this.loadMessages()}
        </Comment.Group>
      </div>
    );
  }
}

MessagesContainer.propTypes = {
  channelId: PropTypes.number,
  data: PropTypes.object
};

export default graphql(messagesQuery, {
  variables: props => ({
    channelId: props.channelId
  })
})(MessagesContainer);
