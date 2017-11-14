import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Navbar from './Navbar';
import HomeNavigate from '../dashboard/HomeNavigate';
import FavouritesTab from '../dashboard/FavouritesTab';
import ApplicationsTab from '../dashboard/ApplicationsTab';
import ProfilePage from '../profile/ProfilePage';

const styles = {
  root: {
    paddingTop: '6em',
    paddingBottom: '2em',
  },
};

const UserRoot = ({ match }) => (
  <div className="UserRoot" style={styles.root}>
    <Route exact path={match.url} render={() => <Redirect to={`${match.url}/posts`} />} />
    <Route path={`${match.url}/posts`} component={HomeNavigate} />
    <Route path={`${match.url}/favourites`} component={FavouritesTab} />
    <Route path={`${match.url}/applications`} component={ApplicationsTab} />
    <Route path={`${match.url}/profile`} component={ProfilePage} />
  </div>
);

UserRoot.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default UserRoot;
