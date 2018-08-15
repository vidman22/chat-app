import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AUTH_TOKEN } from '../../constants';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

import './Auth.css';

import * as actionTypes from '../../store/actionTypes';

const SIGNUP_MUTATION = gql`
  mutation SignupMutation($firstname: String!, $lastname: String!, $email: String!, $password: String!) {
    signUp(firstname: $firstname, lastname: $lastname, email: $email, password: $password) {
      token
    }
  }
`

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`

class Auth extends Component {
    state = {
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        isLogin: true
    }


    checkValidity ( value, rules ) {
        let isValid = true;
        if ( !rules ) {
            return true;
        }

        if ( rules.required ) {
            isValid = value.trim() !== '' && isValid;
        }

        if ( rules.minLength ) {
            isValid = value.length >= rules.minLength && isValid
        }

        if ( rules.maxLength ) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if ( rules.isEmail ) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test( value ) && isValid
        }

        if ( rules.isNumeric ) {
            const pattern = /^\d+$/;
            isValid = pattern.test( value ) && isValid
        }

        return isValid;
    }

    inputChangedHandler = ( event, type, controlName ) => {

        const updatedControls = {
            ...this.state[type],
            [controlName]: {
                ...this.state[type][controlName],
                value: event.target.value,
                valid: this.checkValidity( event.target.value, this.state[type][controlName].validation ),
                touched: true
            }
        };
        this.setState( { [type] : updatedControls } );
    }


    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {isLogin: !prevState.isLogin};
        });
    }

    render () {
        const login = this.state.isLogin;
        const {lastname, firstname, email, password} = this.state;
        const responseGoogle = (response) => {
            // console.log("googleresponse ", response);
            
            const token = response.accessToken;
            console.log('token', token);
            this.props.onAuth(response.profileObj.email, response.profileObj.givenName, response.profileObj.imageUrl, response.profileObj.googleId, token);
            // this._saveUserData(token);
            this.props.togglemodal();

        }
        const responseFacebook = (response) => {
            console.log(response);
            const token = response.accessToken;
            this.props.onAuth( response.email, response.name, response.picture.data.url, response.id, token)
            // this._saveUserData(token);
            this.props.togglemodal();
        }
        return (

            <div className="Auth">
                <div>
                    {login ? <h2>Login</h2> : <h2>Sign Up</h2>}
                    {!login && (
                      <div>
                        <input 
                            value={this.state.firstname}
                            onChange={e => this.setState({ firstname: e.target.value})}
                            type="text"
                            placeholder="first name"
                        />
                        <input 
                            value={this.state.lastname}
                            onChange={e => this.setState({ lastname: e.target.value})}
                            type="text"
                            placeholder="last name"
                        />
                      </div>
                    )}
                    <input 
                        value={this.state.email}
                        onChange={e => this.setState({ email: e.target.value})}
                        type="email"
                        placeholder="email"
                    />
                    <input 
                        value={this.state.password}
                        onChange={e => this.setState({ password: e.target.value})}
                        type="password"
                        placeholder="password"
                    />

                </div>
            <Mutation
                mutation={login ? LOGIN_MUTATION : SIGNUP_MUTATION}
                variables={{ firstname, lastname, email, password }}
                onCompleted={data => this._confirm(data)}
             >
                {mutation => (
                  <button className="AuthButton" onClick={mutation}>
                    {login ? 'LOGIN' : 'CREATE AN ACCOUNT'}
                  </button>
             )}
             </Mutation>
                
              <button className="AuthButton" onClick={this.switchAuthModeHandler}>SWITCH TO { login ? 'SIGNUP' : 'LOGIN'}</button>
                
                    <GoogleLogin
                        
                        clientId='99023560874-es09obh5s0o70hd5j3lstp9lagsq395d.apps.googleusercontent.com'
                        buttonText={`${login ? 'Login' : 'Sign up' } with Google`}
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        render={ renderProps => (
                            <div className="GoogleLogin" onClick={renderProps.onClick}>
                                <svg
                                className="GoogleSVG" 
                                xmlns="http://www.w3.org/2000/svg" 
                                width="24" 
                                height="24"
                                viewBox="0 0 48 48" >
                                <path d="M43.61 20.082H42V20H24v8h11.305c-1.653 4.656-6.082 8-11.305 
                                 8-6.629 0-12-5.371-12-12s5.371-12 12-12c3.059 0 5.844 1.152 7.96 3.04l5.657-5.657C34.047 
                                    6.055 29.27 4 24 4 12.953 4 4 12.953 4 24s8.953 20 20 20 20-8.953 20-20c0-1.34-.137-2.648-.39-3.918z"
                                    fill="#ffc107"/><path d="M6.305 14.691l6.574 4.82C14.656 15.11 18.96 12 24 12c3.059 0 5.844 1.152 7.96 
                                    3.04l5.657-5.657C34.047 6.055 29.27 4 24 4 16.316 4 9.656 8.336 6.305 14.691z" fill="#ff3d00"/><path d="M24 
                                    44c5.164 0 9.86-1.977 13.41-5.191L31.22 33.57A11.918 11.918 0 0 1 24 36c-5.203 0-9.617-3.316-11.281-7.945l-6.524
                                    5.023C9.504 39.555 16.227 44 24 44z" fill="#4caf50"/><path d="M43.61 20.082H42V20H24v8h11.305a12.054 12.054 0 0 
                                    1-4.09 5.57h.004l6.191 5.239C36.973 39.203 44 34 44 24c0-1.34-.137-2.648-.39-3.918z" fill="#1976d2"/>
                                </svg>
                                <div className="GoogleText">{login ? 'Login' : 'Sign up'} with Google</div>
                            </div>
                            )}/>
                    
                

                <FacebookLogin
                    
                    appId="652524795116405"
                    autoLoad={false}
                    fields="name,email,picture"
                    callback={responseFacebook} 
                    render={renderProps => (
                    <div className="FacebookLogin" onClick={renderProps.onClick}>
                        <svg xmlns="http://www.w3.org/2000/svg" 
                        className="FacebookSVG"
                        viewBox="0 0 24 24" 
                        width="24" 
                        height="24" 
                        fill="#4f60bd">
                        <path d="M17.525 9H14V7c0-1.032.084-1.682 1.563-1.682h1.868v-3.18A26.065 26.065 0 0 0 14.693 2C11.98 
                        2 10 3.657 10 6.699V9H7v4l3-.001V22h4v-9.003l3.066-.001L17.525 9z"/></svg>
                        <div className="FacebookText">{login ? 'Login' : 'Sign up'} with Facebook</div>
                    </div>
  )}/>
            </div>
        );
    }
   
   _confirm = async data => {
        console.log("data ", data);
        const { token } = this.state.login ? data.login : data.signUp;
        this._saveUserData(token);
        this.props.togglemodal();
}

  _saveUserData = token => {
    localStorage.setItem(AUTH_TOKEN, token)
  }
}



const mapDispatchToProps = dispatch => {
    return {
        onAuth:( email, name, picture, userID, token ) => dispatch({type: actionTypes.AUTH_SUCCESS, email, name, picture, userID, token })
    };
};

export default connect( null , mapDispatchToProps )( Auth );