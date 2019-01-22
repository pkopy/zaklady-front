import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import logo from './logo.svg';
const helpers = require('./helpers')

class Header extends Component {
  changeClass = () => {
    document.querySelector('.nav').classList.toggle('open')
  };

  logout = (e) => {
    e.preventDefault();
    const email = this.props.token.email;
    const token = this.props.token.id;

    fetch(`${helpers.ip}/logout`,{
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        email,
        token
      },
    })
    .then(() => {
      this.props.setUserData({});
      this.props.setToken({})
    })
    
    .catch(err => {
      console.log(err);
      this.props.setUserData({});
      this.props.setToken({})
    })
  };

  render () {

    const {token, idMatch} = this.props
    return (
      
      <header className="Header">
      <div className="burger_menu" onClick={this.changeClass}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M2 6h20v3H2zm0 5h20v3H2zm0 5h20v3H2z"/>
        </svg>
      </div>
        {/* <img src={logo} className="Header-logo" alt="logo" /> */}
        
          <div className="nav">
            <ul className="nav_list">
              <li className="nav_item"><Link to="/" className="nav_link">Home</Link></li>
              <li className="nav_item"><Link to="/info" className="nav_link">Info</Link></li>
              <li className="nav_item"><Link to="/x" className="nav_link">Contact</Link></li>
              <li className="nav_item">{token.id?(<Link to="/" className="nav_link" onClick={this.logout}>Logout</Link>):(<Link to="/login" className="nav_link">Login</Link>)}</li>
            </ul>
          </div>
        
        
      </header>
      
    );
  };
};

export default Header