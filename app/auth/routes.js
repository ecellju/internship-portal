import React from 'react';
import { Router } from 'react-router-dom';
import Main from '../auth/components/Main';
// import PostView from '../user/post/PostView';

// create routes with store and history

const createRoutes = (store, history) =>
  (
    <Router history={history}>
      <div>
        <Main />
      </div>
    </Router>
  );

export default createRoutes;
