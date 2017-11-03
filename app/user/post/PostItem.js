import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Axios from 'axios';
import Auth from '../../auth/modules/Auth';
import User from '../../auth/modules/User';

export default class PostItem extends React.Component {
  constructor() {
    super();

    this.state = { favouriteIcon: 'empty heart' };

    this.findFavouriteState = () => {
      const userId = User.getId();
      Axios.get(`/api/user/isFavourited/${userId}/${this.props.id}`, {
        headers: {
          Authorization: `bearer ${Auth.getToken()}`,
        },
      }).then(({ data }) => {
        const { isFavourited } = data;
        if (isFavourited) {
          this.setState({ favouriteIcon: 'heart' });
        } else {
          this.setState({ favouriteIcon: 'empty heart' });
        }
      }).catch(console.error);
    };

    this.handleFavouriteClick = () => {
      this.setState((state) => {
        const userId = User.getId();
        if (state.favouriteIcon === 'heart') {
          Axios.post(`/api/user/${userId}/removeFavourite`, { postId: this.props.id }, {
            headers: {
              Authorization: `bearer ${Auth.getToken()}`,
            },
          }).then(console.log).catch(console.error);
          return { favouriteIcon: 'empty heart' };
        }
        Axios.post(`/api/user/${userId}/addFavourite`, { postId: this.props.id }, {
          headers: {
            Authorization: `bearer ${Auth.getToken()}`,
          },
        }).then(console.log).catch(console.error);
        return { favouriteIcon: 'heart' };
      });
    };
  }

  componentWillMount() {
    this.findFavouriteState();
  }

  render() {
    const { title, description, id } = this.props;

    return (
      <Card fluid>
        <Card.Content>
          <Card.Header as={Link} to={`/user/posts/${id}`}>{title}</Card.Header>
          <Card.Meta>Description</Card.Meta>
          <Card.Description>{description}</Card.Description>
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

PostItem.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
