import React from "react";
import logo from "../../assets/img/logo.png";

class Home extends React.Component {
  render() {
    return (
      <div>
        <img id="logo" src={logo} />
        <br />React Boilerplate
      </div>
    );
  }
}

export default Home;
