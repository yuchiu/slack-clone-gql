import React, { Fragment } from "react";
import { graphql } from "react-apollo";
import Proptypes from "prop-types";
import { allUsersQuery } from "../../graphql";
import { NavBar } from "../global";

const Home = ({ data: { allUsers = [] } }) => (
  <Fragment>
    <NavBar />
    {allUsers.map(user => <h1 key={user.id}>{user.email}</h1>)}
  </Fragment>
);
Home.propTypes = {
  data: Proptypes.object
};

export default graphql(allUsersQuery)(Home);
