import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Navbar from './Navbar';
import HomeTab from '../dashboard/HomeTab';
import FavouritesTab from '../dashboard/FavouritesTab';
import ApplicationsTab from '../dashboard/ApplicationsTab';
import ProfilePage from '../profile/ProfilePage';

const styles = {
  root: {
    paddingTop: '5em',
    paddingBottom: '2em',
  },
};

const Root = () => (
  <BrowserRouter>
    <div className="Root" style={styles.root}>
      <Navbar />
      <Route exact path="/" component={HomeTab} />
      <Route exact path="/favourites" component={FavouritesTab} />
      <Route exact path="/applications" component={ApplicationsTab} />
      <Route exact path="/profile" component={ProfilePage} />
    </div>
  </BrowserRouter>
);

export default Root;
