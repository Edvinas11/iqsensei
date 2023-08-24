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
  SILENT_TOKEN_REFRESH_SUCCESS,
  SILENT_TOKEN_REFRESH_FAIL,
} from "./types";
import { load_user } from "./profile";

export const checkAuthenticated = () => async (dispatch) => {
  const token = localStorage.getItem("access_token");

  if (!token) {
    dispatch({
      type: AUTHENTICATED_FAIL,
      payload: false,
    });
    return;
  }

  // Checking whether user has refresh token at all to not send unnecessary requests to the backend
  var refreshToken = localStorage.getItem("refresh_token");
  if (refreshToken == null) {
    dispatch({
      type: AUTHENTICATED_FAIL,
      payload: false,
    });
    return;
  }

  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ token: token });

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_APP_API_URL}/api/token/verify`,
      body,
      config,
    );

    if (response.status === 200) {
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
      dispatch({
        type: REGISTER_SUCCESS,
      });
      return true;
    } else {
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
      localStorage.setItem("access_token", response.data.access_token);
      localStorage.setItem("refresh_token", response.data.refresh_token);

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
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
    withCredentials: true,
  };

  const body = JSON.stringify({
    refresh_token: localStorage.getItem("refresh_token"),
  });

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_APP_API_URL}/api/logout`,
      body,
      config
    );
    if (response.status === 205) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");

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

export const updateToken = () => async (dispatch) => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };

  const body = JSON.stringify({
    refresh: localStorage.getItem("refresh_token"),
  });

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_APP_API_URL}/api/token/refresh`,
      body,
      config
    );

    if (response.status === 200) {
      localStorage.setItem("access_token", response.data.access);

      // Set the Authorization header for future API requests
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.access}`;

      dispatch({
        type: SILENT_TOKEN_REFRESH_SUCCESS,
        payload: true,
      });
    } else {
      logout();
      dispatch({
        type: SILENT_TOKEN_REFRESH_FAIL,
        payload: false,
      });
    }
  } catch (error) {
    dispatch({
      type: SILENT_TOKEN_REFRESH_FAIL,
      payload: false,
    });
  }
};
