import React from 'react';
import { Button, Input, Grid, Menu, Sidebar } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import Auth from '../../auth/modules/Auth';
import BrowserHistory from '../../history';
import User from '../../auth/modules/User';

import './styles.scss';

export default class Navbar extends React.Component {
  constructor() {
    super();

    this.state = { menuVisible: false };

    this.toggleMenu = () => {
      this.setState({ menuVisible: !this.state.menuVisible });
    };

    this.handleLogout = () => {
      User.clear();
      Auth.deauthenticateUser();
      BrowserHistory.replace('/');
    };
  }

  render() {
    const { menuVisible } = this.state;

    return (
      <div className="ecp-navbar Navbar">
        <Menu attached size="huge" fixed="top" className="user-navbar-menu">
          <Grid className="menu-container">

            <Grid.Row className="computer only">
              <Menu.Item
                header
                name="portal"
                content="Internship Portal"
                href="/user/posts"
                className="ecp-ecell-header"
              />

              <Menu.Item
                name="home"
                content="Home"
                as={NavLink}
                to="/user/posts"
                className="ecell-item"
              />
              <Menu.Item
                name="favourites"
                content="Favourites"
                as={NavLink}
                to="/user/favourites"
                className="ecell-item"
              />
              <Menu.Item
                name="applications"
                content="Applications"
                as={NavLink}
                to="/user/applications"
                className="ecell-item"
              />

              <Menu.Menu position="right">
                <Menu.Item>
                  <Input
                    size="small"
                    icon="search"
                    placeholder="Search"
                    className="ecell-primary-search"
                  />
                </Menu.Item>
                <Menu.Item
                  name="profile"
                  content="Profile"
                  as={NavLink}
                  to="/user/profile"
                  className="ecell-item"
                />
                <Menu.Item
                  name="logout"
                  onClick={this.handleLogout}
                  content="Log Out"
                  className="ecell-primary margin-left"
                />
              </Menu.Menu>
            </Grid.Row>

            <Grid.Row className="tablet mobile only">
              <Menu.Item
                header
                name="portal"
                content="Internship Portal"
                href="/user/posts"
                className="ecp-ecell-header"
              />

              <Menu.Menu position="right">
                <Menu.Item>
                  <Button
                    basic
                    toggle
                    icon="content"
                    onClick={this.toggleMenu}
                    className="ecp-toggle-icon"
                  />
                </Menu.Item>
              </Menu.Menu>
              <Sidebar
                as={Menu}
                size="huge"
                animation="overlay"
                direction="right"
                visible={menuVisible}
                vertical
                className="ecell-sidebar"
              >
                <Menu.Item>
                  <Button basic floated="right" icon="remove" onClick={this.toggleMenu} />
                </Menu.Item>

                <Menu.Item>
                  <Input
                    icon="search"
                    placeholder="Search"
                    className="ecell-primary-search"
                  />
                </Menu.Item>

                <Menu.Item
                  name="home"
                  content="Home"
                  as={NavLink}
                  to="/user/posts"
                  onClick={this.toggleMenu}
                  className="ecell-sidebar-item"
                />
                <Menu.Item
                  name="favourites"
                  content="Favourites"
                  as={NavLink}
                  to="/user/favourites"
                  onClick={this.toggleMenu}
                  className="ecell-sidebar-item"
                />
                <Menu.Item
                  name="applications"
                  content="Applications"
                  as={NavLink}
                  to="/user/applications"
                  onClick={this.toggleMenu}
                  className="ecell-sidebar-item"
                />

                <Menu.Item
                  name="profile"
                  content="Profile"
                  as={NavLink}
                  to="/user/profile"
                  onClick={this.toggleMenu}
                  className="ecell-sidebar-item"
                />

                <Menu.Item
                  name="logout"
                  onClick={this.handleLogout}
                  content="Log Out"
                  className="ecell-primary margin-top"
                />
              </Sidebar>
            </Grid.Row>

          </Grid>
        </Menu>
      </div>
    );
  }
}
