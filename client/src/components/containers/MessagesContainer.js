import React from "react";
import PropTypes from "prop-types";
import { graphql } from "react-apollo";
// import { Messages } from "../presentations";
import { messagesQuery } from "../../gql";

class MessagesContainer extends React.Component {
  loadMessages() {
    const {
      data: { loading, messages }
    } = this.props;
    if (loading) {
      return null;
    }
    return <React.Fragment>{JSON.stringify(messages)}</React.Fragment>;
  }

  render() {
    return <React.Fragment>{this.loadMessages()}</React.Fragment>;
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
