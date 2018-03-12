import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import { Button, Menu, Container } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import DisplayPost from '../components/post/DisplayPost';
import EditPost from '../components/post/EditPost';
import Auth from '../../auth/modules/Auth';
import browserHistory from '../../history';

const fetchPostById = postId =>
  (axios.get(`/api/admin/posts/${postId}`, {
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

class PostView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { post: null, editable: false, errors: {} };
    this.handleChange = (e, { name, value }) =>
      this.setState({ post: { ...this.state.post, [name]: value } });
    this.handleSubmitEdits = () => {
      const post = { ...this.state.post };
      SubmitEdits(post._id, post);
      browserHistory.push('/admin/posts');
    };
    this.changeInternshipDetails = this.changeInternshipDetails.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
    this.toggleEditability = () => {
      console.log('edit/save');
      this.setState(
        { editable: !this.state.editable },
        () => {
          console.log(this.state);
        },
      );
    };
  }

  componentWillMount() {
    fetchPostById(this.props.match.params.id)
      .then(post => this.setState({ ...this.state, post }));
    // console.log('hiii', this.state);
  }

  saveChanges(event) {
    event.preventDefault();
    this.setState({
      errors: {},
    });
    const data = _.cloneDeep(this.state.post);
    data.startDate = new Date(data.startDate).getTime().toString();
    data.applyBy = new Date(data.applyBy).getTime().toString();
    this.toggleEditability();
    axios.put(`/api/admin/posts/${this.state.post._id}`, data, {
      headers: {
        Authorization: `bearer ${Auth.getToken()}`,
      },
    })
      .then(() => {
        this.props.history.goBack();
      })
      .catch((error) => {
        console.error(error);
        if (_.has(error, 'response')) {
          if (error.response.status === 401 || error.response.status === 403) {
            this.props.history.replace('/login');
          } else if (error.response.status === 500) {
            const errors = {};
            errors.summary = 'There is a problem with the server. Try once again.';
            this.setState({
              errors,
            });
          } else {
            const { errors } = error.response.data;
            errors.summary = 'Check the form for errors.';
            this.setState({
              errors,
            });
          }
        }
      });
    return null;
  }
  changeInternshipDetails(event) {
    const field = event.target.name;
    const internshipDetails = _.cloneDeep(this.state.post);
    if (field === 'position') {
      internshipDetails.position = event.target.value;
    } else if (field === 'company') {
      internshipDetails.company = event.target.value;
    } else if (field === 'location') {
      internshipDetails.location = event.target.value;
    } else if (field === 'start-date') {
      internshipDetails.startDate = event.target.value;
    } else if (field === 'duration') {
      internshipDetails.duration = event.target.value;
    } else if (field === 'stipend') {
      internshipDetails.stipend = event.target.value;
    } else if (field === 'apply-by') {
      internshipDetails.applyBy = event.target.value;
    } else if (field === 'description-about') {
      internshipDetails.description.about = event.target.value;
    } else if (field === 'description-who-can-apply') {
      internshipDetails.description.whoCanApply = event.target.value;
    } else if (field === 'description-perks') {
      internshipDetails.description.perks = event.target.value;
    }
    this.setState({ post: internshipDetails });
  }

  render() {
    const { editable } = this.state;
    if (!this.state.post) {
      return <div>Loading...</div>;
    }
    return (
      <Container text className="main" textAlign="justified">
        {!editable &&
          <div>
            <Button
              primary
              floated="right"
              content="Edit"
              onClick={this.toggleEditability}
            />
            <DisplayPost
              internshipDetails={this.state.post}
            />
            <Menu>
              <Menu.Menu position="right">
                <Menu.Item>
                  <Button onClick={handleViewApplicants} >View Applicants</Button>
                </Menu.Item>
              </Menu.Menu>
            </Menu>
          </div>
        }
        {editable &&
          <EditPost
            onSave={this.saveChanges}
            onChange={this.changeInternshipDetails}
            errors={this.state.errors}
            internshipDetails={this.state.post}
          />
        }
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
