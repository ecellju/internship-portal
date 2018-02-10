import React from 'react';
import _ from 'lodash';
import { Container, Table, Message, Loader } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import AdminListItem from './AdminListItem';

const AdminList = (props) => {
  const admins = _.orderBy(props.admins, ['email'], ['asc']);
  const adminList = admins.map(admin => (
    <AdminListItem key={admin.email} admin={admin} onRemoveAdminClick={props.onRemoveAdminClick} />
  ));
  return (
    <Container>
      <Loader active={props.showLoading}>
        Removing
      </Loader>
      {props.errorMessage.length > 0 &&
        <Message
          error
          content={props.errorMessage}
        />
      }
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
  errorMessage: PropTypes.string.isRequired,
  onRemoveAdminClick: PropTypes.func.isRequired,
  showLoading: PropTypes.bool.isRequired,
};

export default AdminList;
