import axios from 'axios';
import { REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL } from './types';

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