import React, { Component } from 'react';
import { Route } from "react-router-dom";
import './App.css';
import LandingPage from'./containers/LandingPage';

 
class App extends Component {
  render () {
    return (
        <Route path="/" component={LandingPage}/>
    );
  }
}

export default App;
