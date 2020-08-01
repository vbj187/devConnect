import React, { useEffect, Fragment } from 'react';
// to establish connection with redux, also export
import { connect } from 'react-redux';
// to perform fetching current user profile
import { getCurrentProfile } from '../../actions/profile';
// to declare type of property
import PropTypes from 'prop-types';
// loading component
import Spinner from '../layout/Spinner';

const Dashboard = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);

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
        <Fragment>has</Fragment>
      ) : (
        <Fragment>has not</Fragment>
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
