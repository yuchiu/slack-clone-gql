import React from "react";
import PropTypes from "prop-types";

import { NavBar } from "../global";
import CreateTeamForm from "./CreateTeamForm";

const CreateTeam = ({ history }) => (
  <div className="create-team">
    <NavBar />
    <CreateTeamForm history={history} />
  </div>
);
CreateTeam.propTypes = {
  history: PropTypes.object
};
export default CreateTeam;
