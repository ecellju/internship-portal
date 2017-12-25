import React, { Component } from 'react';
import { Container, Button, TextArea, Form, Menu } from 'semantic-ui-react';
// import { Redirect } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import browserHistory from '../../history';
import Auth from '../../auth/modules/Auth';


const fetchPostById = postId =>
  (axios.get(`/api/admin/posts/${postId}`, {
    headers: {
      Authorization: `bearer ${Auth.getToken()}`,
    },
  })
    .then((resp) => {
      console.log('response is ', resp);
      return resp.data;
    })
    .catch(console.error));

const SubmitEdits = (postId, post) =>
  (axios.put(`/api/admin/posts/${postId}`, post, {
    headers: {
      Authorization: `bearer ${Auth.getToken()}`,
    },
  })
    .then((resp) => {
      console.log('response is ', resp);
      return resp.data;
    })
    .catch(console.error));


const handleViewApplicants = (event) => {
  console.log('View Applicants :', event);
  browserHistory.push('/admin/students');
};

class PostView extends Component {
  constructor(props) {
    super(props);
    // console.log('state ', this.state, 'props ', this.props.match.params);
    this.state = { post: {} };
    fetchPostById(this.props.match.params.id)
      .then(post => this.setState({ ...this.state, post }));
    this.handleChange = (e, { name, value }) =>
      this.setState({ post: { ...this.state.post, [name]: value } });
    this.handleSubmitEdits = () => {
      const post = { ...this.state.post };
      SubmitEdits(post._id, post);
      browserHistory.push('/admin/posts');
    };
  }
  render() {
    return (
      <Container text className="main" textAlign="justified">
        <Form>
          <Form.Field>
            <TextArea
              rows={2}
              style={{ padding: 10, fontSize: 20, fontWeight: 'bold' }}
              className="PostTitle"
              name="title"
              onChange={this.handleChange}
              value={this.state.post.title}
            />
          </Form.Field>
          <Form.Field >
            <TextArea
              rows={20}
              className="PostDescription"
              name="description"
              onChange={this.handleChange}
              value={this.state.post.description}
            />
          </Form.Field>
          <Form.Field>
            <Menu>
              <Menu.Menu position="right">
                <Menu.Item>
                  <Button onClick={handleViewApplicants} >View Applicants</Button>
                </Menu.Item>
                <Menu.Item>
                  <Button onClick={this.handleSubmitEdits}>Submit Edits</Button>
                </Menu.Item>
              </Menu.Menu>
            </Menu>
          </Form.Field>
        </Form>
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
export default PostView;
