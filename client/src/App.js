import React, { Fragment, useEffect } from 'react';
// module to enable routing
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
// import components to use where needed
import NavBar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
import CreateProfile from './components/profile-forms/CreateProfile';
import EditProfile from './components/profile-forms/EditProfile';
import AddExperience from './components/profile-forms/AddExperience';
import AddEducation from './components/profile-forms/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';
import NotFound from './components/layout/NotFound';
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
          <Route exact path='/' component={Landing} />
          <section className='container'>
            <Alert />
            {/* Switch is for private route */}
            <Switch>
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/profiles' component={Profiles} />
              <Route exact path='/profile/:id' component={Profile} />
              {/* for PROTECTED ROUTING */}
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
              <PrivateRoute
                exact
                path='/create-profile'
                component={CreateProfile}
              />
              <PrivateRoute
                exact
                path='/edit-profile'
                component={EditProfile}
              />
              <PrivateRoute
                exact
                path='/add-experience'
                component={AddExperience}
              />
              <PrivateRoute
                exact
                path='/add-education'
                component={AddEducation}
              />
              <PrivateRoute exact path='/posts' component={Posts} />
              <PrivateRoute exact path='/posts/:id' component={Post} />
            </Switch>
            <Route component={NotFound} />
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
