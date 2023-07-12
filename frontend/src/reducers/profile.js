import {
  LOAD_USER_PROFILE_SUCCESS,
  LOAD_USER_PROFILE_FAIL,
} from "../actions/types";

const initialState = {
  email: "",
  username: "",
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOAD_USER_PROFILE_SUCCESS:
      return {
        ...state,
        email: payload.profile.email,
        username: payload.profile.username,
      };
    case LOAD_USER_PROFILE_FAIL:
      return {
        ...state,
        email: "",
        username: "",
      };
    default:
      return state;
  }
}
