import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Message, Label, Header, Button, Modal, Form } from 'semantic-ui-react';

import './styles.scss';

const AccessControlHeader = props => (
  <div className="access-control-header-box">
    <Header>
      Admin List
    </Header>
    <Modal
      trigger={
        <Button primary>
          Add admin
        </Button>
      }
      size="mini"
      closeIcon
      onClose={props.onModalClose}
    >
      <Header content="Add new admin" />
      <Modal.Content>
        { props.successMessage.length > 0 &&
          <Message
            success
            content={props.successMessage}
          />
        }
        {_.has(props.errors, 'summary') &&
          <Message
            error
            content={props.errors.summary}
          />
        }
        <Form>
          <Form.Field>
            <input
              id="add-admin-email"
              placeholder="Email"
              type="text"
              value={props.admin.email}
              onChange={props.onChange}
              name="email"
            />
            {_.has(props.errors, 'email') &&
              <Label htmlFor="add-admin-email" basic color="red" pointing>
                {props.errors.email}
              </Label>
            }
          </Form.Field>
          <Form.Field>
            <input
              id="add-admin-password"
              placeholder="Password"
              type="password"
              value={props.admin.password}
              onChange={props.onChange}
              name="password"
            />
            {_.has(props.errors, 'password') &&
              <Label htmlFor="add-admin-password" basic color="red" pointing>
                {props.errors.password}
              </Label>
            }
          </Form.Field>
          <Form.Field>
            <input
              placeholder="Retype password"
              type="password"
              value={props.admin.retypePassword}
              onChange={props.onChange}
              name="retype-password"
            />
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button primary type="submit" onClick={props.onSubmit}>Add</Button>
      </Modal.Actions>
    </Modal>
  </div>
);

AccessControlHeader.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onModalClose: PropTypes.func.isRequired,
  errors: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string,
    summary: PropTypes.string,
  }).isRequired,
  successMessage: PropTypes.string.isRequired,
  admin: PropTypes.shape({
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    retypePassword: PropTypes.string.isRequired,
  }).isRequired,
};

export default AccessControlHeader;
