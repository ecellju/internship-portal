import React from 'react';
import { Route, Switch } from 'react-router-dom';

import AdminDashboardRoutes from './components/AdminDashboardRoutes';
import Navbar from './components/NavBar';

const Routes = () => (
  <div className="Main">
    <Navbar />
    <div className="Admin">
      <Switch>
        <Route path="/admin" component={AdminDashboardRoutes} />
        <Route render={() => <h1>Not Found 1</h1>} />
      </Switch>
    </div>
  </div>
);

export default Routes;
