import React from "react";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";
import PropTypes from "prop-types";
import { NavBar } from "../presentations";

const getAllUsersQuery = gql`
  {
    getAllUsers {
      id
      email
    }
  }
`;

class Home extends React.Component {
  displayUsers() {
    const { data } = this.props;
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