import { combineReducers } from "redux";
// alert reducer imported to combine with the other reducers
import alert from './alert';
// reducer is combined with all reducers
export default combineReducers({
    alert
});