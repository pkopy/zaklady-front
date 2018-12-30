import React, { Component } from 'react';
import './Details.css'

class Details extends Component {
  render () {
    const {match, idMatch, hideDetails} = this.props
    return (
      <div className="container_details">
        <div className="background_details"></div>
        <div className="details">
          {idMatch === match.id &&
            <div>
              <div>
                <div>Name: {match.name}</div>
                <div>Team A: {match.team_a}</div>
                <div>Team B: {match.team_b}</div>
                <div>Result: {match.result}</div>
                <button onClick={hideDetails}>Close</button>
            </div>   
          </div>}
        </div>
      </div>
      
      
    )
  };
};

export default Details