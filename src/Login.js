import React, { Component } from 'react';
import serializeForm from 'form-serialize';
const test = require('./helpers')

class Login extends Component {
  state = {
    passLengt : false
  }
  loginUser = (e) => {
    e.preventDefault();
    const values = serializeForm(e.target, {hash: true});
    const email = /[\w+0-9._%+-]+@[\w+0-9.-]+\.[\w+]{2,3}/.test(values.email.trim())
    console.log(values)
    if(this.state.passLengt && email) {
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
        }
        return data
      })
      .then((data) => {
        
        this.props.test()
      })
      .catch(data => console.log(data))

    }
  };

  checkPass = (e) => {
    if (e.target.value.length > 5) {
      this.setState({passLengt : true})
    } else {
      this.setState({passLengt : false})
    }
  };

  render () {
    return (
      <div className="form">
        <form method="POST" onSubmit={this.loginUser}>
          <p>Email:</p>
          <input type="text" name="email"/><br/>
          <p>Password:</p>
          <input type="password" name="password" onKeyUp={this.checkPass}/><br/>
          {/* {this.state.passLengt && <p className="pass-info">Password is too short </p>} */}
          <button disabled={!this.state.passLengt} className={!this.state.passLengt ? "login-button-disabled":"login-button"}>Login</button>
        </form>
      </div>
    )
  };
};

export default Login;