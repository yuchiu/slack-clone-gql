import React from "react";
import Proptypes from "prop-types";
import { Container, Header } from "semantic-ui-react";
import { CreateTeamForm } from "../containers";
import { NavBar } from "../presentations";

const CreateTeam = ({ history }) => (
  <React.Fragment>
    <NavBar />
    <Container text>
      <Header as="h2">Create Team</Header>
      <CreateTeamForm history={history} />
    </Container>
  </React.Fragment>
);

CreateTeam.propTypes = {
  history: Proptypes.object
};
export default CreateTeam;
