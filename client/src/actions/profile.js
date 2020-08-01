// for making http requests
import axios from 'axios';
// for alerts
import { setAlert } from './alert';
// action types to dispatch payload
import { GET_PROFILE, PROFILE_ERROR } from './types';

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
