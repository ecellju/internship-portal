import ReactDOM from 'react-dom';
import React from 'react';
import { Router } from 'react-router-dom';
import MainRoutes from './auth/routes';
import browserHistory from './history';


require('./globals.scss');

// render the routes
ReactDOM.render(
  <Router history={browserHistory}>
    <MainRoutes />
  </Router>,
  document.getElementById('app'),
);
