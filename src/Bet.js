import React, { Component } from 'react';


class Bet extends Component {

  setBet = (e) => {
    document.querySelectorAll('.user_bet div').forEach(ele => {
      ele.style.backgroundColor = '';
      ele.style.boxShadow = '';
    })
    
    e.target.style.backgroundColor = '#1d9acc';
    e.target.style.boxShadow = '-1px 1px 14px #1d9acc'
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