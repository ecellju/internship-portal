import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import axios from 'axios';
import SubmitPost from '../post/SubmitPost';
import PostList from '../post/PostList';
// import PostItem from '../post/PostItem';
// import PostView from '../../user/post/PostView';
import Auth from '../../auth/modules/Auth';

const config = {
  headers: {
    Authorization: `bearer ${Auth.getToken()}`,
  },
};
const fetchPost = () =>
  (axios.get('/api/admin/posts', config)
    .then((resp) => {
      console.log('response is ', resp);
      return resp.data;
    })
    .catch(console.error));

class HomeTab extends Component {
  constructor() {
    super();
    this.state = { posts: [] };
    this.fetchPost = fetchPost.bind(this);
    this.fetchPost()
      .then((posts) => {
        this.setState({ ...this.state, posts });
        console.log('Sagnik', this, this.state);
      });
    this.refetch = () => {
      console.log(this);
      this.fetchPost()
        .then(posts => this.setState({ ...this.state, posts }));
    };
    this.refetch = this.refetch.bind(this);
  }
  render() {
    return (
      <div className="Home" >
        <Container className="main">
          <Container text className="main">
            <SubmitPost refetch={this.refetch} />
          </Container>
          <PostList posts={this.state.posts} />
        </Container>

      </div>
    );
  }
}


export default HomeTab;
