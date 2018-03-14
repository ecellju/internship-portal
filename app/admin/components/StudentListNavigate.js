import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import StudentList from '../dashboard/StudentList';
import StudentProfile from '../dashboard/StudentProfile';


const StudentListNavigate = ({ match }) => (
  <div>
    <Route exact path={match.url} component={StudentList} />
    <Route path={`${match.url}/:id`} component={StudentProfile} />
  </div>
);

StudentListNavigate.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
};


export default StudentListNavigate;
