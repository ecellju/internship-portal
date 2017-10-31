import React from 'react';
import { Router } from 'react-router-dom';
import Navbar from '../auth/components/Navbar';
import Main from '../auth/components/Main';
// import PostView from '../user/post/PostView';

// create routes with store and history

const createRoutes = (store, history) =>
  (
    <Router history={history}>
      <div>
        <Navbar />
        <Main />
      </div>
    </Router>
  );

export default createRoutes;
