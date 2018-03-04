import ReactDOM from 'react-dom';
import React from 'react';
import { Router } from 'react-router-dom';

import { Container, Grid } from 'semantic-ui-react';

import Routes from './routes';
import browserHistory from './history';


import './globals.scss';


ReactDOM.render(
  <Router history={browserHistory}>

    {/* Responsive grid based layout. */}
    <Grid>

      {/* Empty Grind to center the content column. */}
      <Grid.Column width={1}></Grid.Column>

      {/* Content Column.  */}
      <Grid.Column width={14}>
        <Routes />
      </Grid.Column>

    </Grid>
  </Router>,
  
  document.getElementById('app'),
);
