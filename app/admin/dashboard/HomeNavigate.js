import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import HomeTab from './HomeTab';
import PostView from '../post/PostView';


const HomeNavigate = ({ match }) => (
  <div>
    <Route exact path={match.url} component={HomeTab} />
    <Route path={`${match.url}/:id`} component={PostView} />
  </div>
);

HomeNavigate.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
};


export default HomeNavigate;
