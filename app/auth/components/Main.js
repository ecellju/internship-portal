import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import SignUp from './SignUp';
import Login from './Login';

const Main = () => (
  <Switch>
    <Route exact path="/" render={() => (<Redirect to="/login" />)} />
    <Route exact path="/signup" component={SignUp} />
    <Route exact path="/login" component={Login} />
  </Switch>
);

export default Main;
