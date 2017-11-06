import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import Auth from '../../auth/modules/Auth';
import User from '../../auth/modules/User';
import BrowserHistory from '../../history';

const Navbar = () => {
  const LogoutFunction = () => {
    User.clear();
    Auth.deauthenticateUser();
    BrowserHistory.replace('/');
  };
  return (
    <Menu attached size="huge" style={{ margin: 10 }} >
      <Menu.Menu>
        <Menu.Item header as={NavLink} exact to="/admin" >
          Internship Portal
        </Menu.Item>
        <Menu.Item name="home" as={NavLink} exact to="/admin/posts" onClick={this.handleItemClick}>
          Home
        </Menu.Item>
        <Menu.Item name="students" as={NavLink} exact to="/admin/students" onClick={this.handleItemClick}>
          Student List
        </Menu.Item>
      </Menu.Menu>
      <Menu.Menu position="right">
        <Menu.Item onClick={LogoutFunction}>Logout</Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};

export default Navbar;
