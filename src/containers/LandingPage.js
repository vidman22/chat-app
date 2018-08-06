import React, { Component } from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import logo from "../assets/svg/kwinzo.svg";
import { AUTH_TOKEN } from '../constants'; 
import './LandingPage.css';
import SoloGame from './SoloGame/SoloGame';
import Home from '../components/Home/Home';
import Lesson from '../components/Lesson/Lesson';
import CreateLesson from './CreateLesson/CreateLesson';
import WaitingPage from './WaitingPage/WaitingPage';
import Lessons from './Lessons/Lessons';
import Auth from './Auth/Auth';
import AWL from './AWL/AWL';

const authToken = localStorage.getItem(AUTH_TOKEN);




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
                    /><h1>Kwinzo</h1></NavLink>
                    <p>Quiz to win</p>
                

                        <nav>
                            <ul>
                             

                             <li><NavLink to={{
                                pathname: '/create-lesson'
                             }}
                             activeStyle={{
                                color:'#323232'}} id='second'>Create</NavLink></li>

                             <li><NavLink to={{
                                pathname: '/lessons'
                             }}
                             activeStyle={{
                                color:'#323232'}}>Lessons</NavLink></li>

                             {authToken ? ( 
                                <button
                                  onClick={()=> {
                                    localStorage.removeItem(AUTH_TOKEN)
                                    this.props.history.push('/')
                                  }}
                                  >Logout
                                  </button>
                                ) : (
                                <li>
                                <NavLink to={{
                                    pathname: '/login'       
                                    }}
                                activeStyle={{
                                    color:'#323232'
                                }} 
                                id='last'>
                                    Login
                                </NavLink></li>
                                )}
                            </ul>
                        </nav>

                </header>
            
               <Switch> 
                
                
                
                <Route path="/create-lesson" component={CreateLesson} />
                <Route path="/academic-word-list" component={AWL} />
                <Route path="/login" component={Auth} />
                <Route path="/lessons/:id" component={Lesson}/>
                <Route path="/solo-play/:id" render={() => <SoloGame lesson= {this.props.lesson} /> } />
                <Route path="/host-game/:id" render={() => <WaitingPage lesson= {this.props.lesson} /> } />
                <Route path="/lessons" component={Lessons} />
                
                
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

const mapStateToProps = state => {
  return {
    lesson: state.lessonSet
  }
}

export default connect(mapStateToProps)(LandingPage);