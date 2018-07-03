import React, { Component } from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import logo from "../assets/svg/targetlogo4.svg";
import './LandingPage.css';
import CreateGame from './CreateGame/CreateGame';
// import GameBoard from '../components/GameBoard/GameBoard';
import Home from '../components/Home/Home';
import Lessons from './Lessons/Lessons';
import SoloPage from './SoloPage/SoloPage';
import AWL from './AWL/AWL';


// import WaitingPage from './WaitingPage/WaitingPage';

class LandingPage extends Component {

    render () {
        return (
           <div className="Landing">
            <div className="Wrapper">
                <header className="Header">
                   

                    <NavLink to={{
                        pathname: '/'
                    }}exact> <img 

                        src={logo}
                        width="100px" 
                        height="120px"
                        alt="logo" 
                    /><h1>Grammify</h1></NavLink>
                    <p>English Grammar Games</p>
                

                        <nav>
                            <ul>
                             <li><NavLink 
                             to="/host-game"
                             activeStyle={{
                                color:'#323232'}} id='first'>Host Game</NavLink></li>

                             <li><NavLink to={{
                                pathname: '/solo-play'
                             }}
                             activeStyle={{
                                color:'#323232'}} id='second'>Solo Play</NavLink></li>

                             <li><NavLink to={{
                                pathname: '/academic-word-list'
                             }}
                             activeStyle={{
                                color:'#323232'}} id='last'>AWL</NavLink></li>

                             
                            </ul>
                        </nav>

                </header>
            
               <Switch> 
                
                
                
                <Route path="/solo-play" component={SoloPage} />
                <Route path="/academic-word-list" component={AWL} />
                <Route path="/lessons" component={Lessons} />
                <Route path="/host-game" component={CreateGame}/>
                <Route path="/" component={Home}/>
                
               </Switch>
              </div>
            <footer className="Footer">
                    <ul>
                        <li><NavLink to={{
                            pathname: ''
                        }}><h3>About</h3></NavLink></li>

                        <li><NavLink to={{
                            pathname: ''
                        }}><h3>Contact</h3></NavLink></li>

                        <li><NavLink to={{
                            pathname: ''       
                        }}><h3>Tutor</h3></NavLink></li>
                    </ul> 
            </footer>
                  
        </div>
        );
    }
}

export default LandingPage;