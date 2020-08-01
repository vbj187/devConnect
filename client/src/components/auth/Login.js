// import useState & Fragment from react
import React, { Fragment, useState } from 'react';
// for routing
import { Link, Redirect } from 'react-router-dom';
// to establish connection with redux, also export
import { connect } from 'react-redux';
// to declare type of property
import PropTypes from 'prop-types';
// import login action to perform user login, also pass it to connect in export
import { login } from '../../actions/auth';

const Login = ({ login, isAuthenticated }) => {
  // initialize state
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  // destructure the state values from state
  const { email, password } = formData;
  // on any event, onChange function calls setState for the event
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  // on form submit, performs submit action
  // with axios
  const onSubmit = async (e) => {
    e.preventDefault();
    // call login action and pass on the email and password formData
    login(email, password);
  };

  // redirect if logged in
  if (isAuthenticated) return <Redirect to='/dashboard' />;

  return (
    <Fragment>
      <h1 className='large text-primary'>Sign In</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Sign into Your Account
      </p>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={(e) => onChange(e)}
            minLength='6'
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Login' />
      </form>
      <p className='my-1'>
        Don't have an account? <Link to='/register'>Sign Up</Link>
      </p>
    </Fragment>
  );
};

// declaring propTypes
Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

// selects that part of the data from the store
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
