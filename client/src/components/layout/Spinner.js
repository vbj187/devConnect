// REUSABLE SPINNER COMPONENT TO USE OF LOADING
import React, { Fragment } from 'react';
// loading gif
import spinner from './spinner.gif';

export default () => {
  return (
    <Fragment>
      <img
        src={spinner}
        style={{
          width: '200px',
          margin: 'auto',
          marginTop: '20%',
          display: 'block',
        }}
        alt='Loading...'
      />
    </Fragment>
  );
};
