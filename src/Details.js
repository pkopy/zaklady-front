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
                <h1>{match.team_a} : {match.team_b}</h1>
                <div>Name: {match.name}</div>
                
                <div>Result: {match.result}</div>
                <button className="close_button" onClick={hideDetails}></button>
            </div>   
          </div>}
        </div>
      </div>
      
      
    )
  };
};

export default Details