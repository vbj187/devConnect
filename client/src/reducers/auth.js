import { REGISTER_SUCCESS, REGISTER_FAIL } from '../actions/types';
// create an initial state to pass on to the funtion
const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null
};

export default function (state = initialState, action) {

    const { type, payload } = action;

    switch (type) {
        // on successfull registration, get the token and set it to the localstorage along with a few state change
        case REGISTER_SUCCESS:
            localStorage.setItem('token', payload.token);
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false
            };
        // 
        case REGISTER_FAIL:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: true,
                loading: false
            };

        default:
            return state;
    }
}