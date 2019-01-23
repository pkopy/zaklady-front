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


const helpers = require('./helpers')
const body = document.querySelectorAll('body')[0];

class App extends Component {
  state = {
    competition: {},
    competitions: [],
    token: {},
    userData: {},
    match: {},
    idMatch: 0
  };
  
  componentDidMount() {
    const loader = document.querySelector('.container_loader')
    fetch(`${helpers.ip}/competition`)
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

  

  setUser = (token) => {
    
    this.setState({token});
    const tokenInfo = this.state.token
    fetch(`${helpers.ip}/user`,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'email': tokenInfo.email,
        'token': tokenInfo.id
      },
    })
    .then(data => data.json())
    .then(userData => {

      
      this.setState({userData}); 
      
    })
    .catch(err => console.log(err))
  
  };

  setUserData = (userData) => {
    this.setState({userData})
  };
  setToken = (token) => {
    this.setState({token})
  };

  showDetails = (e, match) => {
    e.stopPropagation();
    const containerDetails = document.querySelector('.container_details');
    const details = document.querySelector('.details');
    containerDetails.style.height = window.innerHeight + window.pageYOffset + 'px' 
    this.setState({match})
    this.setState({idMatch : match.id})
    containerDetails.style.display = 'block';
    helpers.changeElementSize(details, 600)
    .then(() => {
      // body.style.overflowY = 'hidden';
      // body.style.scrollBehavior = '';
      const detailsContent = document.querySelector('.details_content');
      detailsContent.style.display = 'block'
    })
  };

  hideDetails = () => {
    const details = document.querySelector('.details');
    const containerDetails = document.querySelector('.container_details');
    const detailsContent = document.querySelector('.details_content');
    detailsContent.style.display = 'none';
    // body.style.overflowY = 'auto';
    details.style = '';
    containerDetails.style.display = 'none';
    this.setState({idMatch : 0});
  };

  

  showBet = (e, match) => {
    
    e.stopPropagation();
    const containerBet = document.querySelector('.container_bet');
    const bet = document.querySelector('.bet');
    containerBet.style.height = window.innerHeight + window.pageYOffset + 'px' 
    this.setState({match})
    this.setState({idMatch : match.id})
    containerBet.style.display = 'block';
    
    helpers.changeElementSize(bet, 400)
    .then(() => {
      // body.style.overflowY = 'hidden';
      // document.body.scrollTop = 0;
      // document.documentElement.scrollTop = 0;
      body.style.scrollBehavior = '';
      const betContent = document.querySelector('.bet_content')
      betContent.style.display = 'block'
    })
  };

  addBet = (e, match) => {
    e.stopPropagation();
    const tokenInfo = this.state.token;
    
    const user = this.state.userData;
    const body = {
      'email': tokenInfo.email,
      'idMatch': match.id,
      'bet': 1
    }
    
    if(user.name && helpers.checkToken(tokenInfo)) {
      
      fetch(`${helpers.ip}/bet`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'token': tokenInfo.id
        },
        body: JSON.stringify(body) 
      })
      .then((res) => {
        
        
        if(res.status !== 200) {
          
          return res.json()
        } else {

          this.setUser(tokenInfo)
          return res.json()
        }
      }

      ).then(data => {
        console.log(data)
        alert(data.Error)
      })
      
      .catch(err => alert(err))
    } else {
      alert("Zaloguj się")
    }
    
  };

  hideBet = () => {
    const bet = document.querySelector('.bet');
    const containerBet = document.querySelector('.container_bet');
    const betContent = document.querySelector('.bet_content');
    betContent.style.display = 'none';
    // body.style.overflowY = 'auto';
    bet.style = '';
    containerBet.style.display = 'none';
    this.setState({idMatch : 0});
  };
  
  render() {
    
    const {competitions, token, match, idMatch, userData} = this.state
    return (
      <div>
        <Loader />
        <Header
        token={this.state.token}
        idMatch={idMatch}
        setUserData={this.setUserData}
        setToken={this.setToken}
        // helpers={() => history.push('/')}
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
          setUser={this.setUser}
          token={token}
          test={() => history.push('/info')}
          />
          )}/>

        {/* <Route path="/logout" render={({history}) => (
          <Logout
          userData={userData}
          token={token}
          test={() => history.push('/')}
          />
          )}/> */}

        <Route path="/info" render={() => (
          <Info 
          userData={this.state.userData}
          setUserData={this.setUserData}
          token={this.state.token}
          />
          )}/>
        
        <Route path="/admin" render={() => (
          <Login
          />
        )}/>


        <Route exact path="/" render={() => (
          <Competitions 
          competitions={competitions}
          showDetails={this.showDetails}
          showBet={this.showBet}
          addBet={this.addBet}
          />
          )}/>

        <Footer/>
        {/* <Footer/> */}
        {/* <footer></footer> */}
      </div>
    );
  }
}

export default App;
