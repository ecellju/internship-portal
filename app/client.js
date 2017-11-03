import ReactDOM from 'react-dom';
import React from 'react';
import { Router } from 'react-router-dom';
import Routes from './auth/routes';
import browserHistory from './history';


require('./globals.scss');

// render the routes
ReactDOM.render(
  <Router history={browserHistory}>
    <Routes />
  </Router>,
  document.getElementById('app'),
);
