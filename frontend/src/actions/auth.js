import axios from 'axios';
import { REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, AUTHENTICATED_FAIL, AUTHENTICATED_SUCCESS } from './types';
import Cookies from 'js-cookie';

export const checkAuthenticated = () => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };

    try {
        const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/api/authenticated`, config);

        if(response.status === 200){
            dispatch({
                type: AUTHENTICATED_SUCCESS,
                payload: true
            });
        } else {
            dispatch({
                type: AUTHENTICATED_FAIL,
                payload: false
            });
        }
    } catch (error) {
        dispatch({
            type: AUTHENTICATED_FAIL,
            payload: false
        });
    }
}

export const register = (username, password, email) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ username, password, email });

    try {
        const response = await axios.post(`${import.meta.env.VITE_APP_API_URL}/api/register`, body, config);

        if(response.status === 201){
            dispatch({
                type: REGISTER_SUCCESS
            });
        } else {
            dispatch({
                type: REGISTER_FAIL
            });
        }
    } catch (error) {
        dispatch({
            type: REGISTER_FAIL
        });
    }
}

export const login = (email, password) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ email, password });

    try {
        const response = await axios.post(`${import.meta.env.VITE_APP_API_URL}/api/login`, body, config);

        if(response.status === 200){
            dispatch({
                type: LOGIN_SUCCESS
            });
        } else {
            dispatch({
                type: LOGIN_FAIL
            });
        }
    } catch (error) {
        dispatch({
            type: LOGIN_FAIL
        });
    }
}