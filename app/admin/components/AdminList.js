import React from 'react';
import { Container, Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import AdminListItem from './AdminListItem';

const AdminList = (props) => {
  const adminList = props.admins.map(admin => (
    <AdminListItem key={admin.email} admin={admin} />
  ));
  return (
    <Container>
      <Table celled fixed>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={5}>Email</Table.HeaderCell>
            <Table.HeaderCell width={1}>Access Level</Table.HeaderCell>
            <Table.HeaderCell width={1} />
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {adminList}
        </Table.Body>
      </Table>
    </Container>
  );
};

AdminList.propTypes = {
  admins: PropTypes.arrayOf(PropTypes.shape({
    email: PropTypes.string.isRequired,
  })).isRequired,
};

export default AdminList;
