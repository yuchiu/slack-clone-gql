import React from "react";
import Proptypes from "prop-types";
import { Input } from "semantic-ui-react";

class SendMessage extends React.Component {
  render() {
    return (
      <div className="send-messages-wrapper">
        <Input fluid placeholder={`# ${this.props.channelName}`} />
      </div>
    );
  }
}

SendMessage.propTypes = {
  channelName: Proptypes.string
};

export default SendMessage;
