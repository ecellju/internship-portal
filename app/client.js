import ReactDOM from 'react-dom';
import React from 'react';
import { Router } from 'react-router-dom';
import Routes from './routes';
import browserHistory from './history';

import './globals.scss';


ReactDOM.render(
  <Router history={browserHistory}>
    <Routes />
  </Router>,
  document.getElementById('app'),
);
