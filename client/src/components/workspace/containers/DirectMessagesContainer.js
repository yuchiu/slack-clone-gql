import React from "react";
import { graphql } from "react-apollo";
import { Comment } from "semantic-ui-react";
import Proptypes from "prop-types";

import { Message } from "../presentations";
import {
  directMessagesQuery,
  newDirectMessageSubscription
} from "../../../graphql";

class DirectMessagesContainer extends React.Component {
  // eslint-disable-next-line camelcase
  UNSAFE_componentWillMount() {
    this.unsubscribe = this.subscribe(this.props.teamId, this.props.userId);
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps({ teamId, userId }) {
    if (this.props.teamId !== teamId || this.props.userId !== userId) {
      if (this.unsubscribe) {
        this.unsubscribe();
      }
      this.unsubscribe = this.subscribe(teamId, userId);
    }
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  subscribe = (teamId, userId) =>
    this.props.data.subscribeToMore({
      document: newDirectMessageSubscription,
      variables: {
        teamId,
        userId
      },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) {
          return prev;
        }

        return {
          ...prev,
          directMessages: [
            ...prev.directMessages,
            subscriptionData.data.newDirectMessage
          ]
        };
      }
    });

  render() {
    const {
      data: { loading, directMessages }
    } = this.props;
    return loading ? null : (
      <div className="messages">
        <Comment.Group>
          {directMessages.map(message => (
            <Message
              key={message.id}
              message={message}
              username={message.sender.username}
            />
          ))}
        </Comment.Group>
      </div>
    );
  }
}
DirectMessagesContainer.propTypes = {
  teamId: Proptypes.number,
  userId: Proptypes.number,
  data: Proptypes.object
};

export default graphql(directMessagesQuery, {
  options: props => ({
    variables: {
      userId: props.userId,
      teamId: props.teamId
    },
    fetchPolicy: "network-only"
  })
})(DirectMessagesContainer);
