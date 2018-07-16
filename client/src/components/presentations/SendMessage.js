import React from "react";
import Proptypes from "prop-types";
import { Input } from "semantic-ui-react";

const SendMessage = ({ channelName }) => (
  <div className="send-messages-wrapper">
    <Input fluid placeholder={`# ${channelName}`} />
  </div>
);
SendMessage.propTypes = {
  channelName: Proptypes.string
};
export default SendMessage;
