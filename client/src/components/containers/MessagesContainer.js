import React from "react";
import PropTypes from "prop-types";
import { graphql } from "react-apollo";
import { Comment } from "semantic-ui-react";
import { Message } from "../presentations";
import { messagegql } from "../../gql";

class MessagesContainer extends React.Component {
  render() {
    const {
      data: { loading, messages }
    } = this.props;
    return loading ? null : (
      <div className="message-wrapper">
        <Comment.Group className="messages-container">
          {messages.map(message => (
            <Message key={message.id} message={message} />
          ))}
        </Comment.Group>
      </div>
    );
  }
}

MessagesContainer.propTypes = {
  channelId: PropTypes.number,
  data: PropTypes.object
};

export default graphql(messagegql.messagesQuery, {
  variables: props => ({
    channelId: props.channelId
  })
})(MessagesContainer);
