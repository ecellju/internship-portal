import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import AuthForm from './AuthForm';

const Main = () => (
  <Switch>
    <Route exact path="/" render={() => (<Redirect to="/login" />)} />
    <Route exact path="/signup" component={() => <AuthForm isSignUp />} />
    <Route exact path="/login" component={AuthForm} />
  </Switch>
);

export default Main;
