import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AUTH_TOKEN } from '../../constants';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import './Auth.css';

import * as actions from '../../store/actions';

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

    // inputChangedHandler = ( event, type, controlName ) => {

    //     const updatedControls = {
    //         ...this.state[type],
    //         [controlName]: {
    //             ...this.state[type][controlName],
    //             value: event.target.value,
    //             valid: this.checkValidity( event.target.value, this.state[type][controlName].validation ),
    //             touched: true
    //         }
    //     };
    //     this.setState( { [type] : updatedControls } );
    // }


    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {isLogin: !prevState.isLogin};
        });
    }

    render () {
        const login = this.state.isLogin;
        const {lastname, firstname, email, password} = this.state;

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
                  <button className="pointer mr2 button" onClick={mutation}>
                    {login ? 'LOGIN' : 'CREATE AN ACCOUNT'}
                  </button>
             )}
             </Mutation>
                
                <button onClick={this.switchAuthModeHandler}>SWITCH TO { login ? 'SIGNUP' : 'LOGIN'}</button>
            </div>
        );
    }
   
   _confirm = async data => {
        console.log("data ", data);
        const { token } = this.state.login ? data.login : data.signUp;
        this._saveUserData(token);
        this.props.history.push(`/`);
}

  _saveUserData = token => {
    localStorage.setItem(AUTH_TOKEN, token)
  }
}



const mapDispatchToProps = dispatch => {
    return {
        onAuth: ( email, password, isSignup ) => dispatch( actions.auth( email, password, isSignup ) )
    };
};

export default connect( null, mapDispatchToProps )( Auth );