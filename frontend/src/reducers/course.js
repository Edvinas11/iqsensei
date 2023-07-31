import {
  LOAD_ALL_COURSES_SUCCESS,
  LOAD_ALL_COURSES_FAIL,
  LOAD_COURSE_SUCCESS,
  LOAD_COURSE_FAIL,
} from "../actions/types";

const initialState = {
  courses: [],
  singleCourse: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOAD_ALL_COURSES_SUCCESS:
      return {
        ...state,
        courses: payload,
      }
    case LOAD_COURSE_SUCCESS:
      return {
        ...state,
        singleCourse: payload,
      }
    case LOAD_ALL_COURSES_FAIL:
    case LOAD_COURSE_FAIL:
      return state;
    default:
      return state;
  }
}
