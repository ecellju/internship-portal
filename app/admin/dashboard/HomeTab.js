import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Divider, Header, Container, Button } from 'semantic-ui-react';
import axios from 'axios';
// import SubmitPost from '../post/SubmitPost';
import PostList from '../post/PostList';
// import PostItem from '../post/PostItem';
// import PostView from '../../user/post/PostView';
import Auth from '../../auth/modules/Auth';

import './styles.scss';

class HomeTab extends Component {
  constructor() {
    super();
    this.state = { posts: [] };
    this.fetchPost = this.fetchPost.bind(this);
    this.redirectToSubmitPostPage = this.redirectToSubmitPostPage.bind(this);
    this.refetch = () => {
      // console.log(this);
      // console.log('in refetch');
      this.fetchPost()
        .then(posts => this.setState({ ...this.state, posts }));
    };
    this.refetch = this.refetch.bind(this);
  }

  componentWillMount() {
    this.fetchPost()
      .then((posts) => {
        this.setState({ ...this.state, posts });
        console.log('Sagnik', this, this.state);
      });
  }

  fetchPost() {
    return axios.get('/api/admin/posts', {
      headers: {
        Authorization: `bearer ${Auth.getToken()}`,
      },
    })
      .then((resp) => {
        console.log('response is ', resp);
        return resp.data;
      })
      .catch((error) => {
        console.error(error);
        // redirect to login page if 401 (unauthorized) response
        if (error.response.status === 401 || error.response.status === 403) {
          this.props.history.replace('/login');
        }
      });
  }

  redirectToSubmitPostPage() {
    this.props.history.push('/admin/submit-post');
  }

  render() {
    return (
      <div className="Home" >
        <div className="home-header-container">
          <div className="internships-header">
            <Header as="h3">Internships</Header>
          </div>
          <div className="post-new-internship-button">
            <Button primary onClick={this.redirectToSubmitPostPage}>Post New Internship</Button>
          </div>
        </div>
        <div className="home-header-divider">
          <Divider />
        </div>
        <Container className="main">
          {/*
          <Container text className="main">
            <SubmitPost refetch={this.refetch} />
          </Container>
          */}
          <PostList posts={this.state.posts} />
        </Container>

      </div>
    );
  }
}

HomeTab.propTypes = {
  history: PropTypes.shape({
    replace: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default HomeTab;
