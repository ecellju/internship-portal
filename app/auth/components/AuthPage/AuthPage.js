import React from 'react';
import PropTypes from 'prop-types';
import Navbar from '../../components/Navbar';
import LoginPage from '../../containers/AuthPage/LoginPage';
import SignupPage from '../../containers/AuthPage/SignupPage';

import './styles.scss';

const AuthPage = props => (
  <div>
    <Navbar />
    <div className="auth-page-container">
      {props.isSignup ? <SignupPage /> : <LoginPage />}
    </div>
  </div>
);

AuthPage.defaultProps = {
  isSignup: false,
};

AuthPage.propTypes = {
  isSignup: PropTypes.bool,
};

export default AuthPage;
