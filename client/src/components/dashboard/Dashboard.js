import React, { useEffect } from 'react';
// to establish connection with redux, also export
import { connect } from 'react-redux';
// to perform fetching current user profile
import { getCurrentProfile } from '../../actions/profile';
// to declare type of property
import PropTypes from 'prop-types';

const Dashboard = ({ getCurrentProfile, auth, profile }) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);

  return <div>Dashboard</div>;
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
