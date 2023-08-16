import {
  LOAD_USER_PROFILE_SUCCESS,
  LOAD_USER_PROFILE_FAIL,
  LOGOUT_SUCCESS,
} from "../actions/types";

const initialState = {
  email: "",
  username: "",
  coins: 0,
  xp_points: 0,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOAD_USER_PROFILE_SUCCESS:
      return {
        ...state,
        email: payload.profile.email,
        username: payload.profile.username,
        coins: payload.profile.coins,
        xp_points: payload.profile.xp_points, 
      };
    case LOAD_USER_PROFILE_FAIL:
    case LOGOUT_SUCCESS:
      return {
        ...state,
        email: "",
        username: "",
        coins: 0,
        xp_points: 0,
      };
    default:
      return state;
  }
}
