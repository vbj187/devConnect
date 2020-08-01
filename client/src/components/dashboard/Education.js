import React, { Fragment } from 'react';
// to declare type of property
import PropTypes from 'prop-types';
// to establish connection with redux, also export
import { connect } from 'react-redux';
// moment module
import Moment from 'react-moment';
// action to perform delete
import { deleteEducation } from '../../actions/profile';

const Education = ({ education, deleteEducation }) => {
  const educations = education.map((edu) => (
    <tr key={edu._id}>
      <td>{edu.school}</td>
      <td className='hide-sm'>{edu.degree}</td>
      <td>
        <Moment format='YYYY/MM/DD'>{edu.from}</Moment>-
        {edu.to === null ? (
          'Present'
        ) : (
          <Moment format='YYYY/MM/DD'>{edu.to}</Moment>
        )}
      </td>
      <td>
        <button
          className='btn btn-danger'
          onClick={() => deleteEducation(edu._id)}
        >
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className='my-2'>Education Crendentials</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>School</th>
            <th className='hide-sm'>Degree</th>
            <th className='hide-sm'>Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{educations}</tbody>
      </table>
    </Fragment>
  );
};

Education.propTypes = {
  education: PropTypes.array.isRequired,
  deleteEducation: PropTypes.func.isRequired,
};

export default connect(null, { deleteEducation })(Education);
