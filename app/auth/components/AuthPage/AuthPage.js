import React from 'react';
import PropTypes from 'prop-types';

import Login from './LoginPage';
import SignupPage from './SignupPage';

import './styles.scss';

const AuthPage = props => (
  <div className="auth-page-container">
    {props.isSignup ? <SignupPage /> : <Login />}
  </div>
);

AuthPage.defaultProps = {
  isSignup: false,
};

AuthPage.propTypes = {
  isSignup: PropTypes.bool,
};

export default AuthPage;
