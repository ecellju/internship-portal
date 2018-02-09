import React from 'react';
import { Button, Card, Form, Label, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Auth from '../../auth/modules/Auth';
import User from '../../auth/modules/User';
// const config = {
//   headers: {
//     Authorization: `bearer ${Auth.getToken()}`,
//   },
// };

const genderOptions = [
  { key: 'm', text: 'Male', value: 'Male' },
  { key: 'f', text: 'Female', value: 'Female' },
];


const submitPost = formData =>
  axios.post('/api/user/profile/CV', formData, {
    headers: {
      Authorization: `bearer ${Auth.getToken()}`,
    },
  })
    .then((res) => {
      console.log('res');
      return res.data;
    });
const saveProfile = (profile) => {
  console.log('profile to be saved is ', profile);
  const userId = User.getId();
  return axios.post('/api/user/profile', { userId, profile }, {
    headers: {
      Authorization: `bearer ${Auth.getToken()}`,
    },
  })
    .then(res => res);
};
export default class ProfileInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editable: false,
      CV: null,
      profile: props.profile,
    };
    this.toggleEditability = () => {
      if (this.state.editable) {
        saveProfile(this.state.profile)
          .then((res) => {
          // console.log('THIS ', this);
            console.log('response on Profile Save is', res);
          })
          .catch(console.error());
      }
      console.log('edit/save ', this.state.editable);
      this.setState({ editable: !this.state.editable });
    };
    this.handleChange = (e, { name }) => {
      this.setState({ profile: { ...this.state.profile, [name]: e.target.value } });
      // console.log(this.state);
      // console.log('onChange ', name, ' ', e.target.value);
    };
    // console.log('hello', props);
    this.handleSubmit = (event) => {
      event.preventDefault();
      const formData = new FormData();
      formData.append('myFile', this.state.CV);

      console.log('state is ', formData);
      submitPost(formData)
        .then((res) => {
          // console.log('THIS ', this);
          console.log('response on submit is', res);
        })
        .catch(console.error());
      console.log('back here ok');
    };
  }
  componentWillReceiveProps(props) {
    this.setState({ profile: props.profile });
  }
  render() {
    const { editable } = this.state;
    return (
      <Card fluid >
        <Card.Content style={{ marginLeft: 20, marginRight: 20 }}>
          <Card.Header>
            {editable ? 'Edit Profile Information' : 'Profile Information'}
            <Button
              primary
              floated="right"
              content={editable ? 'Save' : 'Edit'}
              onClick={this.toggleEditability}
            />
          </Card.Header>
        </Card.Content>
        <Card.Content style={{ marginLeft: 20, marginRight: 20 }}>
          <Segment raised>
            <Form.Field >
              <Label style={{ marginBottom: 20, fontSize: 15, fontWeight: 'bold' }} color="blue" ribbon htmlFor="personaldetails" className="form-labels">
                Personal Details
              </Label>
            </Form.Field>
            <Form>
              <Form.Group>
                <Form.Input
                  readOnly={!editable}
                  label="First name"
                  name="firstName"
                  value={this.state.profile.firstName || ''}
                  onChange={this.handleChange}
                  // width={6}
                />
                <Form.Input
                  readOnly={!editable}
                  label="Middle name"
                  name="middleName"
                  value={this.state.profile.middleName || ''}
                  onChange={this.handleChange}
                 // width={4}
                />
                <Form.Input
                  readOnly={!editable}
                  label="Last name"
                  name="lastName"
                  value={this.state.profile.lastName || ''}
                  onChange={this.handleChange}
                  // width={6}
                />
              </Form.Group>
              <Form.Group>
                <Form.Input
                  readOnly={!editable}
                  label="Birth date"
                  name="DOB"
                  value={this.state.profile.DOB || ''}
                  onChange={this.handleChange}
                 // width={4}
                />
                <Form.Select
                  //readOnly={!editable}
                  disabled = {!editable}
                  label="Gender"
                  name="gender"
                  options={genderOptions}
                  value = {this.state.profile.gender || this.state.selectedOption}
                  onChange={(e, { value }) => this.setState({ profile: { ...this.state.profile, gender: value } })}
                  // width={6}
                />
                <Form.Input
                  readOnly={!editable}
                  label="Contact Number"
                  name="contactNo"
                  value={this.state.profile.contactNo || ''}
                  onChange={this.handleChange}
                 //  width={6}
                />
              </Form.Group>
              <Form.Group>
                <Form.Input
                  readOnly={!editable}
                  label="Current Year "
                  name="currentYear"
                  value={this.state.profile.currentYear || ''}
                  onChange={this.handleChange}

                />
                <Form.Input
                  readOnly={!editable}
                  label="Branch"
                  name="branch"
                  value={this.state.profile.branch || ''}
                  onChange={this.handleChange}
                />
                <Form.Input
                  readOnly={!editable}
                  label="Email"
                  name="Email"
                  value={this.state.profile.Email || ''}
                  onChange={this.handleChange}
                />
              </Form.Group>
            </Form>
          </Segment>
        </Card.Content>
        <Card.Content style={{ marginLeft: 20, marginRight: 20 }}>
          <Segment raised>
            <Form.Field >
              <Label style={{ marginBottom: 20, fontSize: 15, fontWeight: 'bold' }} color="blue" ribbon htmlFor="personaldetails" className="form-labels">
                Educational Details
              </Label>
            </Form.Field>
            <Form>
              <Form.Group>
                <Form.Input
                  readOnly={!editable}
                  label="Degree"
                  name="degree"
                  value={this.state.profile.degree || ''}
                  onChange={this.handleChange}
                  // width={6}
                />
                <Form.Input
                  readOnly={!editable}
                  label="CGPA/Marks(%)"
                  name="cgpa"
                  value={this.state.profile.cgpa || ''}
                  onChange={this.handleChange}
                 // width={4}
                />
                <Form.Input
                  readOnly={!editable}
                  label="Joining Year"
                  name="joinYear"
                  value={this.state.profile.joinYear || ''}
                  onChange={this.handleChange}
                  // width={6}
                />
              </Form.Group>
              <Form.Group>
                <Form.Field
                  style={{
                    margin: 20, fontSize: 15, color: 'red', fontWeight: 'bold',
                    }}
                  readOnly="true"
                  label="Higher Secondary"
                 // width={4}
                />
                <Form.Input
                  readOnly={!editable}
                  label="Marks(%)"
                  name="hsMarks"
                  value={this.state.profile.hsMarks || ''}
                  onChange={this.handleChange}
                 //  width={6}
                />
                <Form.Input
                  readOnly={!editable}
                  label="Year"
                  name="hsYear"
                  value={this.state.profile.hsYear || ''}
                  onChange={this.handleChange}
                 //  width={6}
                />
              </Form.Group>
              <Form.Group>
                <Form.Field
                  style={{
                    margin: 20, fontSize: 15, color: 'red', fontWeight: 'bold',
                    }}
                  readOnly="true"
                  label="Secondary Exam"
                 // width={4}
                />
                <Form.Input
                  readOnly={!editable}
                  label="Marks(%)"
                  name="secondaryMarks"
                  value={this.state.profile.secondaryMarks || ''}
                  onChange={this.handleChange}
                 //  width={6}
                />
                <Form.Input
                  readOnly={!editable}
                  label="Year"
                  name="secondaryYear"
                  value={this.state.profile.secondaryYear || ''}
                  onChange={this.handleChange}
                 //  width={6}
                />
              </Form.Group>
            </Form>
          </Segment>
        </Card.Content>
        <Card.Content style={{ marginLeft: 20, marginRight: 20 }}>
          <Form encType="multipart/form-data" onSubmit={this.handleSubmit}>
            <Form.Group>
              <Form.Input
                input={{ accept: 'application/pdf' }}
                type="file"
                name="userFile"
                onChange={(e) => { this.setState({ CV: e.target.files[0] }); }}
              />
              <Button type="submit">Upload CV</Button>
            </Form.Group>
          </Form>
        </Card.Content>
      </Card>
    );
  }
}
ProfileInfo.propTypes = {
  profile: PropTypes.shape().isRequired,
};
