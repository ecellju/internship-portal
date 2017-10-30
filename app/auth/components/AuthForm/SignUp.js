import React from 'react';
import { Form, Card, Button } from 'semantic-ui-react';

import './styles.scss';

const SignUp = () => (
  <Card>
    <Card.Content>
      <Card.Header>
        Sign Up for Internship Portal
      </Card.Header>
    </Card.Content>
    <Card.Content extra>
      <Form>
        <Form.Field>
          <label className="form-labels">
            Name
            <input placeholder="Name" />
          </label>
        </Form.Field>
        <Form.Field>
          <label className="form-labels">
            Email
            <input placeholder="Email" />
          </label>
        </Form.Field>
        <Form.Field>
          <label className="form-labels">
            Password
            <input type="password" placeholder="Password" />
          </label>
        </Form.Field>
        <Button type="submit">Sign Up</Button>
      </Form>
    </Card.Content>
  </Card>
);

export default SignUp;
