// to set a global header for request
import axios from 'axios';

// function to set a global header for authorization
const setAuthToken = token => {
    // if there is a token in localstorage
    if (token) {
        // set it to global headers
        axios.defaults.headers.common['x-access-token'] = token;
    } else {
        // if not delete the token from global headers
        delete axios.defaults.headers.common['x-access-token'];
    }
};

export default setAuthToken;