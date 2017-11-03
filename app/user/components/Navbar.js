import React from 'react';
import { Button, Input, Grid, Menu, Sidebar } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default class Navbar extends React.Component {
  constructor() {
    super();
    this.state = { menuVisible: false };
    this.toggleMenu = () => this.setState({ menuVisible: !this.state.menuVisible });
  }

  render() {
    const { menuVisible } = this.state;

    return (
      <div className="Navbar">
        <Menu fixed="top" size="huge">
          <Grid container>
            <Grid.Row className="computer only">
              <Menu.Item header name="portal" content="Internship Portal" as={Link} to="/" />
              <Menu.Item name="home" content="Home" as={Link} to="/" />
              <Menu.Item name="favourites" content="Favourites" as={Link} to="/favourites" />
              <Menu.Item name="applications" content="Applications" as={Link} to="/applications" />
              <Menu.Menu position="right">
                <Menu.Item>
                  <Input size="small" icon="search" placeholder="Search..." />
                </Menu.Item>
                <Menu.Item name="profile" content="Profile" as={Link} to="/profile" />
                <Menu.Item name="logout" content="Logout" />
              </Menu.Menu>
            </Grid.Row>
            <Grid.Row className="tablet mobile only">
              <Menu.Item header name="portal" content="Internship Portal" href="/" />
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
                <Menu.Item name="home" content="Home" as={Link} to="/" onClick={this.toggleMenu} />
                <Menu.Item
                  name="favourites"
                  content="Favourites"
                  as={Link}
                  to="/favourites"
                  onClick={this.toggleMenu}
                />
                <Menu.Item
                  name="applications"
                  content="Applications"
                  as={Link}
                  to="/applications"
                  onClick={this.toggleMenu}
                />
                <Menu.Item>
                  <Input size="small" icon="search" placeholder="Search..." />
                </Menu.Item>
                <Menu.Item
                  name="profile"
                  content="Profile"
                  as={Link}
                  to="/profile"
                  onClick={this.toggleMenu}
                />
                <Menu.Item name="logout" content="Logout" />
              </Sidebar>
            </Grid.Row>
          </Grid>
        </Menu>
      </div>
    );
  }
}
