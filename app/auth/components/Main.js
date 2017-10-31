import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Auth from '../modules/Auth';
import AuthPage from './AuthPage';
import DashboardPage from './DashboardPage';

const Main = () => {
  let rootRedirect = null;
  if (Auth.isUserAuthenticated()) {
    rootRedirect = () => (<Redirect to="/dashboard" />);
  } else {
    rootRedirect = () => (<Redirect to="/login" />);
  }
  return (
    <Switch>
      <Route
        exact
        path="/"
        render={rootRedirect}
      />
      <Route exact path="/signup" component={() => <AuthPage isSignup />} />
      <Route exact path="/login" component={AuthPage} />
      <Route path="/dashboard" component={DashboardPage} />
    </Switch>
  );
};

export default Main;
