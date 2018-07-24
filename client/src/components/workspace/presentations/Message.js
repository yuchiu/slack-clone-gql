import React from "react";
import PropTypes from "prop-types";
import { Comment } from "semantic-ui-react";
import avatar from "../../../../assets/img/avatar.png";

const Message = ({ message, username }) => (
  <Comment>
    <Comment.Avatar src={avatar} />
    <Comment.Content>
      <Comment.Author as="a">{username}</Comment.Author>
      <Comment.Metadata>
        <div>{message.created_at}</div>
      </Comment.Metadata>
      <Comment.Text>{message.text}</Comment.Text>
      <Comment.Actions>
        <Comment.Action>Reply</Comment.Action>
      </Comment.Actions>
    </Comment.Content>
  </Comment>
);

Message.propTypes = {
  message: PropTypes.object,
  username: PropTypes.string
};

export default Message;
