import React from 'react';
import { Button, Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const AdminListItem = props => (
  <Table.Row>
    <Table.Cell>
      {props.admin.email}
    </Table.Cell>
    <Table.Cell>
      {props.admin.isSuperAdmin ? 'Super admin' : 'Admin'}
    </Table.Cell>
    <Table.Cell>
      {!props.admin.isSuperAdmin &&
        <Button>Remove</Button>
      }
    </Table.Cell>
  </Table.Row>
);

AdminListItem.propTypes = {
  admin: PropTypes.shape({
    email: PropTypes.string.isRequired,
    isSuperAdmin: PropTypes.bool.isRequired,
  }).isRequired,
};

export default AdminListItem;
