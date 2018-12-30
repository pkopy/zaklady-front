import React, { Component } from 'react';
import Matches from './Matches';
import './Matches.css';
import Loader from './Loader';
import './Loader.css';
import add from './add.svg'
const test = require('./helpers')


class Competitions extends Component {
  state = {
    matches : [],
    idComp : 0,
    match : {},
    idMatch : 0
  };

  showCompetition = (id) => {
    const loader = document.querySelector('.container_loader');
    loader.style.display = '';
    if (id !== this.state.idComp) {
      fetch(`${test.ip}/test/${id}`)
      .then(data => data.json())
      .then(data => {
        // console.log(data)
        // this.setState({idComp : data.id_comp})
        this.setState({matches : data.matches});
        this.setState({idComp : id});
        this.setState({idMatch : 0});
        loader.style.display = 'none';
        // console.log(this.state.competition.matches)
      })
      .catch(data => {
        // console.log(data)
        // this.setState({idComp : data.id_comp})
        this.setState({idComp : id});
        this.setState({matches : data.matches});
        this.setState({idMatch : 0});
        loader.style.display = 'none';
      });
    } else {
      this.setState({matches : []});
      this.setState({idComp : 0});
      this.setState({idMatch : 0});
      loader.style.display = 'none';

    }

    // document.querySelector('.match').classList.toggle('open')
  };

  showDetails = (e, match) => {
    console.log(match)
    e.stopPropagation();
    // document.querySelector('.details').classList.toggle('open')
    // e.target.className = 'details'
    test.changeElementSize(document.querySelector('.details'), 600)
    this.setState({match})
    this.setState({idMatch : match.id})
  };

  

  render () {
    const {competitions} = this.props;
    return (
      <div>
        <div className="competitions">
          
          <ol>
            {competitions.map(competition => 
              <li key={competition.id} className="competition" onClick={() => this.showCompetition(competition.id)}>
                <div>{competition.name}</div>
                <div><img src={`${test.ip}/img/${competition.img}`}></img></div>
              </li>
            )}
          </ol>
        </div>
          <div className="matches">
            <Matches 
            matches={this.state.matches}
            match={this.state.match}
            idMatch={this.state.idMatch}
            showDetails={(e, match)=>this.showDetails(e, match)}
            // idComp={this.state.idComp}
            />

          </div>

      </div>
    )
  }
};

export default Competitions