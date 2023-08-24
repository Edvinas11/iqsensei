import axios from "axios";
import { 
  LOAD_ALL_COURSES_SUCCESS, 
  LOAD_ALL_COURSES_FAIL,
  LOAD_COURSE_SUCCESS,
  LOAD_COURSE_FAIL 
} from "./types";

export const getCourse = (courseId) => async (dispatch) => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    withCredentials: true,
  };

  try {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_API_URL}/courses/${courseId}`,
      config
    );
    if (response.status === 200) {
      dispatch({
        type: LOAD_COURSE_SUCCESS,
        payload: response.data,
      });
      return response.data;
    } else {
      dispatch({
        type: LOAD_COURSE_FAIL
      });
      return null;
    }
  } catch (error) {
    dispatch({
      type: LOAD_COURSE_FAIL
    });
    return null;
  }
};

export const getAllCourses = () => async (dispatch) => {
  // console.log(sessionStorage.getItem("access_token"))
  const config = {
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    withCredentials: true,
  };

  try {
    console.log(localStorage.getItem("access_token"))
    console.log(config)
    const response = await axios.get(
      `${import.meta.env.VITE_APP_API_URL}/courses`,
      config
    );
    if (response.status === 200) {
      dispatch({
        type: LOAD_ALL_COURSES_SUCCESS,
        payload: response.data,
      });
      return response.data;
    } else {
      dispatch({
        type: LOAD_ALL_COURSES_FAIL,
      });
      return null;
    }
  } catch (error) {
    dispatch({
      type: LOAD_ALL_COURSES_FAIL,
    });
    return null;
  }
};
