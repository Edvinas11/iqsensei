import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  AUTHENTICATED_FAIL,
  AUTHENTICATED_SUCCESS,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  SILENT_TOKEN_REFRESH_FAIL,
  SILENT_TOKEN_REFRESH_SUCCESS
} from "../actions/types";

const initialState = {
  isAuthenticated: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case AUTHENTICATED_SUCCESS:
    case SILENT_TOKEN_REFRESH_SUCCESS:
    case SILENT_TOKEN_REFRESH_FAIL:
    case AUTHENTICATED_FAIL:
      return {
        ...state,
        isAuthenticated: payload,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
      };
    case LOGOUT_SUCCESS:
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      return {
        ...state,
        isAuthenticated: false
      };
    case LOGOUT_FAIL:
    case REGISTER_FAIL:
    case LOGIN_FAIL:
      return state;
    default:
      return state;
  }
}
