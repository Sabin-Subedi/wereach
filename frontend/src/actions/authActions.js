import axios from "axios";
import {
  AUTH_LOGIN_FAILURE,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT,
  GET_ALL_USERS_FAILURE,
  GET_ALL_USERS_REQUEST,
  GET_ALL_USERS_SUCCESS,
  USER_DATA_UPDATE_FAILURE,
  USER_DATA_UPDATE_REQUEST,
  USER_DATA_UPDATE_SUCCESS,
} from "../constants/authConstants";

export const login = (value) => async (dispatch) => {
  try {
    dispatch({ type: AUTH_LOGIN_REQUEST });

    const { data } = await axios.post("/auth/login", value);

    dispatch({
      type: AUTH_LOGIN_SUCCESS,
      payload: data.data,
    });

    localStorage.setItem("token", data.token);
  } catch (error) {
    dispatch({
      type: AUTH_LOGIN_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const register = (value) => async (dispatch) => {
  try {
    dispatch({ type: AUTH_LOGIN_REQUEST });

    const { data } = await axios.post("/auth/register", value);

    dispatch({
      type: AUTH_LOGIN_SUCCESS,
      payload: data.data,
    });

    localStorage.setItem("token", data.token);
  } catch (error) {
    dispatch({
      type: AUTH_LOGIN_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getUserData = (token) => async (dispatch) => {
  try {
    dispatch({ type: USER_DATA_UPDATE_REQUEST });

    const { data } = await axios.post("/auth/user", {
      token: token,
    });

    dispatch({
      type: USER_DATA_UPDATE_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: USER_DATA_UPDATE_FAILURE,
    });
  }
};

export const logout = () => async (dispatch) => {
  localStorage.removeItem("token");
  dispatch({ type: AUTH_LOGOUT });
};

export const getAllUser = (token) => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_USERS_REQUEST });

    const config = {
      Authorization: `Bearer ${token}`,
    };

    const { data } = await axios({
      method: "get",
      url: `/auth/users`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({
      type: GET_ALL_USERS_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_USERS_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
