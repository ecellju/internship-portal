import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { Message, Divider, Label, Form, Card, Button } from 'semantic-ui-react';

import './styles.scss';

const SignupForm = ({
  onSubmit,
  onChange,
  errors,
  user,
}) => (
  <Card centered>
    <Card.Content>
      <Card.Header textAlign="center">
        Sign Up for Internship Portal
      </Card.Header>
    </Card.Content>
    <Card.Content>
      {_.has(errors, 'summary') &&
        <Message
          error
          content={errors.summary}
        />
      }
      <Form onSubmit={onSubmit}>
        <Form.Field>
          <input
            id="signup-name"
            name="name"
            placeholder="Name"
            value={user.name}
            onChange={onChange}
            type="text"
          />
          {_.has(errors, 'name') &&
            <Label htmlFor="signup-name" basic color="red" pointing>
              {errors.name}
            </Label>
          }
        </Form.Field>
        <Divider />
        <Form.Field>
          <input
            id="signup-email"
            name="email"
            placeholder="Email"
            value={user.email}
            onChange={onChange}
            type="text"
          />
          {_.has(errors, 'email') &&
            <Label htmlFor="signup-email" basic color="red" pointing>
              {errors.email}
            </Label>
          }
        </Form.Field>
        <Divider />
        <Form.Field>
          <input
            id="signup-password"
            name="password"
            placeholder="Password"
            value={user.password}
            onChange={onChange}
            type="password"
          />
          {_.has(errors, 'password') &&
            <Label htmlFor="signup-password" basic color="red" pointing>
              {errors.password}
            </Label>
          }
        </Form.Field>
        <Divider />
        <Form.Field>
          <input
            id="signup-retype-password"
            name="retype-password"
            placeholder="Retype password"
            value={user.retypePassword}
            onChange={onChange}
            type="password"
          />
          {_.has(errors, 'retype-password') &&
            <Label htmlFor="signup-retype-password" basic color="red" pointing>
              {errors.password}
            </Label>
          }
        </Form.Field>
        <div className="centered-button-wrapper">
          <Button primary type="submit">Sign Up</Button>
        </div>
      </Form>
      <Card.Description className="bottom-text">
        Already have an account? <Link to="/login">Log in</Link>
      </Card.Description>
    </Card.Content>
  </Card>
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
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    retypePassword: PropTypes.string.isRequired,
  }).isRequired,
};

export default SignupForm;
