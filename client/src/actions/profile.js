// for making http requests
import axios from 'axios';
// for alerts
import { setAlert } from './alert';
// action types to dispatch payload
import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  CLEAR_PROFILE,
  ACCOUNT_DELETED,
  GET_REPOS,
} from './types';

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
    dispatch({ type: CLEAR_PROFILE });
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

// Get all profiles
export const getProfiles = () => async (dispatch) => {
  dispatch({
    type: CLEAR_PROFILE,
  });
  try {
    // request to get the all user profile
    const res = await axios.get('/api/profile');
    // on successfull response
    // dispatch payload to the action type
    dispatch({
      type: GET_PROFILES,
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

// Get profile by ID
export const getProfileById = (userId) => async (dispatch) => {
  try {
    // request to get the all user profile
    const res = await axios.get(`/api/profile/user/${userId}`);
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

// Get GitHub Repos
export const getGithubRepos = (username) => async (dispatch) => {
  try {
    // request to get the all user profile
    const res = await axios.get(`/api/profile/github/${username}`);
    // on successfull response
    // dispatch payload to the action type
    dispatch({
      type: GET_REPOS,
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
      if (errors.length > 1) {
        errors.forEach((error) => dispatch(setAlert(error.message, 'danger')));
      } else {
        dispatch(setAlert(errors.message, 'danger'));
      }
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

// function to delete experience
export const deleteExperience = (id) => async (dispatch) => {
  try {
    // pass exp_id in the endpoint, refer API
    const res = await axios.delete(`/api/profile/experience/${id}`);
    // on success, dispatch update
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    // setAlert dispatch
    dispatch(setAlert('Experience Deleted', 'success'));
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

// function to delete Education
export const deleteEducation = (id) => async (dispatch) => {
  try {
    // pass exp_id in the endpoint, refer API
    const res = await axios.delete(`/api/profile/education/${id}`);
    // on success, dispatch update
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    // setAlert dispatch
    dispatch(setAlert('Education Deleted', 'success'));
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

// Delete account and profile
export const deleteAccount = () => async (dispatch) => {
  //
  if (window.confirm('Are you sure? This cannot be undone')) {
    try {
      // pass exp_id in the endpoint, refer API
      await axios.delete(`/api/profile`);
      // on success, dispatch update
      dispatch({ type: CLEAR_PROFILE });
      dispatch({ type: ACCOUNT_DELETED });
      // setAlert dispatch
      dispatch(setAlert('Your Account has been permanantly deleted'));
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
  }
};
