
import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        // eslint-disable-next-line
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
          };
        
        }
        // .post(url, authData)
        //     .then(response => {
        //         console.log(response);
        //         dispatch(authSuccess(response.data.idToken, response.data.localId));
        //     })
        //     .catch(err => {
        //         console.log(err);
        //         dispatch(authFail(err));
        //     });
};