import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
// to establish connection with redux, also export
import { connect } from 'react-redux';
// to perform fetching current user profile
import { getCurrentProfile } from '../../actions/profile';
// to declare type of property
import PropTypes from 'prop-types';
// loading component
import Spinner from '../layout/Spinner';
// actions component
import DashboardActions from './DashboardActions';

const Dashboard = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);
  // ternary to render component
  // Spinner when loading && profile are null
  // else return Dashboard components
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Dashboard</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Welcome{'  '}
        {user && user.name}
      </p>
      {profile !== null ? (
        <Fragment>
          <DashboardActions />
        </Fragment>
      ) : (
        <Fragment>
          <p>You have not yet setup a Profile, please add your info</p>
          <Link to='/create-profile' className='btn btn-primary my-1'>
            Create Profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

// declare property type
Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

// selects that part of the data from the store
const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
