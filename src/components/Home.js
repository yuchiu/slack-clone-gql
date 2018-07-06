import React from "react";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";

class Home extends React.Component {
  render() {
    console.log(this.props.data.getAllUsers);
    return <div>dadsaasd</div>;
  }
}

const getAllUsersQuery = gql`
  {
    getAllUsers {
      id
      email
    }
  }
`;

export default graphql(getAllUsersQuery)(Home);
