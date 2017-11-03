import React, { Component } from 'react';
import { Card, Container } from 'semantic-ui-react';
import _ from 'lodash';
import axios from 'axios';
import PostItem from './PostItem';
import Auth from '../../auth/modules/Auth';

// const config = {
//   headers: {
//     Authorization: `bearer ${Auth.getToken()}`,
//   },
// };
const fetchPost = () =>
  (axios.get('/api/admin/posts', {
    headers: {
      Authorization: `bearer ${Auth.getToken()}`,
    },
  })
    .then((resp) => {
      console.log('response is ', resp);
      return resp.data;
    })
    .catch(console.error));

class PostList extends Component {
  constructor() {
    super();
    this.state = { posts: [] };
    this.fetchPost = fetchPost.bind(this);
    this.fetchPost()
      .then((posts) => {
        this.setState({ ...this.state, posts });
        console.log('Sagnik', posts);
      });
  }
  render() {
    return (
      <Container text className="main">
        <Card.Group>
          {this.state.posts.map(post => (
            <div key={post._id}>
              <PostItem
                key={post._id}
                postTitle={post.title}
                postDescription={post.description}
                id={post._id}
              />
            </div>
            ))}
        </Card.Group>
      </Container>
    );
  }
}

export default PostList;
