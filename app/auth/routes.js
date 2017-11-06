import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Auth from './modules/Auth';
import User from './modules/User';
import AuthPage from './components/AuthPage';
import AdminRoutes from '../admin/routes';

const Routes = () => {
  let rootRedirect = null;
  if (Auth.isUserAuthenticated()) {
    if (User.isAdmin() === true) {
      rootRedirect = () => (<Redirect to="/admin" />);
    } else if (User.isAdmin() === false) {
      rootRedirect = () => (<Redirect to="/user" />);
    }
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
      <Route path="/admin" component={AdminRoutes} />
      <Route path="/user" render={() => (<div>Hello, I am a user.</div>)} />
    </Switch>
  );
};

export default Routes;
