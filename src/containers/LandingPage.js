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
import AuthModal from '../components/AuthModal/AuthModal';
import Backdrop from '../components/Backdrop/Backdrop';
import AWL from './AWL/AWL';

const authToken = localStorage.getItem(AUTH_TOKEN);




class LandingPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      authModal: false
    }
  }

// <NavLink to={{
//                                     pathname: '/login'       
//                                     }}
//                                 activeStyle={{
//                                     color:'#323232'
//                                 }} 
//                                 id='last'>
//                                     Login
//                                 </NavLink></li>
//     render () {
// {authToken ? ( 
//                                 <li><button 
//                                   className="LogoutButton"
//                                   id="last"
//                                   onClick={()=> {
//                                     localStorage.removeItem(AUTH_TOKEN)
//                                     this.props.history.push('/')
//                                   }}
//                                   >Logout</button></li>
//                                 ) : (
                                
//                                 <li><button
//                                   className="SignUpButton"
//                                   id="last"
//                                   onClick={()=> {
//                                     this.setState({authModal: true})
//                                   }}
//                                   >Sign Up</button></li>
                                
//                                 )}

  render() {
    
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

                             <li>
                              <svg
                                className="AuthSvg" 
                                xmlns="http://www.w3.org/2000/svg" 
                                viewBox="0 0 300 300" 
                                x="0" 
                                y="0" 
                                height="35" 
                                width="35"
                                onClick={()=> this.setState({authModal:true})}>
                                <path d="M149.996 0C67.157 0 .001 67.158.001 149.997c0 82.837 67.156 150 
                                149.995 150s150-67.163 150-150C299.996 67.156 232.835 0 149.996 0zm.457 
                                220.763v-.002H85.465c0-46.856 41.152-46.845 50.284-59.097l1.045-5.587c-12.83-6.502-21.887-22.178-21.887-40.512 
                                0-24.154 15.712-43.738 35.089-43.738s35.089 19.584 35.089 43.738c0 18.178-8.896 33.756-21.555 40.361l1.19 
                                6.349c10.019 11.658 49.802 12.418 49.802 58.488h-64.069z"/></svg>
                             </li>

                             
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
               {this.state.authModal ? <AuthModal close={() => this.setState({authModal: false})} show={this.state.authModal} /> : null}
               {this.state.authModal ? <Backdrop close={() => this.setState({authModal: false})} show={this.state.authModal}/> : null }
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