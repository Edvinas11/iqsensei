import axios from "axios";
import { LOAD_USER_PROFILE_SUCCESS, LOAD_USER_PROFILE_FAIL } from "./types";

export const load_user = () => async (dispatch) => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
    },
    withCredentials: true,
  };

  // Checking whether user has access token at all to not send unnecessary requests to the backend
  var refreshToken = sessionStorage.getItem("access_token");
  if (refreshToken == null) {
    dispatch({
      type: LOAD_USER_PROFILE_FAIL,
    });
    return;
  }

  try {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_API_URL}/api/user`,
      config
    );

    if (response.status === 200) {
      dispatch({
        type: LOAD_USER_PROFILE_SUCCESS,
        payload: response.data,
      });
    } else {
      dispatch({
        type: LOAD_USER_PROFILE_FAIL,
      });
    }
  } catch (error) {
    dispatch({
      type: LOAD_USER_PROFILE_FAIL,
    });
  }
};
