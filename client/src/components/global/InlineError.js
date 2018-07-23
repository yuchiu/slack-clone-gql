import React from "react";
import PropTypes from "prop-types";

const InlineError = ({ text }) => (
  <span className="inline-error-span">{text}</span>
);

InlineError.propTypes = {
  text: PropTypes.string.isRequired
};

export default InlineError;
