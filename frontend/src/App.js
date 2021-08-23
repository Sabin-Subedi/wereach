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
import useLocation from "./hooks/useLocation";
import { useToasts } from "react-toast-notifications";
import DiscoverScreen from "./Screens/DiscoverScreen";
import AdminProjectScreen from "./Screens/AdminProjectScreen";
import Avatar, { ConfigProvider } from 'react-avatar';
import MyProjectScreen from "./Screens/MyProjectScreen";

function App() {
  useLocation();
  const { addToast } = useToasts();
  const history = useHistory();
  const dispatch = useDispatch();
  const { userInfo, loading, error } = useSelector((state) => state.user);
  const { loading: projectLoading } = useSelector((state) => state.projects);
  const { success,message,error:createError } = useSelector((state) => state.createProject);
  
  useEffect(() => {
    if(message){
    addToast(message, {
      appearance: "success",
      autoDismiss: true,
    })}
    if(error){
      addToast(error, {
        appearance: "error",
        autoDismiss: true,
      })}
    
  }, [message,error,addToast]);

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
        <ConfigProvider colors={['#FA8C16', '#04D182', '#1890FF', '#FFC542', '#FF6B72']}>
          <Router>
            <Route path="/login" component={SignInScreen} exact />
            <Route
              path="/create/project"
              component={CreateProjectScreen}
              exact
            />
            <Route path="/project/:id" component={ProjectScreen} exact />
            <Route path="/projects/:id" component={MyProjectScreen} exact />
            <Route path="/discover" component={DiscoverScreen} exact />
            <Route path="/admin/projects" component={AdminProjectScreen} exact />
            <Route path="/register" component={SignUpScreen} exact />
            <Route path="/" component={HomeScreen} exact />
          </Router>
        </ConfigProvider>
      )}
    </>
  );
}

export default App;
