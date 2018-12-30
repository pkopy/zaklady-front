import React, { Component } from 'react';
import Details from './Details'
import add from './add.svg'
import info from './information.svg'
import './Details.css'

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
              <div className="match_details">
                <div ><p>{match.team_a} : {match.team_b}</p></div>
                <div className="icons"><img src={add}></img><img src={info} onClick={(e) => showDetails(e, match)}></img></div>
              </div>
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