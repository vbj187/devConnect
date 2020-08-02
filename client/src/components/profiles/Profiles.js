import React, { Fragment, useEffect } from 'react';
// to declare type of property
import PropTypes from 'prop-types';
// to establish connection with redux, also export
import { connect } from 'react-redux';
// loading component
import Spinner from '../layout/Spinner';
// to perform fetching current user profile
import { getProfiles } from '../../actions/profile';

const Profile = ({ getProfiles, profile: { profiles, loading } }) => {
  // to fetch profiles on load
  useEffect(() => {
    getProfiles();
  }, []);

  return <Fragment></Fragment>;
};

// declare property types
Profile.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

// map state from store
const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfiles })(Profile);
