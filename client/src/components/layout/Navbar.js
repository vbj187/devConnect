import React, { Fragment } from 'react';
// import Link to use instead of "a" tags
import { Link } from "react-router-dom";
// to establish connection with redux, also export
import { connect } from "react-redux";
// to declare type of property
import PropTypes from 'prop-types';
// import logout action
import { logout } from "../../actions/auth";

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
    // conditionally render links based on authorization
    const authLinks = (
        <ul>
            <li>
                <a onClick={logout} href="#!">
                    <i className='fas fa-sign-out-alt'></i>{' '}
                    <span className='hide-sm'>Logout</span>
                </a>
            </li>
        </ul>
    );
    // conditionally render links based on authorization
    const guestLinks = (
        <ul>
            <li><a href="#!">Developers</a></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
        </ul>
    );

    return (
        <nav className="navbar bg-dark">
            <h1>
                <Link to="/"><i className="fas fa-code"></i> DevConnect</Link>
            </h1>
            {!loading && (<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>)}
        </nav>
    );
};

// declaring propTypes
Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};


const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);