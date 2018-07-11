import React from "react";
import Proptypes from "prop-types";

class Teambar extends React.Component {
  render() {
    return (
      <div className="teambar-wrapper">
        Teams
        <ul>
          {this.props.teams.map(team => <li key={team.id}>{team.letter}</li>)}
        </ul>
      </div>
    );
  }
}

Teambar.propTypes = {
  teams: Proptypes.array
};
export default Teambar;
