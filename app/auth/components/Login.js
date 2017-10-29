import React from 'react';
import { Container, Grid, Form, Button, Card } from 'semantic-ui-react';

import './Login.scss';

const Login = () => (
  <Container className="login-container">
    <Grid centered>
      <Grid.Row>
        <Card>
          <Card.Content>
            <Card.Header>
              Log in to Internship Portal
            </Card.Header>
          </Card.Content>
          <Card.Content extra>
            <Form>
              <Form.Field>
                <label htmlFor="email" className="form-labels">
                  Email
                  <input id="email" placeholder="Email" />
                </label>
              </Form.Field>
              <Form.Field>
                <label htmlFor="password" className="form-labels">
                  Password
                  <input id="password" type="password" placeholder="Password" />
                </label>
              </Form.Field>
              <Button type="submit">Login</Button>
            </Form>
          </Card.Content>
        </Card>
      </Grid.Row>
    </Grid>
  </Container>
);

export default Login;
