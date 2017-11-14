import React from 'react';
import { Route, Switch } from 'react-router-dom';

import UserRoot from './components/UserRoot';
import Navbar from './components/Navbar';

const Routes = () => (
  <div className="Main">
    <Navbar />
    <div className="User">
      <Switch>
        <Route path="/user" component={UserRoot} />
        <Route render={() => <h1>Not Found</h1>} />
      </Switch>
    </div>
  </div>
);

export default Routes;
