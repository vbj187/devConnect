// import useState & Fragment from react
import React, { Fragment, useState } from 'react';
// for routing
import { Link } from "react-router-dom";

const Login = () => {
    // initialize state
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    // destructure the state values from state
    const { email, password } = formData;
    // on any event, onChange function calls setState for the event
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    // on form submit, performs submit action
    // with axios
    const onSubmit = async e => {
        e.preventDefault();
    };

    return (
        <Fragment>
            <h1 className="large text-primary">Sign In</h1>
            <p className="lead"><i className="fas fa-user"></i> Sign into Your Account</p>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        value={email}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={e => onChange(e)}
                        minLength="6"
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Login" />
            </form>
            <p className="my-1">
                Don't have an account? <Link to="/register">Sign Up</Link>
            </p>
        </Fragment>
    );
};

export default Login;