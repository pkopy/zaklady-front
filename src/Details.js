import React, { Component } from 'react';

class Details extends Component {
  render () {
    const {match, idMatch} = this.props
    return (
      <div>
        {idMatch === match.id && 
        <div>
          <div>Name: {match.name}</div>
          <div>Team A: {match.team_a}</div>
          <div>Team B: {match.team_b}</div>
          <div>Result: {match.result}</div>
        </div>}

      </div>
    )
  };
};

export default Details