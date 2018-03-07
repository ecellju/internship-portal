import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, Grid, Button, Sidebar } from 'semantic-ui-react';
import Auth from '../../auth/modules/Auth';
import User from '../../auth/modules/User';
import BrowserHistory from '../../history';

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
      <div className="Navbar">
        <Menu fixed="top" size="huge">
          <Grid container>
            <Grid.Row className="computer only">
              <Menu.Item header as={NavLink} exact to="/admin" >
                      Internship Portal
              </Menu.Item>
              <Menu.Item name="home" as={NavLink} exact to="/admin/posts" >
                Home
              </Menu.Item>
              <Menu.Item name="students" as={NavLink} exact to="/admin/students">
                Students
              </Menu.Item>
              <Menu.Item name="actions" as={NavLink} exact to="/admin/actions">
                Actions
              </Menu.Item>
              <Menu.Menu position="right">
                {User.isSuperAdmin() &&
                  <Menu.Item as={NavLink} exact to="/admin/access-control">
                    Control access
                  </Menu.Item>
                }
                <Menu.Item onClick={this.handleLogout}>Logout</Menu.Item>
              </Menu.Menu>
            </Grid.Row>
            <Grid.Row className="tablet mobile only">
              <Menu.Item header as={NavLink} exact to="/admin" >
                      Internship Portal
              </Menu.Item>
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
                <Menu.Item name="home" as={NavLink} exact to="/admin/posts" >
                Home
                </Menu.Item>
                <Menu.Item name="students" as={NavLink} exact to="/admin/students">
                  Student List
                </Menu.Item>
                {User.isSuperAdmin() &&
                  <Menu.Item as={NavLink} exact to="/admin/access-control">
                    Control access
                  </Menu.Item>
                }
                <Menu.Item onClick={this.handleLogout}>Logout</Menu.Item>
              </Sidebar>
            </Grid.Row>
          </Grid>
        </Menu>
      </div>
    );
  }
}

