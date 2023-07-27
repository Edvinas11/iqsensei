import {
  LOAD_ALL_COURSES_SUCCESS,
  LOAD_ALL_COURSES_FAIL,
} from "../actions/types";

const initialState = {
  courses: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOAD_ALL_COURSES_SUCCESS:
      return {
        ...state,
        courses: payload,
      }
    case LOAD_ALL_COURSES_FAIL:
      return state;
    default:
      return state;
  }
}
