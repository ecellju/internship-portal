import React from 'react';
import PropTypes from 'prop-types';

import LoginPage from '../../containers/AuthPage/LoginPage';
import SignupPage from '../../containers/AuthPage/SignupPage';

import './styles.scss';

const AuthPage = props => (
  <div className="auth-page-container">
    {props.isSignup ? <SignupPage /> : <LoginPage />}
  </div>
);

AuthPage.defaultProps = {
  isSignup: false,
};

AuthPage.propTypes = {
  isSignup: PropTypes.bool,
};

export default AuthPage;
