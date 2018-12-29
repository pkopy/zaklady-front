import React, { Component } from 'react';
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
  getInfo = () => {
    const token = this.props.token
    fetch(`${test.ip}/user`,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'email' : token.email,
        'token' : token.id
      },
    }).then(data => data.json()).then(userData => this.setState({userData}, console.log(userData)))
    .catch(err => console.log(err))
  }

  checkToken = (token) => {
    if(token.expires > Date.now()) {
      return true;
    } else {
      return false
    }
  };
  
  render () {
    const {userData, token} = this.props
    return (
      <div>
        
        {userData.name && this.checkToken(token) ?
          <ol>
          {userData.name} <br/>
          {userData.email} <br/>
          Your bets:
          
            {userData.bets.map(element => 
              <li key={element.id}>{element.match[0].team_a} : {element.match[0].team_b}</li>
            )}
          </ol> :
          <div>You must login first</div>
        }
      </div>
    )
  };
};

export default Info;