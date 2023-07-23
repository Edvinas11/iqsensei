import axios from "axios";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  AUTHENTICATED_FAIL,
  AUTHENTICATED_SUCCESS,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
} from "./types";
import { load_user } from "./profile";

export const checkAuthenticated = () => async (dispatch) => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };

  // Checking whether user has refresh token at all to not send unnecessary requests to the backend
  var refreshToken = sessionStorage.getItem("refresh_token");
  if (refreshToken == null) {
    dispatch({
      type: AUTHENTICATED_FAIL,
      payload: false,
    });
    return;
  }

  const body = JSON.stringify({ refresh: refreshToken });

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_APP_API_URL}/api/token/refresh`,
      body,
      config
    );

    if (response.status === 200) {
      sessionStorage.setItem("access_token", response.data.access);

      dispatch({
        type: AUTHENTICATED_SUCCESS,
        payload: true,
      });
    }
  } catch (error) {
    dispatch({
      type: AUTHENTICATED_FAIL,
      payload: false,
    });
  }
};

export const register = (username, password, email) => async (dispatch) => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };

  const body = JSON.stringify({ username, password, email });

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_APP_API_URL}/api/register`,
      body,
      config
    );

    if (response.status === 201) {
      // sessionStorage.setItem("access_token", response.data.access_token);
      // sessionStorage.setItem("refresh_token", response.data.refresh_token);

      dispatch({
        type: REGISTER_SUCCESS,
      });
      return true;
    }
    else {
      dispatch({
        type: REGISTER_FAIL,
      });
      return false;
    }
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
    });
    return false;
  }
};

export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };

  const body = JSON.stringify({ email, password });

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_APP_API_URL}/api/login`,
      body,
      config
    );

    if (response.status === 200) {
      sessionStorage.setItem("access_token", response.data.access_token);
      sessionStorage.setItem("refresh_token", response.data.refresh_token);

      // Set the Authorization header for future API requests
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.access_token}`;

      dispatch({
        type: LOGIN_SUCCESS,
      });

      dispatch(load_user());
    } else {
      dispatch({
        type: LOGIN_FAIL,
      });
    }
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

export const logout = () => async (dispatch) => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Authorization":`Bearer ${sessionStorage.getItem('access_token')}`
    },
    withCredentials: true,
  };

  const body = JSON.stringify({
    refresh_token: sessionStorage.getItem("refresh_token"),
  });

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_APP_API_URL}/api/logout`,
      body,
      config
    );
    if (response.status === 205) {
      sessionStorage.removeItem("access_token");
      sessionStorage.removeItem("refresh_token");

      dispatch({
        type: LOGOUT_SUCCESS,
      });
    }
  } catch (error) {
    dispatch({
      type: LOGOUT_FAIL,
    });
  }
};
