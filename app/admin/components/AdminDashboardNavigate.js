import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import HomeNavigate from '../dashboard/HomeNavigate';
import StudentList from '../dashboard/StudentList';

const styles = {
  root: {
    paddingTop: '6em',
    paddingBottom: '2em',
  },
};

const AdminDashboardNavigate = ({ match }) => (
  <div className="AdminRoot" style={styles.root}>
    <Route exact path={match.url} render={() => (<Redirect to={`${match.url}/posts`} />)} />
    <Route path={`${match.url}/posts`} component={HomeNavigate} />
    <Route path={`${match.url}/students`} component={StudentList} />
  </div>
);

AdminDashboardNavigate.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default AdminDashboardNavigate;
