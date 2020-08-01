// import useState & Fragment from react
import React, { Fragment, useState } from 'react';
// for routing
import { Link, Redirect } from "react-router-dom";
// to establish connection with redux, also export
import { connect } from "react-redux";
// import to use the action, also pass it to connect in export
import { setAlert } from '../../actions/alert';
// to declare type of property
import PropTypes from 'prop-types';
// import register action to perform user registration, also pass it to connect in export
import { register } from "../../actions/auth";

// props are bound to all the state through connect
// states are destructured from props
const Register = ({ setAlert, register, isAuthenticated }) => {
    // initialize state
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });
    // destructure the state values from state
    const { name, email, password, password2 } = formData;
    // on any event, onChange function calls setState for the event
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    // on form submit, performs submit action
    // with axios
    const onSubmit = async e => {
        e.preventDefault();
        // when passwords don't match, console the error
        if (password !== password2) {
            // setState for alert, first params being message and the second being alert type
            setAlert('Passwords do not match', 'danger');
        } else {
            // call register action and pass on the email and password
            register({ name, email, password });
        }
    };
    // redirects if authenticated
    if (isAuthenticated) return <Redirect to="/dashboard" />;

    return (
        <Fragment>
            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Name"
                        name="name"
                        value={name}
                        onChange={e => onChange(e)}
                    // required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        value={email}
                        onChange={e => onChange(e)}
                    // required
                    />
                    <small className="form-text">
                        This site uses Gravatar so if you want a profile image, use a Gravatar email
                    </small>
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={e => onChange(e)}
                    // minLength="6"
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="password2"
                        value={password2}
                        onChange={e => onChange(e)}
                    // minLength="6"
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Register" />
            </form>
            <p className="my-1">
                Already have an account? <Link to="/login">Sign In</Link>
            </p>
        </Fragment>
    );
};

// declaring propTypes
Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
};

// selects that part of the data from the store
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register })(Register);