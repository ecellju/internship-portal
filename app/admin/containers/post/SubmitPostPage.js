import React from 'react';
import _ from 'lodash';
import SubmitPostForm from '../../components/post/SubmitPostForm';

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
        duration: null,
        stipend: null,
        applyBy: '',
        description: '',
      },
    };
    this.submitNewInternship = this.submitNewInternship.bind(this);
    this.changeInternshipDetails = this.changeInternshipDetails.bind(this);
  }

  submitNewInternship() {
    this.setState({
      errors: {},
    });
    return null;
  }

  changeInternshipDetails(event) {
    const field = event.target.name;
    const internshipDetails = _.clone(this.state.internshipDetails);
    if (field === 'position') {
      internshipDetails.position = event.target.value;
    } else if (field === 'company') {
      internshipDetails.company = event.target.value;
    } else if (field === 'location') {
      internshipDetails.location = event.target.value;
    } else if (field === 'start-date') {
      internshipDetails.startDate = event.target.value;
    } else if (field === 'duration') {
      internshipDetails.duration = parseInt(event.target.value, 10);
    } else if (field === 'stipend') {
      internshipDetails.stipend = parseInt(event.target.value, 10);
    } else if (field === 'apply-by') {
      internshipDetails.applyBy = event.target.value;
    } else if (field === 'description') {
      internshipDetails.description = event.target.value;
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

export default SubmitPostPage;
