import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Matches.css'
import './Info.css'

import minus from './img/minus.svg'
const helpers = require('./helpers')

class Info extends Component {
  // state = {
  //   userData : this.props.userData
  // }
  // componentDidMount() {
  //   // this.getInfo()

  //   const token = this.props.token
  //   console.log(this.state.userData.name)
  //   if(!this.state.userData.name) {
  //     fetch(`${helpers.ip}/user`,{
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
    // this.timer =  setInterval(() => console.log('tik-tak'), 1000);
  }
  componentWillUnmount() {
    // clearInterval(this.timer)
  }
  
  deleteBet = (e, bet) => {
    e.stopPropagation();
    let arr = [];
    const userData = this.props.userData;
    const tokenInfo = this.props.token;
    arr = userData.bets.filter(element => {
      return element.id !== bet.id
    });
    fetch(`${helpers.ip}/bet`, {
      method : 'DELETE',
      headers : {
        'Content-Type': 'application/json',
        'token': tokenInfo.id,
        'email': tokenInfo.email,
        'idbet': bet.id
      },
    })
    .then((data) => {
      // console.log(data)
      if(data.status === 403) {
        // console.log('horopcia')
      }
      userData.bets = arr;
      this.setState({userData})
      // console.log(arr)

    })
    .catch((err) => {
      // console.log('bettttttt')
      this.setState({})
    })
  }
  
  
  render () {
    const {userData, token} = this.props
    return (
      <div>
        
        {userData.accessLevel === 1 && helpers.checkToken(token) && <div>
          <Link to="/admin"className="admin_button">Admin Panel</Link>
        </div>}
        {userData.name && helpers.checkToken(token) ?
          
          <ol>
          {userData.name} <br/>
          {userData.email} <br/>
          Your bets:
          
            {userData.bets.map(element => 
              <li key={element.id} className="match">
                <div className="match_details">
                  <div ><p>{element.details.team_a} : {element.details.team_b} - {helpers.showDate(element.date)}</p></div>
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