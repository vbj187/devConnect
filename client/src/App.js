import React, { Fragment } from 'react';
// module to enable routing
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
// import components to use where needed
import NavBar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

const App = () =>
  // Wrap the whole JSX with Router in order for routing to work
  <Router>
    <Fragment>
      <NavBar />
      <Route exact path='/' component={Landing} />
      <section className="container">
        {/* Switch is for private route */}
        <Switch>
          <Route exact path='/Register' component={Register} />
          <Route exact path='/Login' component={Login} />
        </Switch>
      </section>
    </Fragment>
  </Router>;

export default App;
