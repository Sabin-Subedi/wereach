import axios from 'axios'
import { AUTH_LOGIN_FAILURE, AUTH_LOGIN_REQUEST, AUTH_LOGIN_SUCCESS, AUTH_LOGOUT, USER_DATA_UPDATE_FAILURE, USER_DATA_UPDATE_REQUEST, USER_DATA_UPDATE_SUCCESS } from "../constants/authConstants";

export const login = (value) => async (dispatch) => {
  try {
    dispatch({ type: AUTH_LOGIN_REQUEST })



    const { data } = await axios.post(
      '/auth/login',value
    )


    dispatch({
      type: AUTH_LOGIN_SUCCESS,
      payload: data.data,
    })

    localStorage.setItem('token', data.token)
  } catch (error) {
    dispatch({
      type: AUTH_LOGIN_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const register = (value) => async (dispatch) => {
    try {
      dispatch({ type: AUTH_LOGIN_REQUEST })
  
  
  
      const { data } = await axios.post(
        '/auth/register',value
      )
  
  
      dispatch({
        type: AUTH_LOGIN_SUCCESS,
        payload: data.data,
      })
  
      localStorage.setItem('token', data.token)
    } catch (error) {
      dispatch({
        type: AUTH_LOGIN_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const getUserData = (token) => async (dispatch) => {

    
    try {
      dispatch({ type: USER_DATA_UPDATE_REQUEST })
  
  
  
      const { data } = await axios.post(
        '/auth/user', {
            token: token
        }
      )
  
  
      dispatch({
        type: USER_DATA_UPDATE_SUCCESS,
        payload: data.data,
      })
  
    } catch (error) {
        console.log(error)
     dispatch(
         {
             type: USER_DATA_UPDATE_FAILURE,
         }
     )
    }
  }


  export const logout = () => async (dispatch) => {
    localStorage.removeItem('token')
   dispatch({type: AUTH_LOGOUT})

  }