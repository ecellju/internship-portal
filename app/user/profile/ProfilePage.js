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
    this.state = {
      // editable: false,
      // CV: null,
      profile: {},
    };
  }

  componentWillMount() {
    getProfile()
      .then((res) => {
        console.log('Get Profile ', res.data);
        this.setState({ profile: res.data });
      })
      .catch(console.error());
  }

  render() {
    return (
      <ProfileInfo profile={this.state.profile} />
    );
  }
}
