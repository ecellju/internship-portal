import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import PropTypes from 'prop-types';
import SubmitPostForm from '../../components/post/SubmitPostForm';
import Auth from '../../../auth/modules/Auth';

class SubmitPostPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {

      },
      internshipDetails: {
        position: '',
        company: '',
        location: '',
        startDate: '',
        duration: '',
        stipend: '',
        applyBy: '',
        description: {
          about: '',
          whoCanApply: '',
          perks: '',
        },
      },
    };
    this.submitNewInternship = this.submitNewInternship.bind(this);
    this.changeInternshipDetails = this.changeInternshipDetails.bind(this);
  }

  submitNewInternship(event) {
    event.preventDefault();
    this.setState({
      errors: {},
    });
    const data = _.cloneDeep(this.state.internshipDetails);
    data.startDate = new Date(data.startDate).getTime().toString();
    data.applyBy = new Date(data.applyBy).getTime().toString();
    axios.post('/api/admin/posts', data, {
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
    const internshipDetails = _.cloneDeep(this.state.internshipDetails);
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
    this.setState({ internshipDetails });
  }

  render() {
    return (
      <SubmitPostForm
        onSubmit={this.submitNewInternship}
        onChange={this.changeInternshipDetails}
        errors={this.state.errors}
        internshipDetails={this.state.internshipDetails}
      />
    );
  }
}
/* const SubmitPostPage = () => (
  <SubmitPostForm />
); */

SubmitPostPage.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
    replace: PropTypes.func.isRequired,
  }).isRequired,
};

export default SubmitPostPage;
