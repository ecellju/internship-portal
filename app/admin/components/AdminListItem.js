import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import AdminRemoveButton from './AdminRemoveButton';

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
        <AdminRemoveButton
          onButtonClick={props.onRemoveAdminClick}
          admin={props.admin}
        >
          Remove
        </AdminRemoveButton>
      }
    </Table.Cell>
  </Table.Row>
);

AdminListItem.propTypes = {
  admin: PropTypes.shape({
    email: PropTypes.string.isRequired,
    isSuperAdmin: PropTypes.bool.isRequired,
  }).isRequired,
  onRemoveAdminClick: PropTypes.func.isRequired,
};

export default AdminListItem;
