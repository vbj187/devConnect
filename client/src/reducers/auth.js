import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR } from '../actions/types';
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
        // on successfull login, get the token and set it to the localstorage along with a few state change
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload
            };
        // on successfull registration, get the token and set it to the localstorage along with a few state change
        case REGISTER_SUCCESS:
            localStorage.setItem('token', payload.token);
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false
            };
        // on register/login fail, remove token from local storage and perform state change
        case REGISTER_FAIL:
        case AUTH_ERROR:
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