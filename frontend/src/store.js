import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userAuthReducer } from "./reducers/authReducers";
import {
  createProjectReducer,
  donationReducer,
  projectByIdReducer,
  projectListReducer,
} from "./reducers/projectReducers";

const reducer = combineReducers({
  user: userAuthReducer,
  projects: projectListReducer,
  donation: donationReducer,
  createProject: createProjectReducer,
  projectByIdList: projectByIdReducer
});

const intialState = {
  user: {},
  project: {},
};

const middleware = [thunk];

const store = createStore(
  reducer,
  intialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
