import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import { Button, Container, Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import DisplayPost from '../../common/post/DisplayPost';
import Auth from '../../auth/modules/Auth';
import User from '../../auth/modules/User';
import browserHistory from '../../history';

const fetchPostById = postId =>
  (axios.get(`/api/user/posts/${postId}`, {
    headers: {
      Authorization: `bearer ${Auth.getToken()}`,
    },
  })
    .then((resp) => {
      console.log('response is ', resp);
      const post = resp.data;
      post.stipend = `${post.stipend}`;
      post.duration = `${post.duration}`;
      return post;
    })
    .catch(console.error));

class PostView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { post: null };
    this.handleApply = () => {
      const userId = User.getId();
      axios.post(`/api/user/posts/${this.state.post._id}/addStudent`, { userId }, {
        headers: {
          Authorization: `bearer ${Auth.getToken()}`,
        },
      })
        .then(() => {
          this.props.history.goBack();
        })
        .catch(console.error);
    };
  }

  componentWillMount() {
    fetchPostById(this.props.match.params.id)
      .then(post => this.setState({ ...this.state, post }));
    // console.log('hiii', this.state);
  }

  render() {
    if (!this.state.post) {
      return <div>Loading...</div>;
    }
    return (
      <Container text className="main" textAlign="justified">
        <div className="internship-detail-view-container">
          <DisplayPost
            internshipDetails={this.state.post}
          />

          <Grid container>
            <Grid.Row className="post-section-label-row">
              <Grid.Column floated="right" className="post-apply-button">
                <Button
                  primary
                  floated="right"
                  onClick={this.handleApply}
                >
                  Apply
                </Button>
              </Grid.Column>
            </Grid.Row>

          </Grid>


        </div>
      </Container>
    );
  }
}
/* const SubmitPostPage = () => (
  <SubmitPostForm />
); */

PostView.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
    replace: PropTypes.func.isRequired,
  }).isRequired,
};
export default PostView;

/* SubmitPostPage.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
    replace: PropTypes.func.isRequired,
  }).isRequired,
};
*/
