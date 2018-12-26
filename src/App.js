import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Competitions from './Competitions';
import Loader from './Loader';
import Login from './Login';
import Info from './Info';
import './Header.css';
import './Competitions.css';
import './Loader.css';
const test = require('./helpers')

class App extends Component {
  state = {
    competition : {},
    competitions : [],
    token : {}
  };

  componentDidMount() {
    const loader = document.querySelector('.container_loader')
    fetch('http://localhost:3001/competition')
    .then(data => data.json())
    .then(data => {
      this.setState({competitions : data});
      loader.style.display = 'none';
    })  
  };

  setToken = (token) => {
    this.setState({token})
  };

  
  render() {
    // console.log(test.test)
    const {competitions} = this.state
    return (
      <div>
        <Loader />
        <Header
        login={this.state.token.id}
        />
        <Route path="/login" render={() => (
          <Login 
          setToken={this.setToken}
          />
        )}/>

        <Route path="/info" render={() => (
          <Info 
          token={this.state.token}
          />
        )}/>


        <Route exact path="/" render={() => (
          <Competitions 
            competitions={competitions}
          />
        )}/>

        <Footer/>

      </div>
    );
  }
}

export default App;
