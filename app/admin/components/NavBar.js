import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Menu } from 'semantic-ui-react';

class Navbar extends Component {
  constructor() {
    super();

    this.initialState = { activeItem: 'home' };
    this.activeHome = { activeItem: 'home' };
    this.activeStudents = { activeItem: 'students' };
    this.state = this.initialState;
    this.handleItemClick = (e, { name }) => {
      this.setState(() => {
        if (name === 'home') {
          return this.activeHome;
        }
        return this.activeStudents;
      });
    };
  }
  render() {
    return (
      <Menu attached size="huge" style={{ margin: 10 }} >
        <Menu.Menu>
          <Menu.Item header as={Link} to="/dashboard">
            Internship Portal
          </Menu.Item>
          <Menu.Item name="home" active={this.state.activeItem === 'home'} as={Link} to="/dashboard" onClick={this.handleItemClick}>
            Home
          </Menu.Item>
          <Menu.Item name="students" active={this.state.activeItem === 'students'} as={Link} to="/dashboard/students" onClick={this.handleItemClick}>
            Student List
          </Menu.Item>
        </Menu.Menu>
        <Menu.Menu position="right">
          <Menu.Item >Logout</Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}

export default Navbar;
