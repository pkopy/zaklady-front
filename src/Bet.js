import React, { Component } from 'react';


class Bet extends Component {

  setBet = (e) => {
    document.querySelectorAll('.user_bet div').forEach(ele => {
      ele.style.backgroundColor = ''
    })
    
    e.target.style.backgroundColor = 'green'
  }
  render () {
    const {hideBet, match, idMatch} = this.props;

    return (
      <div className="container_bet">
        <div className="background_details"></div>
        <div className="bet">
          <div className="bet_content">
            <h1>Your Bet</h1>
            <div className="user_bet">
              <div onClick={this.setBet}>{match.team_a}</div>
              <div onClick={this.setBet}>DRAW</div>
              <div onClick={this.setBet}>{match.team_b}</div>
            </div>
          
          </div>
          <button className="close_button" onClick={hideBet}></button>
        
        </div>
      </div>
    );
  };
};

export default Bet