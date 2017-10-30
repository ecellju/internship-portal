import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomeTab from './HomeTab';
import PostView from '../post/PostView';


const HomeNavigate = ({ match }) => (
  <div>
    <Route exact path={match.url} component={HomeTab} />
    <Route path={`${match.url}/:id`} component={PostView} />
  </div>
);

export default HomeNavigate;
