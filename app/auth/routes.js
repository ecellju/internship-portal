import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Auth from './modules/Auth';
import User from './modules/User';
import AuthPage from './components/AuthPage';
import AdminRoutes from '../admin/routes';

const Routes = () => {
  let rootRedirect = null;
  if (Auth.isUserAuthenticated()) {
    console.log(User.isAdmin());
    if (User.isAdmin() === true) {
      console.log(User.isAdmin());
      console.log('Hi');
      rootRedirect = () => (<Redirect to="/admin" />);
    } else if (User.isAdmin() === false) {
      console.log('Hi');
      rootRedirect = () => (<Redirect to="/user" />);
    }
  } else {
    rootRedirect = () => (<Redirect to="/login" />);
  }
  console.log(rootRedirect);
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
