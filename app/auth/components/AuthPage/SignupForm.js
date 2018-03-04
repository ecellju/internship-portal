import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { Message, Label, Form, Button, Grid } from 'semantic-ui-react';

import Page from '../../../assets/page.svg';
import User from '../../../assets/user.svg';

import './styles.scss';

const SignupForm = ({
  onSubmit,
  onChange,
  errors,
  user,
}) => (
    <Grid>
      <Grid.Row>

      <Grid.Column width={1}></Grid.Column>
      <Grid.Column width={14} className="login-container">
        <Grid>
          <Grid.Row>

            <Grid.Column width={9}>
              <div className="sidebar-info-signup">
                <Grid>
                  <Grid.Row>
                    <Grid.Column width={16}>
                      <Page height="256" />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column width={16}>
                      <div>
                        <p style={{ fontSize: '1.2em', fontWeight: '300' }}>Welcome to</p>
                        <p style={{ fontSize: '3.5em', lineHeight: '85%' }}>Internship Portal</p>
                        <p style={{ fontSize: '1em', fontWeight: '300' }}>
                          Already have an account ?
                        </p>

                        <div className="signup-button-wrapper">
                          <Button as={Link} to="/login" className="ecell-primary-button">Log In</Button>
                        </div>
                      </div>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>                
              </div>
            </Grid.Column>

            <Grid.Column width={7}>
              <div className="right-sidebar">

                <div className="message-row">
                  {_.has(errors, 'summary') &&
                    <Message error content={errors.summary} />
                  }
                </div>

                <Grid>
                  <Grid.Row className="user-row">
                    <Grid.Column width={6}></Grid.Column>
                    <Grid.Column width={4}>
                      <User />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>

                <Form onSubmit={onSubmit}>
                  <Form.Group widths="equal">
                    <Form.Field>
                      <label>First Name</label>
                      <input
                        id="signup-first-name"
                        name="first-name"
                        value={user.firstName}
                        onChange={onChange}
                        type="text"
                        autoComplete="given-name"
                      />
                      <div className="pointer-message-error">
                        {_.has(errors, 'firstName') &&
                            <Label htmlFor="signup-first-name" basic className="ecell-red" pointing>
                            {errors.firstName}
                          </Label>
                        }
                      </div>
                      
                    </Form.Field>
                    <Form.Field>
                      <label>Last Name</label>
                      <input
                        id="signup-last-name"
                        name="last-name"
                        value={user.lastName}
                        onChange={onChange}
                        type="text"
                        autoComplete="family-name"
                      />
                      
                      <div className="pointer-message-error">
                        {_.has(errors, 'lastName') &&
                          <Label htmlFor="signup-last-name" basic className="ecell-red" pointing>
                            {errors.lastName}
                          </Label>
                        }
                      </div>
                      
                    </Form.Field>
                  </Form.Group>
                  <Form.Field>
                    <label>E-mail</label>
                    <input
                      id="signup-email"
                      name="email"
                      value={user.email}
                      onChange={onChange}
                      type="text"
                      autoComplete="email"
                    />
                    
                    <div className="pointer-message-error">
                      {_.has(errors, 'email') &&
                        <Label htmlFor="signup-email" basic color="red" className="ecell-red" pointing>
                          {errors.email}
                        </Label>
                      }
                    </div>
                    
                  </Form.Field>
                  <Form.Field>
                    <label>Password</label>
                    <input
                      id="signup-password"
                      name="password"
                      value={user.password}
                      onChange={onChange}
                      type="password"
                      autoComplete="new-password"
                    />

                    <div className="pointer-message-error">
                      {_.has(errors, 'password') &&
                        <Label htmlFor="signup-password" basic className="ecell-red" pointing>
                          {errors.password}
                        </Label>
                      }
                    </div>
                    
                  </Form.Field>
                    
                  <Form.Field>
                    <label>Re-type Password</label>
                    <input
                      id="signup-retype-password"
                      name="retype-password"
                      value={user.retypePassword}
                      onChange={onChange}
                      type="password"
                      autoComplete="new-password"
                    />

                    <div className="pointer-message-error">
                      {_.has(errors, 'retype-password') &&
                        <Label htmlFor="signup-retype-password" className="ecell-red" pointing>
                          {errors.password}
                        </Label>
                      }
                    </div>
                    
                  </Form.Field>
                  <div className="login-button-wrapper">
                    <Button primary type="submit" className="ecell-primary-button">Sign Up</Button>
                  </div>
                </Form>
              
              </div>
            </Grid.Column>

          </Grid.Row>
        </Grid>
      </Grid.Column>

    </Grid.Row>
  </Grid>
);

SignupForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    password: PropTypes.string,
  }).isRequired,
  user: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    retypePassword: PropTypes.string.isRequired,
  }).isRequired,
};

export default SignupForm;
