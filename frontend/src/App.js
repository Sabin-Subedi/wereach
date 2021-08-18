import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Route, useHistory } from "react-router-dom";
import HomeScreen from "./Screens/HomeScreen.jsx";
import SignInScreen from "./Screens/SignInScreen";
import SignUpScreen from "./Screens/SignUpScreen";
import { getUserData } from "./actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import { getAllProjects } from "./actions/projectActions";
import ProjectScreen from "./Screens/ProjectScreen";
import Loader from "./components/Loader";
import CreateProjectScreen from "./Screens/CreateProjectScreen";

function App() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { userInfo, loading, error } = useSelector((state) => state.user);
  const { loading: projectLoading } = useSelector((state) => state.projects);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(getUserData(token));
    }

    dispatch(getAllProjects());
  }, [dispatch, history]);

  return (
    <>
      {loading || projectLoading ? (
        <Loader />
      ) : (
        <>
          <Router>
            <Route path="/login" component={SignInScreen} exact />
            <Route
              path="/create/project"
              component={CreateProjectScreen}
              exact
            />
            <Route path="/project/:id" component={ProjectScreen} exact />
            <Route path="/register" component={SignUpScreen} exact />
            <Route path="/" component={HomeScreen} exact />
          </Router>
        </>
      )}
    </>
  );
}

export default App;
