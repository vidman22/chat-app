import React, { Component } from 'react';
import { Route } from "react-router-dom";
import './App.css';
import LandingPage from'./containers/LandingPage.js';

 
class App extends Component {
  render () {
    return (
  
      <div>
        <Route path="/" component={LandingPage}/>
        <Route path="/new" component={LandingPage}/>
        <br/>
      </div>  

    );
  }
}

export default App;
