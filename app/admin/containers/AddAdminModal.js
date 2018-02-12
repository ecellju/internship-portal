import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import PropTypes from 'prop-types';
import AccessControlHeader from '../components/AccessControlHeader';
import Auth from '../../auth/modules/Auth';

class AddAdminModal extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      errors: {
      },
      successMessage: '',
      admin: {
        email: '',
        password: '',
        retypePassword: '',
      },
    };

    this.changeAdmin = this.changeAdmin.bind(this);
    this.processForm = this.processForm.bind(this);
    this.onModalClose = this.onModalClose.bind(this);
  }

  onModalClose() {
    this.setState({
      admin: {
        email: '',
        password: '',
        retypePassword: '',
      },
      successMessage: '',
      errors: {},
    });
  }

  changeAdmin(event) {
    const field = event.target.name;
    const { admin } = this.state;
    if (field === 'retype-password') {
      admin.retypePassword = event.target.value;
    } else {
      admin[field] = event.target.value;
    }
    this.setState({
      admin,
    });
  }

  processForm(event) {
    event.preventDefault();
    const { admin } = this.state;
    if (this.state.admin.password !== this.state.admin.retypePassword) {
      admin.password = '';
      admin.retypePassword = '';
      this.setState({
        admin,
        errors: {
          summary: 'The two passwords do not match.',
        },
      });
      return;
    }

    axios.post('/api/super-admin/create-admin', {
      email: admin.email,
      password: admin.password,
    }, {
      headers: {
        Authorization: `bearer ${Auth.getToken()}`,
      },
    })
      .then((res) => {
        this.setState({
          admin: {
            email: '',
            password: '',
            retypePassword: '',
          },
          successMessage: res.data.successMessage,
          errors: {},
        });
        this.props.onAdminAdd();
      })
      .catch((error) => {
        console.error(error);
        // redirect to login page if 401 (unauthorized) response
        if (_.has(error, 'response')) {
          if (error.response.status === 401 || error.response.status === 403) {
            this.props.history.replace('/login');
          } else {
            const { errors } = error.response.data;
            errors.summary = 'Check the form for errors';
            this.setState({
              errors,
              successMessage: '',
            });
          }
        }
      });
  }
  render() {
    return (
      <AccessControlHeader
        onSubmit={this.processForm}
        onChange={this.changeAdmin}
        onModalClose={this.onModalClose}
        successMessage={this.state.successMessage}
        errors={this.state.errors}
        admin={this.state.admin}
      />
    );
  }
}

AddAdminModal.propTypes = {
  history: PropTypes.shape({
    replace: PropTypes.func.isRequired,
  }).isRequired,
  onAdminAdd: PropTypes.func.isRequired,
};

export default AddAdminModal;
