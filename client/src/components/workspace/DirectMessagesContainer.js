import React from "react";
import { graphql } from "react-apollo";
import { Comment } from "semantic-ui-react";
import Proptypes from "prop-types";
import { Message } from "./presentations";
import { directMessagesQuery } from "../../graphql";

class DirectMessagesContainer extends React.Component {
  // eslint-disable-next-line camelcase
  // UNSAFE_componentWillMount() {
  //   this.unsubscribe = this.subscribe(this.props.channelId);
  // }

  // // eslint-disable-next-line camelcase
  // UNSAFE_componentWillReceiveProps({ channelId }) {
  //   if (this.props.channelId !== channelId) {
  //     if (this.unsubscribe) {
  //       this.unsubscribe();
  //     }
  //     this.unsubscribe = this.subscribe(channelId);
  //   }
  // }

  // componentWillUnmount() {
  //   if (this.unsubscribe) {
  //     this.unsubscribe();
  //   }
  // }

  // subscribe = channelId =>
  //   this.props.data.subscribeToMore({
  //     document: newChannelMessageSubscription,
  //     variables: {
  //       channelId
  //     },
  //     updateQuery: (prev, { subscriptionData }) => {
  //       if (!subscriptionData.data) {
  //         return prev;
  //       }

  //       return {
  //         ...prev,
  //         messages: [...prev.messages, subscriptionData.data.newChannelMessage]
  //       };
  //     }
  //   });

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
  channelId: Proptypes.number,
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
