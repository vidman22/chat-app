import React, { Component } from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';

import './LandingPage.css';
import CreateGame from './CreateGame/CreateGame';
// import GameBoard from '../components/GameBoard/GameBoard';
import Home from '../components/Home/Home';
import JoinGame from './JoinGame/JoinGame';
import Lessons from './Lessons/Lessons';
import SoloPlay from './SoloPlay/SoloPlay';


// import WaitingPage from './WaitingPage/WaitingPage';

class LandingPage extends Component {

    render () {
        return (
           <div className="Landing">
            <div className="Wrapper">
                <header className="Header">
                    <NavLink to={{
                        pathname: '/'
                    }}><h1>English Grammar Games</h1></NavLink>
                

                        <nav>
                            <ul>
                             <li><NavLink to={{
                                pathname: '/host-game'
                             }}><h3 id='first'>Host Game</h3></NavLink></li>

                             <li><NavLink to={{
                                pathname: '/join-game'
                             }}><h3>Join Game</h3></NavLink></li>

                             <li><NavLink to={{
                                pathname: '/lessons'       
                             }}><h3 id='last'>Lessons</h3></NavLink></li>
                            </ul>
                        </nav>

                </header>
            </div>
               <Switch> 
                
                
                <Route path="/join-game" component={JoinGame} />
                <Route path="/solo-play" component={SoloPlay} />
                <Route path="/lessons" component={Lessons} />
                <Route path="/host-game" component={CreateGame}/>
                {/*<Route path="/game-board" component={GameBoard}/>*/}
                <Route path="/" component={Home}/>
                
               </Switch>
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