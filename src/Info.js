import React, { Component } from 'react';
const test = require('./helpers')

class Info extends Component {
  state = {
    userData : {}
  }
  componentDidMount() {
    // this.getInfo()
    const token = this.props.token
    fetch(`${test.ip}/user`,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'email' : token.email,
        'token' : token.id
      },
    }).then(data => data.json()).then(userData => this.setState({userData}, console.log(userData)))
    .catch(data => console.log(data))
  }
  getInfo = () => {
    const token = this.props.token
    fetch('http://46.41.150.120:5101/user',{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'email' : token.email,
        'token' : token.id
      },
    }).then(data => data.json()).then(userData => this.setState({userData}, console.log(userData)))
    .catch(err => console.log(err))
  }
  render () {
    return (
      <div>
        
        {this.state.userData.name ?
          <ol>
          {this.state.userData.name} <br/>
          {this.state.userData.email} <br/>
          Your bets:
          
            {this.state.userData.bets.map(element => 
              <li key={element.id}>{element.bet}</li>
            )}
          </ol> :
          <div>You must login first</div>
        }
      </div>
    )
  };
};

export default Info;