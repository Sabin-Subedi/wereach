import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Route, Switch, useHistory } from "react-router-dom";
import HomeScreen from "./Screens/HomeScreen.jsx";
import SignInScreen from "./Screens/SignInScreen";
import SignUpScreen from "./Screens/SignUpScreen";
import { getAllUser, getUserData } from "./actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { getAllProjects } from "./actions/projectActions";
import ProjectScreen from "./Screens/ProjectScreen";
import Loader from "./components/Loader";
import CreateProjectScreen from "./Screens/CreateProjectScreen";
import useLocation from "./hooks/useLocation";
import { useToasts } from "react-toast-notifications";
import DiscoverScreen from "./Screens/DiscoverScreen";
import AdminProjectScreen from "./Screens/AdminProjectScreen";
import  { ConfigProvider } from 'react-avatar';
import MyProjectScreen from "./Screens/MyProjectScreen";
import ErrorPage from "./Screens/ErrorScreen";
import VerifyScreen from "./Screens/VerifyScreen";
import DashboardScreen from "./Screens/DashboardScreen";
import AdminProjectView from "./Screens/AdminProjectView";

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
            <Switch>
            <Route path="/login" component={SignInScreen} exact />
            <Route
              path="/create/project"
              component={CreateProjectScreen}
              exact
            />
            <Route exact path="/admin/dashboard" component={DashboardScreen}  />
            <Route  path='/verify-otp' component={VerifyScreen} exact />
            <Route path="/project/:id" component={ProjectScreen} exact />
            <Route path="/projects/:id" component={MyProjectScreen} exact />
            <Route path="/admin/project/:id" component={AdminProjectView} exact />
            <Route path="/discover" component={DiscoverScreen} exact />
            <Route path="/admin/projects" component={AdminProjectScreen} exact />
            <Route path="/register" component={SignUpScreen} exact />
            <Route exact path="/" component={HomeScreen}  />
            <Route  path='*' component={ErrorPage}  />
            </Switch>
          </Router>

        </ConfigProvider>
      )}
    </>
  );
}

export default App;
