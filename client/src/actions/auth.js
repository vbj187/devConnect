import axios from 'axios';
// import action types
import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL } from './types';
// import setState function for Alert
import { setAlert } from './alert';
// to utilize the global headers
import setAuthToken from '../utils/setAuthToken';

// Load user
export const loadUser = () => async dispatch => {
    // set global header
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

    try {
        // request to authenticate
        const res = await axios.get('/api/auth');
        // on successfull authentication, dispatch the payload for USER_LOADED type
        dispatch({
            type: USER_LOADED,
            payload: res.data
        });
    } catch (error) {
        // when not authenticated, dispatch auth error
        dispatch({
            type: AUTH_ERROR
        });
    }
};

// Register user
export const register = ({ name, email, password }) => async dispatch => {
    // assign a config to send for the post request
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // create a body object with the formData
    const body = JSON.stringify({ name, email, password });

    try {
        // send a post request with axios, passing the body and the config to the endpoint
        const res = await axios.post('/api/users', body, config);
        // on successfull post, dispatch the response to REGISTER_SUCCESS type
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });
        // load the user on successfull authentication by calling loadUser action
        dispatch(loadUser);
    } catch (error) {
        // assign all errors from the error response
        const errors = error.response.data.errors;
        // if any error, for every error setAlert
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        // sent REGISTER_FAIL respponse type to dispath
        dispatch({
            type: REGISTER_FAIL
        });
    }
};

// Login user
export const login = (email, password) => async dispatch => {
    // assign a config to send for the post request
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // create a body object with the formData
    const body = JSON.stringify({ email, password });

    try {
        // send a post request with axios, passing the body and the config to the endpoint
        const res = await axios.post('/api/auth', body, config);
        // on successfull post, dispatch the response to LOGIN_SUCCESS action type
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });
        // load the user on successfull authentication by calling loadUser action
        dispatch(loadUser);
    } catch (error) {
        // assign all errors from the error response
        const errors = error.response.data.errors;
        // if any error, for every error setAlert
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        // sent LOGIN_FAIL respponse type to dispath
        dispatch({
            type: LOGIN_FAIL
        });
    }
};