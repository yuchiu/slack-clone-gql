import React from "react";
import { graphql } from "react-apollo";
import { Comment } from "semantic-ui-react";
import Proptypes from "prop-types";
import avatar from "../../../assets/img/avatar.png";
import { newChannelMessageSubscription, messagesQuery } from "../../graphql";

class MessagesContainer extends React.Component {
  // eslint-disable-next-line camelcase
  UNSAFE_componentWillMount() {
    this.unsubscribe = this.subscribe(this.props.channelId);
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps({ channelId }) {
    if (this.props.channelId !== channelId) {
      if (this.unsubscribe) {
        this.unsubscribe();
      }
      this.unsubscribe = this.subscribe(channelId);
    }
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  subscribe = channelId =>
    this.props.data.subscribeToMore({
      document: newChannelMessageSubscription,
      variables: {
        channelId
      },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) {
          return prev;
        }

        return {
          ...prev,
          messages: [...prev.messages, subscriptionData.data.newChannelMessage]
        };
      }
    });

  render() {
    const {
      data: { loading, messages }
    } = this.props;

    return loading ? null : (
      <div className="messages">
        <Comment.Group>
          {messages.map(message => (
            <Comment key={message.id}>
              <Comment.Avatar src={avatar} />
              <Comment.Content>
                <Comment.Author as="a">{message.user.username}</Comment.Author>
                <Comment.Metadata>
                  <div>{message.created_at}</div>
                </Comment.Metadata>
                <Comment.Text>{message.text}</Comment.Text>
                <Comment.Actions>
                  <Comment.Action>Reply</Comment.Action>
                </Comment.Actions>
              </Comment.Content>
            </Comment>
          ))}
        </Comment.Group>
      </div>
    );
  }
}
MessagesContainer.propTypes = {
  channelId: Proptypes.number,
  data: Proptypes.object
};

export default graphql(messagesQuery, {
  options: props => ({
    variables: {
      channelId: props.channelId
    },
    fetchPolicy: "network-only"
  })
})(MessagesContainer);
