import React from 'react';
import { Card, Container } from 'semantic-ui-react';
import Axios from 'axios';
import PostItem from '../../common/post/PostItem';
import Auth from '../../auth/modules/Auth';
import User from '../../auth/modules/User';

export default class ApplicationsTab extends React.Component {
  constructor() {
    super();

    this.state = { posts: [] };

    this.fetchAppliedPosts = () => {
      const userId = User.getId();
      Axios.get(`/api/user/${userId}/applications`, {
        headers: {
          Authorization: `bearer ${Auth.getToken()}`,
        },
      }).then(({ data }) => this.setState({ posts: data }))
        .catch(console.error);
    };
  }

  componentWillMount() {
    this.fetchAppliedPosts();
  }

  render() {
    const postItems = this.state.posts.map(post => (
      <PostItem
        key={post._id}
        post={post}
        id={post._id}
      />
    ));
    return (
      <Container text>
        <Card.Group>
          {postItems}
        </Card.Group>
      </Container>
    );
  }
}
