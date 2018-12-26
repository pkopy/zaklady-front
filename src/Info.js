import React, { Component } from 'react';

class Info extends Component {
  state = {
    userData : {}
  }
  componentDidMount() {
    this.getInfo()
  }
  getInfo = () => {
    const token = this.props.token
    fetch('http://localhost:3001/user',{
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
        {this.state.userData.name} <br/>
        {/* {this.state.userData.bets} <br/> */}
        {this.state.userData.email} <br/>
      </div>
    )
  };
};

export default Info;