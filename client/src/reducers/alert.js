// MANAGES ALL STATES IN ALERT
// import action types to manage action
import { SET_ALERT, REMOVE_ALERT } from '../actions/types';
// initialize with an empty state
const initialState = [];
// function to handle state changes based on the action type
export default function (state = initialState, action) {
    // destructed type and payload from action
    const { type, payload } = action;
    // switch case to operate on every state individually
    switch (type) {
        // to set alert, all the rest state are spread and the new payload is added
        case SET_ALERT:
            return [...state, payload];
        // to remove alert, filter the alerts that are not from the payload
        case REMOVE_ALERT:
            return state.filter(alert => alert.id !== payload);
        default:
            return state;
    }
}