import { SET_ALERT, REMOVE_ALERT } from "./types";

import { v4 as uuidv4 } from 'uuid';

export const setAlert = (message, alertType, timeout = 3000) => dispatch => {
    const id = uuidv4();
    // set an action, that takes message, alertType, and id that is generated
    dispatch({
        type: SET_ALERT,
        payload: { message, alertType, id }
    });
    // on every setAlert being fired for SET_ALERT, dispatch an action to
    // remove the alert after 3 seconds
    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
};