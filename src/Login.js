import React, { Component } from 'react';
import serializeForm from 'form-serialize';

class Login extends Component {
  loginUser = (e) => {
    e.preventDefault();
    const values = serializeForm(e.target, {hash: true});
    console.log(values)

    fetch('http://localhost:3001/login',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values) 
    })
    .then(data => data.json())
    .then(data => {
      console.log(data)
      console.log(this.props.setToken(data))
    })
    .catch(err => console.log(err))
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