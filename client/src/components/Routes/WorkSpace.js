import React from "react";
import Proptypes from "prop-types";
import { ViewWorkspace } from "../containers";

const WorkSpace = ({ match, history }) => (
  <div className="workspace-wrapper">
    <ViewWorkspace match={match} history={history} />
  </div>
);
WorkSpace.propTypes = {
  match: Proptypes.object,
  history: Proptypes.object
};

export default WorkSpace;
