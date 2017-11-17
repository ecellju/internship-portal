import React from 'react';
import { Table } from 'semantic-ui-react';
import browserHistory from '../../history';

const handleClick = (event) => {
  console.log(event);
  browserHistory.push('/user/profile');
};
const StudentListItem = () => (
  <Table.Row onClick={handleClick} style={{ cursor: 'hand' }}>
    <Table.Cell>Sagnik Mondal</Table.Cell>
    <Table.Cell>CSE</Table.Cell>
    <Table.Cell>4th Year</Table.Cell>
  </Table.Row>
);
export default StudentListItem;
