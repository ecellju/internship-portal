import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import SignupForm from '../../components/AuthPage/SignupForm';

class SignupPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {
      },
      user: {
        name: '',
        email: '',
        password: '',
        retypePassword: '',
      },
    };

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  /**
   * Change the user object.
   *
   * @param {object} event - the JavaScript event object
   */
  changeUser(event) {
    const field = event.target.name;
    const { user } = this.state;
    if (field === 'retype-password') {
      user.retypePassword = event.target.value;
    } else {
      user[field] = event.target.value;
    }
    this.setState({
      user,
    });
  }

  /**
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
  processForm(event) {
    event.preventDefault();

    if (this.state.user.password !== this.state.user.retypePassword) {
      const { user } = this.state;
      this.setState({
        user: {
          name: user.name,
          email: user.email,
          password: '',
          retypePassword: '',
        },
        errors: {
          summary: 'The two passwords do not match.',
        },
      });
      return;
    }

    // create a string for an HTTP body message
    const name = encodeURIComponent(this.state.user.name);
    const email = encodeURIComponent(this.state.user.email);
    const password = encodeURIComponent(this.state.user.password);
    const formData = `name=${name}&email=${email}&password=${password}`;

    // create an AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('post', '/auth/signup');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        // success

        // change the component-container state
        this.setState({
          errors: {
          },
        });

        // set a message
        localStorage.setItem('successMessage', xhr.response.message);

        // make a redirect
        this.props.history.replace('/login');
      } else {
        // failure

        const errors = xhr.response.errors ? xhr.response.errors : {};
        errors.summary = xhr.response.message;

        this.setState({
          errors,
        });
      }
    });
    xhr.send(formData);
  }

  render() {
    return (
      <SignupForm
        onSubmit={this.processForm}
        onChange={this.changeUser}
        errors={this.state.errors}
        user={this.state.user}
      />
    );
  }
}

SignupPage.propTypes = {
  history: PropTypes.shape({
    replace: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(SignupPage);
