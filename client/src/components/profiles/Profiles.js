import React, { Fragment, useEffect } from 'react';
// to declare type of property
import PropTypes from 'prop-types';
// to establish connection with redux, also export
import { connect } from 'react-redux';
// loading component
import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem';
// to perform fetching current user profile
import { getProfiles } from '../../actions/profile';

const Profile = ({ getProfiles, profile: { profiles, loading } }) => {
  // to fetch profiles on load
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className='large text-primary'>Developers</h1>
          <p className='lead'>
            <i className='fab fa-connectdevelop'>
              {'   '}
              Browse and connect with Developers
            </i>
          </p>
          <div className='profiles'>
            {profiles.length > 0 ? (
              profiles.map((profile) => (
                <ProfileItem key={profile._id} profile={profile} />
              ))
            ) : (
              <h4> NO PROFILE FOUND</h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
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
