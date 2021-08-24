import { AUTH_LOGIN_FAILURE, AUTH_LOGIN_REQUEST, AUTH_LOGIN_SUCCESS, AUTH_LOGOUT, AUTH_REGISTER_FAILURE, AUTH_REGISTER_REQUEST, AUTH_REGISTER_SUCCESS, USER_DATA_UPDATE_FAILURE, USER_DATA_UPDATE_REQUEST, USER_DATA_UPDATE_SUCCESS } from "../constants/authConstants";

export const userAuthReducer = (state = {userInfo:{}}, action) => {
    switch (action.type) {
        case AUTH_LOGIN_REQUEST:
            return {loading: true};
        case AUTH_LOGIN_SUCCESS:
            return {loading: false, userInfo: action.payload};
        case AUTH_LOGIN_FAILURE:
            return {loading: false, error: action.payload};
        case AUTH_REGISTER_REQUEST:
            return {loading: true};
        case AUTH_REGISTER_SUCCESS:
            return {loading: false, userInfo: action.payload};
        case AUTH_REGISTER_FAILURE:
            return {loading: false, error: action.payload};
        case USER_DATA_UPDATE_REQUEST:
            return {loading: true};
        case USER_DATA_UPDATE_SUCCESS:
            return {loading: false, userInfo: action.payload};
        case 'VERIFY_EMAIL':
            return {loading: false, userInfo: action.payload};
        case USER_DATA_UPDATE_FAILURE:
            return {loading: false};
        case AUTH_LOGOUT:
            return {};
        default:
            return state
    }
}

