import React, { Component } from 'react';
import './Matches.css'
import './Info.css'
import minus from './minus.svg'
const test = require('./helpers')

class Info extends Component {
  // state = {
  //   userData : this.props.userData
  // }
  // componentDidMount() {
  //   // this.getInfo()

  //   const token = this.props.token
  //   console.log(this.state.userData.name)
  //   if(!this.state.userData.name) {
  //     fetch(`${test.ip}/user`,{
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'email' : token.email,
  //         'token' : token.id
  //       },
  //     }).then(data => data.json()).then(userData => this.props.setUserData({userData}, console.log(userData)))
  //     .catch(data => console.log(data))
  //   }
  // }
  componentDidMount() {
    this.timer =  setInterval(() => console.log('tik-tak'), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.timer)
  }
  
  deleteBet = (e, bet) => {
    e.stopPropagation();
    let arr = [];
    const userData = this.props.userData;
    const tokenInfo = this.props.token;
    arr = userData.bets.filter(element => {
      return element.id !== bet.id
    });
    fetch(`${test.ip}/bet`, {
      method : 'DELETE',
      headers : {
        'Content-Type': 'application/json',
        'token' : tokenInfo.id,
        'email' : tokenInfo.email,
        'idbet' : bet.id
      },
    })
    .then(() => {
      userData.bets = arr;
      this.setState({userData})
      console.log(arr)

    })
  }
  
  
  render () {
    const {userData, token} = this.props
    return (
      <div>
        {userData.accessLevel === 1 && <div>
          <button className="admin_button">Admin Panel</button>
        </div>}
        {userData.name && test.checkToken(token) ?
          
          <ol>
          {userData.name} <br/>
          {userData.email} <br/>
          Your bets:
          
            {userData.bets.map(element => 
              <li key={element.id} className="match">
                <div className="match_details">
                  <div ><p>{element.details[0].team_a} : {element.details[0].team_b} - {test.showDate(element.date)}</p></div>
                  <div className="icons"><img className="icon" src={minus} onClick={(e) => this.deleteBet(e, element)}></img></div>

                </div>
              </li>
            )}
          </ol> :
          <div>You must login first</div>
        }
      </div>
    )
  };
};

export default Info;