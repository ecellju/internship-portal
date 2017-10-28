import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

const Navbar = () => (
  <Menu attached size="huge">
    <Menu.Menu>
      <Menu.Item header as={Link} to="/">
        Internship Portal
      </Menu.Item>
    </Menu.Menu>
    <Menu.Menu position="right">
      <Switch>
        <Route exact path="/login">
          <Menu.Item as={Link} to="/signup">
            Sign Up
          </Menu.Item>
        </Route>
        <Route exact path="/signup">
          <Menu.Item as={Link} to="/login">
            Login
          </Menu.Item>
        </Route>
      </Switch>
    </Menu.Menu>
  </Menu>
);

export default Navbar;
