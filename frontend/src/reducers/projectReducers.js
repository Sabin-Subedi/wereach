import {
  LIST_PROJECTS_FAILURE,
  LIST_PROJECTS_REQUEST,
  LIST_PROJECTS_SUCCESS,
  PROJECT_BY_ID_FAILURE,
  PROJECT_BY_ID_REQUEST,
  PROJECT_BY_ID_SUCCESS,
  PROJECT_CREATE_FAILURE,
  PROJECT_CREATE_REQUEST,
  PROJECT_CREATE_SUCCESS,
  PROJECT_DONATION_FAILURE,
  PROJECT_DONATION_REQUEST,
  PROJECT_DONATION_SUCCESS,
} from "../constants/projectConstants";

export const projectListReducer = (state = { projectList: [] }, action) => {
  switch (action.type) {
    case LIST_PROJECTS_REQUEST:
      return { loading: true };
    case LIST_PROJECTS_SUCCESS:
      return { loading: false, projectList: action.payload };
    case LIST_PROJECTS_FAILURE:
      return { loading: false, error: action.payload };
    case "VERIFY_PROJECT":
      return { loading: false, projectList: action.payload };
    default:
      return state;
  }
};

export const projectByIdReducer = (state = {}, action) => {
  switch (action.type) {
    case PROJECT_BY_ID_REQUEST:
      return { loading: true };
    case PROJECT_BY_ID_SUCCESS:
      return { loading: false, project: action.payload };
    case "ADD_VOLUNTEER":
      return { loading: false, project: action.payload };
    case "VERIFY_PROJECT":
      return { loading: false, project: action.project };
    case PROJECT_DONATION_SUCCESS:
      return { project: action.payload };
    case PROJECT_BY_ID_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const donationReducer = (state = {}, action) => {
  switch (action.type) {
    case PROJECT_DONATION_REQUEST:
      return { loading: true };
    case PROJECT_DONATION_SUCCESS:
      return { loading: false, donationSuccess: true };
    case "SET_DONATION_FALSE":
      return {};
    case PROJECT_DONATION_FAILURE:
      return { loading: false, donationSuccess: false };
    default:
      return state;
  }
};

export const createProjectReducer = (state = {}, action) => {
  switch (action.type) {
    case PROJECT_CREATE_REQUEST:
      return { loading: true };
    case PROJECT_CREATE_SUCCESS:
      return {
        loading: false,
        projectCreated: true,
        message: action.payload.message,
      };
    case "PROJECT_CREATE_RESET":
      return {};
    case PROJECT_CREATE_FAILURE:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
