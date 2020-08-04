import React, { Fragment, useEffect } from 'react';
// module to enable routing
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
// import components to use where needed
import NavBar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Routes from './components/routing/Routes';

// Provider connects redux to react
import { Provider } from 'react-redux';
// to use the managed states
import store from './store';
// for auth state change
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

// if token in local storage, setState to AuthToken
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  // lifecycle hook to effect on the initial state change
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    // Wrap the whole JSX with Prodiver, to facilitate app level state management
    <Provider store={store}>
      {/* Wrap the JSX with Router in order for routing to work */}
      <Router>
        <Fragment>
          <NavBar />
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route component={Routes} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
