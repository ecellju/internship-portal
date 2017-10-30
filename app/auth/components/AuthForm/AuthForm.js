import React from 'react';
import PropTypes from 'prop-types';
import { Container, Grid } from 'semantic-ui-react';

import Login from './Login';
import SignUp from './SignUp';

import './styles.scss';

const AuthForm = props => (
  <Container className="auth-form-container">
    <Grid centered>
      <Grid.Row>
        {props.isSignUp ? <SignUp /> : <Login />}
      </Grid.Row>
    </Grid>
  </Container>
);

AuthForm.defaultProps = {
  isSignUp: false,
};

AuthForm.propTypes = {
  isSignUp: PropTypes.bool,
};

export default AuthForm;
