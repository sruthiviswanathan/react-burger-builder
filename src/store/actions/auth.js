import * as ActionTypes from './actionTypes';
import axios from '../../axios-orders';

export const authStart = () => {
    return {
        type: ActionTypes.AUTH_START
    };
}

export const authSuccess = (authData) => {
    return {
        type: ActionTypes.AUTH_SUCCESS,
        token: authData.idToken,
        userId: authData.localId
    };
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationTime = new Date(localStorage.getItem('expirationTime'));
            const userId = localStorage.getItem('userId');
            const userData = {
                idToken: token,
                localId: userId
            }
            if (expirationTime > new Date()) {   
                dispatch(authSuccess(userData));
            } else {
                dispatch(authSuccess(userData));
                dispatch(checkAuthTimeout((expirationTime.getTime() -  new Date().getTime()))/1000);
            }
            
        }
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, expirationTime * 1000);
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    localStorage.removeItem('userId');
    return {
        type: ActionTypes.LOGOUT
    };
}

export const authenticate = (userData, method) => {
    return dispatch => {
        const data = {
            email: userData.email,
            password: userData.password,
            returnSecureToken: true
        };
        dispatch(authStart());
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC9_MpR-baQiS-YM3MjLAcQI7c7Tj6fqLU';
        if (method === 'SIGNUP') {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC9_MpR-baQiS-YM3MjLAcQI7c7Tj6fqLU';
        }
        axios.post(url, data)
        .then(response => {
            const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
            localStorage.setItem('token', response.data.idToken);
            localStorage.setItem('expirationTime', expirationDate);
            localStorage.setItem('userId', response.data.localId);
            dispatch(authSuccess(response.data));
            dispatch(checkAuthTimeout(response.data.expiresIn))
        }).catch(error => {
            dispatch(authFail(error.response.data.error));
        })
    }
}

export const authFail = (error) => {
    return {
        type: ActionTypes.AUTH_FAIL,
        error: error.message
    };
}