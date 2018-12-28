import React, { Component } from 'react';
import serializeForm from 'form-serialize';
const test = require('./helpers')

class Login extends Component {
  loginUser = (e) => {
    e.preventDefault();
    const values = serializeForm(e.target, {hash: true});
    console.log(test.ip)

    fetch(`${test.ip}/login`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values) 
    })
    .then(data => data.json())
    .then(data => {
      console.log(data)
      if(data.id) {
        this.props.setToken(data);
        this.props.test()
      }
    })
    .catch(data => console.log(data))
  };
  render () {
    return (
      <div>
        <form method="POST" onSubmit={this.loginUser}>
          email:<input type="text" name="email"/>
          passw:<input type="password" name="password"/>
          <button className="login-button">Login</button>
        </form>
      </div>
    )
  };
};

export default Login;