import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import './App.css';
import LandingPage from'./containers/LandingPage.js';
import JoinGame from './containers/JoinGame/JoinGame';

 
class App extends Component {
  render () {
    return (
  
      <Switch>
      	<Route path="/join-game" component={JoinGame} />
        <Route path="/" component={LandingPage}/>
        <Route path="/new" component={LandingPage}/>
        <br/>
      </Switch>  

    );
  }
}

export default App;
