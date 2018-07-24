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

  handleSubmit = async () => {
    const { message } = this.state;
    const { onSubmit } = this.props;
    if (message) {
      await onSubmit(message);
      this.setState({ message: "" });
    }
  };

  render() {
    const { placeholder } = this.props;
    const { message } = this.state;
    return (
      <div className="send-messages">
        <Form>
          <Form.Group widths="equal">
            <Form.Field>
              <Input
                fluid
                focus
                name="message"
                value={message}
                placeholder={`# ${placeholder}`}
                onChange={this.handleChange}
              />
            </Form.Field>
            <Button fluid onClick={this.handleSubmit}>
              Send
            </Button>
          </Form.Group>
        </Form>
      </div>
    );
  }
}

SendMessage.propTypes = {
  placeholder: Proptypes.string
};
export default SendMessage;
