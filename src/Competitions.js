import React, { Component } from 'react';
import Matches from './Matches';
import './Matches.css';
import Loader from './Loader';
import './Loader.css';
import add from './add.svg'
const helpers = require('./helpers')
const body = document.querySelectorAll('body')[0];

class Competitions extends Component {
  state = {
    matches : [],
    idComp : 0,
    // match : {},
    // idMatch : 0
  };

  showCompetition = (id) => {
    const loader = document.querySelector('.container_loader');
    const backgroundloader = document.querySelector('.background_loader');
    backgroundloader.style.height = window.innerHeight + window.pageYOffset +'px'
    loader.style.display = '';
    body.style.overflowY = 'hidden';
    if (id !== this.state.idComp) {
      fetch(`${helpers.ip}/test/${id}`)
      .then(data => data.json())
      .then(data => {
        this.setState({matches : data.matches});
        this.setState({idComp: id});
        this.setState({idMatch: 0});
        loader.style.display = 'none';
        body.style.overflowY = 'auto';
        // console.log(this.state.competition.matches)
      })
      .catch(data => {
        // console.log(data)
        // this.setState({idComp : data.id_comp})
        this.setState({idComp: id});
        this.setState({matches: data.matches});
        this.setState({idMatch: 0});
        loader.style.display = 'none';
        body.style.overflowY = 'auto';
      });
    } else {
      this.setState({matches: []});
      this.setState({idComp: 0});
      this.setState({idMatch: 0});
      loader.style.display = 'none';
      body.style.overflowY = 'auto';
    }

    // document.querySelector('.match').classList.toggle('open')
  };

  

  

  render () {
    const {competitions, showDetails, addBet} = this.props;
    return (
      <div>
        <div className="competitions">
          
          <ol>
            {competitions.map(competition => 
              <li key={competition.id} className="competition" onClick={() => this.showCompetition(competition.id)}>
                <div>{competition.name}</div>
                <div><img src={`${helpers.ip}/img/${competition.img}`} alt={competition.name}/></div>
              </li>
            )}
          </ol>
        </div>
          <div className="matches">
            <Matches 
            matches={this.state.matches}
            match={this.state.match}
            idMatch={this.state.idMatch}
            showDetails={showDetails}
            addBet={addBet}
            // idComp={this.state.idComp}
            />

          </div>

      </div>
    )
  }
};

export default Competitions