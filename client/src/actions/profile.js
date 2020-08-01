// for making http requests
import axios from 'axios';
// for alerts
import { setAlert } from './alert';
// action types to dispatch payload
import { GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE } from './types';

// function to get current user's profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    // request to get the user profile
    // global headers are set for authentication
    const res = await axios.get('/api/profile/me');
    // on successfull response
    // dispatch payload to the action type
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (error) {
    // if any error occurs, dispatch it to the error types
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// to create or update a profile
export const createProfile = (formData, history, edit = false) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post('/api/profile', formData, config);

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));

    if (!edit) {
      history.push('/dashboard');
    }
  } catch (error) {
    // assign all errors from the error response
    const errors = error.response.data.errors;
    // if any error, for every error setAlert
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(errors.message, 'danger')));
    }
    // if any error occurs, dispatch it to the error types
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// Add Experience
export const addExperience = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.put('/api/profile/experience', formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert('Experience Added', 'success'));
    // redirect
    history.push('/dashboard');
  } catch (error) {
    // assign all errors from the error response
    const errors = error.response.data.errors;
    // if any error, for every error setAlert
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(errors.message, 'danger')));
    }
    // if any error occurs, dispatch it to the error types
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// Add Education
export const addEducation = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.put('/api/profile/education', formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert('Education Added', 'success'));
    // redirect
    history.push('/dashboard');
  } catch (error) {
    // assign all errors from the error response
    const errors = error.response.data.errors;
    // if any error, for every error setAlert
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(errors.message, 'danger')));
    }
    // if any error occurs, dispatch it to the error types
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
