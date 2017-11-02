import React from 'react';
import { Card, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// import PostView from '../../user/post/PostView';

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
      <div>
        <Card fluid style={{ margin: 10 }}>
          <Card.Content>
            <Card.Header as={Link} to={`/dashboard/posts/${this.props.id}`} > {this.props.postTitle}</Card.Header>
            <Card.Meta>Description</Card.Meta>
            <Card.Description>
              {this.props.postDescription}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Icon
              name={this.state.favouriteIcon}
              size="large"
              className="floated right link"
              onClick={this.handleFavouriteClick}
            />
          </Card.Content>
        </Card>
      </div>
    );
  }
}

PostItem.propTypes = {
  postTitle: PropTypes.string.isRequired,
  postDescription: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

