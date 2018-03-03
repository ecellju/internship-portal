import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import GridColumn, { Message, Divider, Label, Form, Card, Button, Grid } from 'semantic-ui-react';

import Fingerprint from '../../../assets/fingerprint.svg';
import Page from '../../../assets/page.svg';
import './styles.scss';

// const LoginForm = ({
//   onSubmit,
//   onChange,
//   errors,
//   successMessage,
//   user,
// }) => (
//   <Card centered>
//     <Card.Content>
//       <Card.Header textAlign="center">
//         Log In to Internship Portal
//       </Card.Header>
//     </Card.Content>
//     <Card.Content>
//       { successMessage.length > 0 &&
//         <Message
//           success
//           content={successMessage}
//         />
//       }
//       {_.has(errors, 'summary') &&
//         <Message
//           error
//           content={errors.summary}
//         />
//       }
      // <Form onSubmit={onSubmit}>
      //   <Form.Field>
      //     <input
      //       id="login-email"
      //       name="email"
      //       placeholder="Email"
      //       value={user.email}
      //       onChange={onChange}
      //       type="text"
      //     />
      //     {_.has(errors, 'email') &&
      //       <Label htmlFor="login-email" basic color="red" pointing>
      //         {errors.email}
      //       </Label>
      //     }
      //   </Form.Field>
      //   <Divider />
      //   <Form.Field>
      //     <input
      //       id="login-password"
      //       name="password"
      //       placeholder="Password"
      //       value={user.password}
      //       onChange={onChange}
      //       type="password"
      //     />
      //     {_.has(errors, 'password') &&
      //       <Label htmlFor="login-password" basic color="red" pointing>
      //         {errors.password}
      //       </Label>
      //     }
      //   </Form.Field>
      //   <div className="centered-button-wrapper">
      //     <Button primary type="submit">Log In</Button>
      //   </div>
      // </Form>
//       <Card.Description className="bottom-text">
//         Don&#39;t have an account? <Link to="/signup">Sign Up</Link>
//       </Card.Description>
//     </Card.Content>
//   </Card>
// );

// LoginForm.propTypes = {
//   onSubmit: PropTypes.func.isRequired,
//   onChange: PropTypes.func.isRequired,
//   errors: PropTypes.shape({
//     email: PropTypes.string,
//     password: PropTypes.string,
//   }).isRequired,
//   successMessage: PropTypes.string.isRequired,
//   user: PropTypes.shape({
//     email: PropTypes.string.isRequired,
//     password: PropTypes.string.isRequired,
//   }).isRequired,
// };

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
                  <p style={{fontSize: '16px', fontWeight: '300'}}>WELCOME TO</p>
                  <p style={{ fontSize: '40px'}}>INTERNSHIP PORTAL</p>
                  <p style={{ fontSize: '12px', fontWeight: '300' }}>
                    DON&#39;T HAVE AN ACCOUNT YET?
                  </p>

                  <div className="signup-button-wrapper">
                    <Button type="submit" className="ecell-primary-button">SIGN UP</Button>
                  </div>
                </div>
              </div>
            </Grid.Column>

            <Grid.Column width={7}>
              <div class="right-sidebar">

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
                  <label>E-MAIL</label>
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
                  <label>PASSWORD</label>
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
                        FORGOT PASSWORD
                      </div>
                    </Grid.Column>

                    <Grid.Column width={8}>
                        <div className="login-button-wrapper">
                          <Button type="submit" className="ecell-primary-button">LOG IN</Button>
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
