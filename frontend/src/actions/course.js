import axios from "axios";
import { LOAD_ALL_COURSES_SUCCESS, LOAD_ALL_COURSES_FAIL } from "./types";

export const getAllCourses = () => async (dispatch) => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    }
  };

  try {
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
    }
  } catch (error) {
    dispatch({
      type: LOAD_ALL_COURSES_FAIL,
    });
  }
};
