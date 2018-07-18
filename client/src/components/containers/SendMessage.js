import React from "react";
import Proptypes from "prop-types";
import { Input, Form, Button } from "semantic-ui-react";

class SendMessage extends React.Component {
  state = {
    message: ""
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = () => {
    console.log(this.state.message);

    this.setState({ message: "" });
  };

  render() {
    const { channelName } = this.props;
    const { message } = this.state;
    return (
      <div className="send-messages-wrapper">
        <React.Fragment>
          <Form>
            <Form.Group widths="equal">
              <Form.Field>
                <Input
                  fluid
                  focus
                  name="message"
                  value={message}
                  placeholder={`# ${channelName}`}
                  onChange={this.handleChange}
                />
              </Form.Field>
              <Button fluid onClick={this.handleSubmit}>
                Send
              </Button>
            </Form.Group>
          </Form>
        </React.Fragment>
      </div>
    );
  }
}

SendMessage.propTypes = {
  channelName: Proptypes.string
};
export default SendMessage;
