import React, { Fragment } from 'react';
// loading gif
import spinner from './spinner.gif';

export default () => {
  return (
    <Fragment>
      <img
        src={spinner}
        style={{ width: '200px', margin: 'auto', display: 'block' }}
        alt='Loading...'
      />
    </Fragment>
  );
};
