import React from "react";
import { graphql } from "react-apollo";
import PropTypes from "prop-types";
import { NavBar } from "../containers";
import { getAllUsersQuery } from "../../gql";

class Home extends React.Component {
  displayUsers() {
    const { data } = this.props;
    console.log(data);
    if (data.loading) {
      return <div>loading Users..</div>;
    }
    return data.getAllUsers.map(user => <h1 key={user.id}>{user.email}</h1>);
  }

  render() {
    return (
      <div>
        <NavBar />
        {this.displayUsers()}
      </div>
    );
  }
}

Home.propTypes = {
  data: PropTypes.object
};

export default graphql(getAllUsersQuery)(Home);
