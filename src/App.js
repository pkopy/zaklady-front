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
import './Login.css';
import './Details.css'

const test = require('./helpers')

class App extends Component {
  state = {
    competition : {},
    competitions : [],
    token : {},
    userData : {}
  };
  
  componentDidMount() {
    const loader = document.querySelector('.container_loader')
    fetch(`${test.ip}/competition`)
    .then(data => data.json())
    .then(data => {
      this.setState({competitions : data});
      loader.style.display = 'none';
    })
    .catch(err => {
      loader.style.display = 'none';
    })   

    // document.querySelectorAll('.Footer')[0].addEventListener('click', (e) => {
    //   console.log(window)
    //     console.log(e.target.offsetParent.clientHeight)
    //     e.target.style.top =  e.target.offsetParent.clientHeight + 50 + 'px'
    //   })
    
  };

  

  setToken = (token) => {
    console.log(`token: ${token.email}, ${token.id}`)
    this.setState({token});
    const tokenInfo = this.state.token
    fetch(`${test.ip}/user`,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'email' : tokenInfo.email,
        'token' : tokenInfo.id
      },
    })
    .then(data => data.json())
    .then(userData => {
      console.log(userData)
      this.setState({userData}); 
      
    })
    .catch(data => console.log(data))
  
  };

  setUserData = (userData) => {
    this.setState({userData})
  };

  

  
  render() {
    // console.log(test.test)
    const {competitions, token} = this.state
    return (
      <div>
        <Loader />
        <Header
        login={this.state.token.id}
        />
        
        <Route path="/login" render={({history}) => (
          <Login 
          setToken={this.setToken}
          token={token}
          test={() => history.push('/info')}
          />
          )}/>

        <Route path="/info" render={() => (
          <Info 
          userData={this.state.userData}
          setUserData={this.setUserData}
          token={this.state.token}
          />
          )}/>


        <Route exact path="/" render={() => (
          <Competitions 
          competitions={competitions}
          render={this.render}
          />
          )}/>

        {/* <Footer/> */}
        {/* <Footer/> */}
        {/* <footer></footer> */}
      </div>
    );
  }
}

export default App;
