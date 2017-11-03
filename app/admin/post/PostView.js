import React, { Component } from 'react';
import { Container, Button, TextArea, Form, Menu } from 'semantic-ui-react';
// import { Redirect } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import browserHistory from '../../history';
import Auth from '../../auth/modules/Auth';


const handleSubmitEdits = (event) => {
  console.log('submitEdits :', event);
};
const handleViewApplicants = (event) => {
  console.log('View Applicants :', event);
  browserHistory.push('/admin/students');
};

const config = {
  headers: {
    Authorization: `bearer ${Auth.getToken()}`,
  },
};

const fetchPostById = postId =>
  (axios.get(`/api/posts/${postId}`, config)
    .then((resp) => {
      console.log('response is ', resp);
      return resp.data;
    })
    .catch(console.error));

class PostView extends Component {
  constructor(props) {
    super(props);
    // console.log('state ', this.state, 'props ', this.props.match.params);
    this.state = { post: [] };
    fetchPostById(this.props.match.params.id)
      .then(post => this.setState({ ...this.state, post }));
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
              value={this.state.post.postTitle}
            />
          </Form.Field>
          <Form.Field >
            <TextArea
              rows={20}
              className="PostDescription"
              value={this.state.post.postDescription}
            />
          </Form.Field>
          <Form.Field>
            <Menu>
              <Menu.Menu position="right">
                <Menu.Item>
                  <Button onClick={handleViewApplicants} >View Applicants</Button>
                </Menu.Item>
                <Menu.Item>
                  <Button onClick={handleSubmitEdits}>Submit Edits</Button>
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
