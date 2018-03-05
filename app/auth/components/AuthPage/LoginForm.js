import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { Message, Label, Form, Button, Grid } from 'semantic-ui-react';

import Fingerprint from '../../../assets/fingerprint.svg';
import Page from '../../../assets/page.svg';
import './styles.scss';


const LoginForm = ({
  onSubmit,
  onChange,
  errors,
  successMessage,
  user,
}) => (
  <Grid centered>
    <Grid.Row>

      <Grid.Column width={11} className="login-container">
        <Grid>
          <Grid.Row>

            <Grid.Column width={9}>
              <div className="sidebar-info">
                <Grid>

                  <Grid.Row>
                    <Grid.Column width={16}>
                      <Page height="256" />
                    </Grid.Column>
                  </Grid.Row>

                  <Grid.Row>
                    <Grid.Column width={16}>
                      <div>

                        <p className="sidebar-line-a">Welcome to</p>
                        <p className="sidebar-line-b">Internship Portal</p>
                        <p className="sidebar-line-c">Don&#39;t have an account?</p>

                        <div className="signup-button-wrapper">
                          <Button
                            as={Link}
                            to="/signup"
                            className="ecell-primary-button"
                          >
                            Sign Up
                          </Button>
                        </div>
                      </div>
                    </Grid.Column>
                  </Grid.Row>

                </Grid>
              </div>
            </Grid.Column>

            <Grid.Column width={7}>
              <div className="right-sidebar">

                {/*
                  * For showing success and error message regarding sign-in
                  * and sign-up.
                  */}
                <div className="message-row">
                  {successMessage.length > 0 &&
                    <Message success content={successMessage} />
                  }
                  {_.has(errors, 'summary') &&
                    <Message error content={errors.summary} />
                  }
                </div>

                {/* SVG fingerprint icon */}
                <Grid>
                  <Grid.Row className="fingerprint-row">
                    <Grid.Column width={6} />
                    <Grid.Column width={4}>
                      <Fingerprint />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>

                {/* Log-In Form */}
                <Form onSubmit={onSubmit}>

                  <Form.Field className="signup-field">
                    <label htmlFor="login-email">E-mail</label>
                    <input
                      id="login-email"
                      name="email"
                      value={user.email}
                      onChange={onChange}
                      type="text"
                      autoComplete="username"
                    />
                    <div className="pointer-message-error">
                      {_.has(errors, 'email') &&
                        <Label
                          htmlFor="login-email"
                          basic
                          pointing
                          className="ecell-red"
                        >
                          {errors.email}
                        </Label>
                      }
                    </div>
                  </Form.Field>

                  <Form.Field>
                    <label htmlFor="login-password">Password</label>
                    <input
                      id="login-password"
                      name="password"
                      value={user.password}
                      onChange={onChange}
                      type="password"
                      autoComplete="current-password"
                    />
                    <div className="pointer-message-error">
                      {_.has(errors, 'password') &&
                        <Label
                          htmlFor="login-password"
                          basic
                          pointing
                          className="ecell-red"
                        >
                          {errors.password}
                        </Label>
                      }
                    </div>
                  </Form.Field>

                  <Grid>
                    <Grid.Row className="button-row">

                      {/* To be converted into a button/link in future when it works. */}
                      <Grid.Column width={7} className="forgot-password-container">
                        <div className="forgot-password">
                          Forgot Password
                        </div>
                      </Grid.Column>

                      <Grid.Column width={9} className="login-button-container">
                        <div className="login-button-wrapper">
                          <Button
                            type="submit"
                            className="ecell-primary-button"
                          >
                            Log In
                          </Button>
                        </div>
                      </Grid.Column>

                    </Grid.Row>
                  </Grid>

                </Form>

              </div>
            </Grid.Column>

          </Grid.Row>
        </Grid>
      </Grid.Column>

    </Grid.Row>
  </Grid>
);

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string,
  }).isRequired,
  successMessage: PropTypes.string.isRequired,
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }).isRequired,
};


export default LoginForm;
