import React from 'react';
import { Container } from 'semantic-ui-react';
import axios from 'axios';
import Auth from '../../auth/modules/Auth';
import User from '../../auth/modules/User';
import ProfileInfo from './ProfileInfo';

const getProfile = () => {
  const userId = User.getId();
  return axios.get('/api/user/profile', {
    headers: {
      Authorization: `bearer ${Auth.getToken()}`,
    },
    params: {
      userId,
    },
  })
    .then(res => res);
};
export default class ProfilePage extends React.Component {
  constructor() {
    super();
    // console.log('Parent constructor');
    this.state = {
      // editable: false,
      // CV: null,
      /* profile: {
        firstName: 'Sagnik', middleName: '', lastName: 'Mondal', DOB: '',
        gender: 'Male', contactNo: '1234567899', branch: 'Computer Science',
        currentYear: '4th',
        Email: 'demo@demo.com', degree: '', cgpa: '', joinYear: '',
        hsMarks: '', hsYear: '', secondaryMarks: '', secondaryYear: '',
      }, */
      profile: {},
    };
  }

  componentWillMount() {
    // console.log('Mounting parent');
    getProfile()
      .then((res) => {
      // console.log('THIS ', this);
        console.log('Get Profile ', res.data);
        this.setState({ profile: res.data });
        // console.log('get', this.state);
      })
      .catch(console.error());
  }

  render() {
    return (
      <Container text >
        <ProfileInfo profile={this.state.profile} />
      </Container>
    );
  }
}
