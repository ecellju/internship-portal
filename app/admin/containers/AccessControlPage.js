import React from 'react';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import AdminList from '../components/AdminList';
import Auth from '../../auth/modules/Auth';
import AddAdminModal from '../containers/AddAdminModal';

class AccessControlPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      admins: [],
      errorMessage: '',
      loading: false,
    };
    this.removeAdmin = this.removeAdmin.bind(this);
    this.refreshList = this.refreshList.bind(this);

    this.refreshList();
  }

  refreshList() {
    axios.get('/api/super-admin/admin-list', {
      headers: {
        Authorization: `bearer ${Auth.getToken()}`,
      },
    })
      .then((res) => {
        const admins = res.data.adminList;
        this.setState({
          admins,
        });
      })
      .catch((error) => {
        console.error(error);
        // redirect to login page if 401 (unauthorized) response
        if (error.response.status === 401 || error.response.status === 403) {
          this.props.history.replace('/login');
        }
      });
  }

  removeAdmin(admin) {
    this.setState({
      loading: true,
    });
    axios.post('/api/super-admin/remove-admin', {
      email: admin.email,
    }, {
      headers: {
        Authorization: `bearer ${Auth.getToken()}`,
      },
    })
      .then(() => {
        this.setState({
          loading: false,
        });
        this.refreshList();
      })
      .catch((error) => {
        console.error(error);
        this.setState({
          loading: false,
          errorMessage: 'Could not be removed',
        });
      });
  }

  render() {
    return (
      <Container>
        <AddAdminModal
          history={this.props.history}
          onAdminAdd={this.refreshList}
        />
        <AdminList
          errorMessage={this.state.errorMessage}
          admins={this.state.admins}
          onRemoveAdminClick={this.removeAdmin}
          showLoading={this.state.loading}
        />
      </Container>
    );
  }
}

AccessControlPage.propTypes = {
  history: PropTypes.shape({
    replace: PropTypes.func.isRequired,
  }).isRequired,
};

export default AccessControlPage;
