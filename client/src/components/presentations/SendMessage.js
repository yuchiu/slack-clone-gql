import React from "react";
import Proptypes from "prop-types";
import { Input } from "semantic-ui-react";
import { SendMessageDiv } from "../../styles/viewTeam/SendMessage";

class SendMessage extends React.Component {
  render() {
    return (
      <SendMessageDiv>
        <Input fluid placeholder={`# ${this.props.channelName}`} />
      </SendMessageDiv>
    );
  }
}

SendMessage.propTypes = {
  channelName: Proptypes.func
};

export default SendMessage;
