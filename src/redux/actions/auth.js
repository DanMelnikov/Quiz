import axios from 'axios';
import { 
    AUTH_SUCCESS, 
    AUTH_LOGOUT } from './actionTypes';

const API_KEY = 'AIzaSyCix0VTwuPqMbwrT-062yXFinFsI8zw6UY';

export function auth(email, password, isLogin) {
    return async dispatch => {
        const authData = {
            email, password,
            returnSecureToken: true
        };

        let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;

        if (isLogin) {
            url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
        }
        
        const response = await axios.post(url, authData);
        const data = response.data;

        const expirationDate = new Date(Date.now() + data.expiresIn * 1000);

        localStorage.setItem('token', data.idToken);
        localStorage.setItem('userId', data.localId);
        localStorage.setItem('expirationDate', expirationDate);

        dispatch(authSuccess(data.idToken));
        dispatch(autoLogout(data.expiresIn));
    }
}

export function autoLogout(time) {
    return dispatch => {
        const timeoutId = setTimeout(() => {
            clearTimeout(timeoutId);
            dispatch(logout());
        }, time * 1000);
    }
}

export function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expirationDate');

    return {
        type: AUTH_LOGOUT
    }
}

export function autoLogin() {
    return dispatch => {
        const token = localStorage.getItem('token');

        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            
            if (new Date() >= expirationDate) {
                dispatch(logout());
            } else {
                dispatch(authSuccess(token));
                dispatch(autoLogout( (expirationDate.getTime() - Date.now()) / 1000 ));
            }
        }
    }
}

export function authSuccess(token) {
    return {
        type: AUTH_SUCCESS,
        token
    }
}