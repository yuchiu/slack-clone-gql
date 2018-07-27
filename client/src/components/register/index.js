import React from "react";
import PropTypes from "prop-types";

import { NavBar } from "../global";
import RegisterForm from "./RegisterForm";

const Register = ({ history }) => (
  <div className="register">
    <NavBar />
    <RegisterForm history={history} />
  </div>
);
Register.propTypes = {
  history: PropTypes.object
};
export default Register;
