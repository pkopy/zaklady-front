import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Competitions from './Competitions';
import Loader from './Loader';
import Login from './Login';
import Info from './Info';
import Details from './Details'
import Bet from './Bet'
import './Header.css';
import './Competitions.css';
import './Loader.css';
import './Login.css';
import './Details.css'
import './Bet.css'

const test = require('./helpers')
const body = document.querySelectorAll('body')[0];

class App extends Component {
  state = {
    competition : {},
    competitions : [],
    token : {},
    userData : {},
    match : {},
    idMatch : 0
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

  showDetails = (e, match) => {
    e.stopPropagation();
    const containerDetails = document.querySelector('.container_details');
    const details = document.querySelector('.details');
    containerDetails.style.height = window.innerHeight + window.pageYOffset + 'px' 
    this.setState({match})
    this.setState({idMatch : match.id})
    containerDetails.style.display = 'block';
    test.changeElementSize(details, 600)
    .then(() => {
      body.style.overflowY = 'hidden';
      body.style.scrollBehavior = '';
      const detailsContent = document.querySelector('.details_content')
      detailsContent.style.display = 'block'
    })
  };

  hideDetails = () => {
    const details = document.querySelector('.details');
    const containerDetails = document.querySelector('.container_details')
    body.style.overflowY = 'auto';
    details.style = '';
    containerDetails.style.display = 'none';
    this.setState({idMatch : 0});
  };
  hideBet = () => {
    const details = document.querySelector('.bet');
    const containerDetails = document.querySelector('.container_bet')
    body.style.overflowY = 'auto';
    details.style = '';
    containerDetails.style.display = 'none';
    this.setState({idMatch : 0});
  };

  showBet = (e, match) => {
    console.log(match)
    e.stopPropagation();
    const containerBet = document.querySelector('.container_bet');
    const bet = document.querySelector('.bet');
    containerBet.style.height = window.innerHeight + window.pageYOffset + 'px' 
    this.setState({match})
    this.setState({idMatch : match.id})
    containerBet.style.display = 'block';
    
    test.changeElementSize(bet, 400)
    .then(() => {
      body.style.overflowY = 'hidden';
      // document.body.scrollTop = 0;
      // document.documentElement.scrollTop = 0;
      body.style.scrollBehavior = '';
      const betContent = document.querySelector('.bet_content')
      betContent.style.display = 'block'
    })
  };
  
  render() {
    // console.log(test.test)
    const {competitions, token, match, idMatch} = this.state
    return (
      <div>
        <Loader />
        <Header
        login={this.state.token.id}
        idMatch={idMatch}
        />
        <Details 
        match={match}
        idMatch={idMatch}
        hideDetails={this.hideDetails}
        />

        <Bet
        match={match}
        idMatch={idMatch}
        hideBet={this.hideBet}
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
          showDetails={this.showDetails}
          showBet={this.showBet}
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
