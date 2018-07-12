import React from "react";
import Proptypes from "prop-types";
import { Container, Header } from "semantic-ui-react";
import { NavBar, CreateTeamForm } from "../containers";

class CreateTeam extends React.Component {
  render() {
    return (
      <div>
        <NavBar />
        <Container text>
          <Header as="h2">Create Team</Header>
          <CreateTeamForm history={this.props.history} />
        </Container>
      </div>
    );
  }
}

CreateTeam.propTypes = {
  history: Proptypes.object
};

export default CreateTeam;
