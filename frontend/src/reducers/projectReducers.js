import {
  LIST_PROJECTS_FAILURE,
  LIST_PROJECTS_REQUEST,
  LIST_PROJECTS_SUCCESS,
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
    case PROJECT_DONATION_SUCCESS:
      return { projectList: action.payload };
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
    case PROJECT_DONATION_FAILURE:
      return { loading: false, donationSuccess: false };

    default:
      return state;
  }
};
