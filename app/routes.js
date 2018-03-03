import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Auth from './auth/modules/Auth';
import User from './auth/modules/User';
import AuthPage from './auth/components/AuthPage/index';
import AdminRoutes from './admin/routes';
import userRoutes from './user/routes';

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
      <Route exact path="/" render={rootRedirect}/>

      <Route exact path="/signup" component={() => <AuthPage isSignup />} />
      <Route exact path="/login"  component={AuthPage} />
      
      <Route path="/admin" component={AdminRoutes} />
      <Route path="/user" render={userRoutes} />
    </Switch>
  );
};

export default Routes;
