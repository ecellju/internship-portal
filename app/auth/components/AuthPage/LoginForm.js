import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import GridColumn, { Message, Label, Form, Button, Grid } from 'semantic-ui-react';

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
  <Grid>
    <Grid.Row>

      <Grid.Column width={3}></Grid.Column>
      <Grid.Column width={10} className="signup-container">
        <Grid>
          <Grid.Row>

            <Grid.Column width={9}>
              <div className="sidebar-info">

                <Grid>
                  <Grid.Row>
                    <Grid.Column width={4}></Grid.Column>
                    <Grid.Column width={8}>
                      <Page height="192"/>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
                <br/>
                <div className="info-group">
                  <p style={{ fontSize: '16px', fontWeight: '300' }}>Welcome to</p>
                  <p style={{ fontSize: '40px', lineHeight: '50%' }}>Internship Portal</p>
                  <p style={{ fontSize: '12px', fontWeight: '300' }}>
                    Don&#39;t have an accout yet?
                  </p>

                  <div className="signup-button-wrapper">
                    <Button as={Link} to="/signup" className="ecell-primary-button">Sign Up</Button>
                  </div>
                </div>
              </div>
            </Grid.Column>

            <Grid.Column width={7}>
              <div className="right-sidebar">

              {successMessage.length > 0 &&
                <Message success content={successMessage}/>
              }
              {_.has(errors, 'summary') &&
                <Message error content={errors.summary}/>
              }

              <Grid>
                <Grid.Row className="fingerprint-row">
                  <Grid.Column width={6}></Grid.Column>
                  <Grid.Column width={4}>
                    <Fingerprint/>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              
              <Form onSubmit={onSubmit}>
                <Form.Field className="signup-field">
                  <label>e-mail</label>
                  <input
                    id="login-email"
                    name="email"
                    value={user.email}
                    onChange={onChange}
                    type="text"

                    autoComplete="username"
                  />
                  {_.has(errors, 'email') &&
                    <Label htmlFor="login-email" basic pointing className="ecell-red">
                      {errors.email}
                    </Label>
                  }
                </Form.Field>

                <Form.Field>
                  <label>Password</label>
                  <input
                    id="login-password"
                    name="password"
                    value={user.password}
                    onChange={onChange}
                    type="password"

                    autoComplete="current-password"
                  />
                  {_.has(errors, 'password') &&
                    <Label htmlFor="login-password" basic pointing className="ecell-red">
                      {errors.password}
                    </Label>
                  }
                </Form.Field>

                <Grid>
                  <Grid.Row className="button-row">
                    <Grid.Column width={8}>
                      <div className="forgot-password">
                        Forgot Password
                      </div>
                    </Grid.Column>

                    <Grid.Column width={8}>
                        <div className="login-button-wrapper">
                          <Button type="submit" className="ecell-primary-button">Log In</Button>
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
