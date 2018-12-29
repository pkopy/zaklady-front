import React, { Component } from 'react';
import Details from './Details'

class Matches extends Component {
  state = {
    idMatch : 0,
    
  }

  // showDetails = (e, match) => {
  //   e.stopPropagation();

  //   this.setState({match})
  //   this.setState({idMatch : match.id})
  // };

  render () {

    const {matches, match, showDetails, idMatch} = this.props;

    return (
      <div>
        <ol>
          {matches.map(match => 
            <li key={match.id} className="match">
              <div onClick={(e) => showDetails(e, match)}>{match.team_a} : {match.team_b}</div>
            </li>
          )}
        </ol>
        <Details 
        match={match}
        idMatch={idMatch}
        />
      </div>
    )
  };
};

export default Matches;