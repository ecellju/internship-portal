import React from 'react';
import { Card, Icon } from 'semantic-ui-react';

export default class PostItem extends React.Component {
  constructor() {
    super();

    this.favouritedState = { favourited: true, favouriteIcon: 'heart' };
    this.unfavouritedState = { favourited: false, favouriteIcon: 'empty heart' };

    this.state = this.unfavouritedState;

    this.handleFavouriteClick = () => {
      this.setState((state) => {
        if (state.favourited) {
          return this.unfavouritedState;
        }
        return this.favouritedState;
      });
    };
  }


  render() {
    return (
      <Card fluid>
        <Card.Content>
          <Card.Header as="a">Lorem Ipsum</Card.Header>
          <Card.Meta>Description</Card.Meta>
          <Card.Description>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iste eaque ex asperiores
            tempore at nostrum, obcaecati iure perspiciatis voluptatem temporibus cupiditate
            aperiam, molestias quos sit vel dolorum similique velit consequatur!
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Icon
            name={this.state.favouriteIcon}
            size="large"
            className="link floated right"
            onClick={this.handleFavouriteClick}
          />
        </Card.Content>
      </Card>
    );
  }
}
