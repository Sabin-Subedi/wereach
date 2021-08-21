import axios from "axios";
import {
  LIST_PROJECTS_FAILURE,
  LIST_PROJECTS_REQUEST,
  LIST_PROJECTS_SUCCESS,
  PROJECT_CREATE_FAILURE,
  PROJECT_CREATE_REQUEST,
  PROJECT_CREATE_SUCCESS,
  PROJECT_DONATION_FAILURE,
  PROJECT_DONATION_REQUEST,
  PROJECT_DONATION_SUCCESS,
} from "../constants/projectConstants";

export const getAllProjects = () => async (dispatch) => {
  try {
    dispatch({ type: LIST_PROJECTS_REQUEST });

    const { data } = await axios.get("/project");

    dispatch({
      type: LIST_PROJECTS_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: LIST_PROJECTS_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const donateMoney = (token, id, paymentResults) => async (dispatch) => {
  try {
    dispatch({ type: PROJECT_DONATION_REQUEST });

    const { data } = await axios({
      method: "post",
      url: `/project/donate/${id}`,

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: {
        paymentResults,
      },
    });

    console.log(data);

    dispatch({
      type: PROJECT_DONATION_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: PROJECT_DONATION_FAILURE,
    });
    console.log(error.response && error.response.data.message
      ? error.response.data.message
      : error.message);
  }
};


export const createProject = (token, value) => async (dispatch) => {
  try {
    dispatch({ type: PROJECT_CREATE_REQUEST });

    const { data } = await axios({
      method: "post",
      url: `/project/create`,

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: value,
    });

   

    dispatch({
      type: PROJECT_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PROJECT_CREATE_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
   
  }
};