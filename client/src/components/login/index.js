import React from "react";
import PropTypes from "prop-types";

import { NavBar } from "../global";
import LoginForm from "./LoginForm";

const Login = ({ history }) => (
  <div className="login">
    <NavBar />
    <LoginForm history={history} />
  </div>
);

Login.propTypes = {
  history: PropTypes.object
};
export default Login;
