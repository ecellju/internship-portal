import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import HomeNavigate from '../dashboard/HomeNavigate';
import StudentList from '../dashboard/StudentList';

const AdminDashboardNavigate = ({ match }) => (
  <div>
    <Route exact path={match.url} render={() => (<Redirect to={`${match.url}/posts`} />)} />
    <Route path={`${match.url}/posts`} component={HomeNavigate} />
    <Route path={`${match.url}/students`} component={StudentList} />
  </div>
);

export default AdminDashboardNavigate;
