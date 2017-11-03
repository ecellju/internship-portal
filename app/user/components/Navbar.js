import React from 'react';
import { Button, Input, Grid, Menu, Sidebar } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import Auth from '../../auth/modules/Auth';
import BrowserHistory from '../../history';

export default class Navbar extends React.Component {
  constructor() {
    super();

    this.state = { menuVisible: false };

    this.toggleMenu = () => {
      this.setState({ menuVisible: !this.state.menuVisible });
    };

    this.handleLogout = () => {
      Auth.deauthenticateUser();
      BrowserHistory.replace('/');
    };
  }

  render() {
    const { menuVisible } = this.state;

    return (
      <div className="Navbar">
        <Menu fixed="top" size="huge">
          <Grid container>
            <Grid.Row className="computer only">
              <Menu.Item
                header
                name="portal"
                content="Internship Portal"
                href="/user/posts"
              />
              <Menu.Item
                name="home"
                content="Home"
                as={NavLink}
                to="/user/posts"
              />
              <Menu.Item
                name="favourites"
                content="Favourites"
                as={NavLink}
                to="/user/favourites"
              />
              <Menu.Item
                name="applications"
                content="Applications"
                as={NavLink}
                to="/user/applications"
              />
              <Menu.Menu position="right">
                <Menu.Item>
                  <Input size="small" icon="search" placeholder="Search..." />
                </Menu.Item>
                <Menu.Item name="profile" content="Profile" as={NavLink} to="/user/profile" />
                <Menu.Item name="logout" onClick={this.handleLogout} content="Logout" />
              </Menu.Menu>
            </Grid.Row>
            <Grid.Row className="tablet mobile only">
              <Menu.Item header name="portal" content="Internship Portal" href="/user/posts" />
              <Menu.Menu position="right">
                <Menu.Item>
                  <Button basic toggle icon="content" onClick={this.toggleMenu} />
                </Menu.Item>
              </Menu.Menu>
              <Sidebar
                as={Menu}
                size="huge"
                animation="overlay"
                direction="right"
                visible={menuVisible}
                vertical
              >
                <Menu.Item>
                  <Button basic floated="right" icon="remove" onClick={this.toggleMenu} />
                </Menu.Item>
                <Menu.Item
                  name="home"
                  content="Home"
                  as={NavLink}
                  to="/user/posts"
                  onClick={this.toggleMenu}
                />
                <Menu.Item
                  name="favourites"
                  content="Favourites"
                  as={NavLink}
                  to="/user/favourites"
                  onClick={this.toggleMenu}
                />
                <Menu.Item
                  name="applications"
                  content="Applications"
                  as={NavLink}
                  to="/user/applications"
                  onClick={this.toggleMenu}
                />
                <Menu.Item>
                  <Input size="small" icon="search" placeholder="Search..." />
                </Menu.Item>
                <Menu.Item
                  name="profile"
                  content="Profile"
                  as={NavLink}
                  to="/user/profile"
                  onClick={this.toggleMenu}
                />
                <Menu.Item name="logout" onClick={this.handleLogout} content="Logout" />
              </Sidebar>
            </Grid.Row>
          </Grid>
        </Menu>
      </div>
    );
  }
}
