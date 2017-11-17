import React from 'react';
import { Container, Header, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Axios from 'axios';
import Auth from '../../auth/modules/Auth';
import User from '../../auth/modules/User';

export default class PostView extends React.Component {
  constructor(props) {
    super(props);

    const { id } = props.match.params;

    this.state = {
      title: '',
      description: '',
      id,
    };

    this.fetchSinglePost = () => {
      Axios.get(`/api/user/posts/${this.state.id}`, {
        headers: {
          Authorization: `bearer ${Auth.getToken()}`,
        },
      }).then((resp) => {
        const { title, description } = resp.data;
        this.setState(...this.state, { title, description });
      }).catch(console.error);
    };

    this.handleApply = () => {
      const userId = User.getId();
      Axios.post(`/api/user/posts/${this.state.id}/addStudent`, { userId }, {
        headers: {
          Authorization: `bearer ${Auth.getToken()}`,
        },
      }).then(console.log).catch(console.error);
    };
  }

  componentWillMount() {
    this.fetchSinglePost();
  }

  render() {
    const { title, description } = this.state;
    return (
      <Container text textAlign="justified">
        <Header as="h1">{title}</Header>
        <p>{description}</p>
        <Button primary floated="right" onClick={this.handleApply}>
          Apply
        </Button>
      </Container>
    );
  }
}

PostView.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
