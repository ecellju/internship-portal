import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import HomeNavigate from '../dashboard/HomeNavigate';
import StudentList from '../dashboard/StudentList';
import AccessControlPage from '../containers/AccessControlPage';
import AdminActions from '../dashboard/AdminActions';

const styles = {
  root: {
    paddingTop: '6em',
    paddingBottom: '2em',
  },
};

const AdminDashboardRoutes = ({ match }) => (
  <div className="AdminRoot" style={styles.root}>
    <Route exact path={match.url} render={() => (<Redirect to={`${match.url}/posts`} />)} />
    <Route path={`${match.url}/posts`} component={HomeNavigate} />
    <Route path={`${match.url}/actions`} component={AdminActions} />
    <Route path={`${match.url}/students`} component={StudentList} />
    <Route path={`${match.url}/access-control`} component={AccessControlPage} />
  </div>
);

AdminDashboardRoutes.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default AdminDashboardRoutes;
