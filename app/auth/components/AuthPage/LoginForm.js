import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { Message, Divider, Label, Form, Card, Button } from 'semantic-ui-react';

import './styles.scss';

const LoginForm = ({
  onSubmit,
  onChange,
  errors,
  successMessage,
  user,
}) => (
  <Card centered>
    <Card.Content>
      <Card.Header textAlign="center">
        Log In to Internship Portal
      </Card.Header>
    </Card.Content>
    <Card.Content>
      { successMessage.length > 0 &&
        <Message
          success
          content={successMessage}
        />
      }
      {_.has(errors, 'summary') &&
        <Message
          error
          content={errors.summary}
        />
      }
      <Form onSubmit={onSubmit}>
        <Form.Field>
          <input
            id="login-email"
            name="email"
            placeholder="Email"
            value={user.email}
            onChange={onChange}
            type="text"
          />
          {_.has(errors, 'email') &&
            <Label htmlFor="login-email" basic color="red" pointing>
              {errors.email}
            </Label>
          }
        </Form.Field>
        <Divider />
        <Form.Field>
          <input
            id="login-password"
            name="password"
            placeholder="Password"
            value={user.password}
            onChange={onChange}
            type="password"
          />
          {_.has(errors, 'password') &&
            <Label htmlFor="login-password" basic color="red" pointing>
              {errors.password}
            </Label>
          }
        </Form.Field>
        <div className="centered-button-wrapper">
          <Button primary type="submit">Log In</Button>
        </div>
      </Form>
      <Card.Description className="bottom-text">
        Don&#39;t have an account? <Link to="/signup">Sign Up</Link>
      </Card.Description>
    </Card.Content>
  </Card>
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
