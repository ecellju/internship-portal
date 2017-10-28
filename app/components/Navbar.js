import React from 'react';
import { Input, Menu } from 'semantic-ui-react';

export default class Navbar extends React.Component {
  constructor() {
    super();
    this.state = { activeItem: 'home' };
    this.handleItemClick = (e, { name }) => {
      this.setState({ activeItem: name });
    };
  }

  render() {
    const { activeItem } = this.state;

    return (
      <Menu fixed="top" size="huge">
        <Menu.Item
          header
          name="portal"
          content="Internship Portal"
          href="/"
        />
        <Menu.Item
          name="home"
          content="Home"
          onClick={this.handleItemClick}
          active={activeItem === 'home'}
        />
        <Menu.Item
          name="favourites"
          content="Favourites"
          active={activeItem === 'favourites'}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name="applications"
          content="Applications"
          active={activeItem === 'applications'}
          onClick={this.handleItemClick}
        />
        <Menu.Menu position="right">
          <Menu.Item>
            <Input
              transparent
              size="small"
              icon="search"
              placeholder="Search..."
            />
          </Menu.Item>
          <Menu.Item
            name="profile"
            content="Profile"
            active={activeItem === 'profile'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="logout"
            content="Logout"
            active={activeItem === 'logout'}
            onClick={this.handleItemClick}
          />
        </Menu.Menu>
      </Menu>
    );
  }
}
