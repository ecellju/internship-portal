import React from 'react';
import { Form, Button, Card } from 'semantic-ui-react';

import './styles.scss';

const Login = () => (
  <Card>
    <Card.Content>
      <Card.Header>
        Log in to Internship Portal
      </Card.Header>
    </Card.Content>
    <Card.Content extra>
      <Form>
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
        <Button type="submit">Login</Button>
      </Form>
    </Card.Content>
  </Card>
);

export default Login;
