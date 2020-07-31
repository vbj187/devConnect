import { combineReducers } from "redux";
// alert reducer imported to combine with the other reducers
import alert from './alert';
import auth from './auth';
// reducer is combined with all reducers
export default combineReducers({
    alert,
    auth
});