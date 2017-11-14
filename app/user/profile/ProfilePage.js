import React from 'react';
import { Button, Card, Container, Form } from 'semantic-ui-react';

const genderOptions = [
  { key: 'm', text: 'Male', value: 'Male' },
  { key: 'f', text: 'Female', value: 'Female' },
];

export default class ProfilePage extends React.Component {
  constructor() {
    super();
    this.state = { editable: false };
    this.toggleEditability = () => this.setState({ editable: !this.state.editable });
  }

  render() {
    const { editable } = this.state;

    return (
      <Container text>
        <Card fluid>
          <Card.Content>
            <Card.Header>
              {editable ? 'Edit Profile Information' : 'Profile Information'}
              <Button
                primary
                floated="right"
                content={editable ? 'Save' : 'Edit'}
                onClick={this.toggleEditability}
              />
            </Card.Header>
          </Card.Content>
          <Card.Content>
            <Form>
              <Form.Group>
                <Form.Input
                  readOnly={!editable}
                  label="First name"
                  value="Soumik"
                  width={6}
                />
                <Form.Input
                  readOnly={!editable}
                  label="Middle name"
                  value=""
                  width={4}
                />
                <Form.Input
                  readOnly={!editable}
                  label="Last name"
                  value="Chatterjee"
                  width={6}
                />
              </Form.Group>
              <Form.Group>
                <Form.Input
                  readOnly={!editable}
                  label="Birth date"
                  value="26/07/1995"
                  width={4}
                />
                <Form.Select
                  readOnly={!editable}
                  label="Gender"
                  options={genderOptions}
                  value="Male"
                  width={6}
                />
                <Form.Input
                  readOnly={!editable}
                  label="Lives at"
                  value="Serampore, Hooghly"
                  width={6}
                />
              </Form.Group>
            </Form>
          </Card.Content>
          <Card.Content>
            <Form>
              <Form.Group>
                <Form.Input
                  readOnly={!editable}
                  label="Institution"
                  value="Jadavpur University"
                  width={6}
                />
                <Form.Input
                  readOnly={!editable}
                  label="Branch"
                  value="Computer Science and Engineering"
                  width={10}
                />
              </Form.Group>
            </Form>
          </Card.Content>
        </Card>
      </Container>
    );
  }
}
