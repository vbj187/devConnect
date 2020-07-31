// to create store and appy thunk
import { createStore, applyMiddleware } from "redux";
// to use devTools
import { composeWithDevTools } from "redux-devtools-extension";
// to use thunk
import thunk from "redux-thunk";
// file that handles all reducers
import rootReducer from './reducers';

// declaring an initial state
const initialState = {};
// assigning middleware
const middleware = [thunk];
// creating a store
const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;