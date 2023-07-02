import axios from 'axios';
import { REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, AUTHENTICATED_FAIL, AUTHENTICATED_SUCCESS } from './types';
import Cookies from 'js-cookie';

export const checkAuthenticated = () => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        withCredentials: true,
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
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
        },
        withCredentials: true,
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

export const login = (username, password) => async dispatch => {
    console.log("asdasdasd");
    const user = {
        email: username,
        password: password
    };

    try {
        const response = await axios.post(
        'http://localhost:8000/api/token',
        user,
        {
            headers: {
            'Content-Type': 'application/json'
            },
            withCredentials: true
        }
        );
        console.log(response.data);
        // Store the access and refresh tokens in cookies
        Cookies.set('access_token', response.data.access, {
        secure: true,
        httpOnly: true,
        sameSite: 'strict'
        });
    
        Cookies.set('refresh_token', response.data.refresh, {
        secure: true,
        httpOnly: true,
        sameSite: 'strict'
        });
    
        // Set the Authorization header for future API requests
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
    
    } catch (error) {
        // Handle the error
        console.error(error);
    }
}