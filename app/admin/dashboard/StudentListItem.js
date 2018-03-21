import React from 'react';
import { Table } from 'semantic-ui-react';
import browserHistory from '../../history';

class StudentListItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = () => {
      // console.log(this.props.id);

      console.log(`/admin/student/${this.props.id}`);
      browserHistory.push(`/admin/students/${this.props.id}`);

    };
  }

  render() {
    return (
      <Table.Row onClick={this.handleClick} style={{ cursor: 'hand' }}>
        <Table.Cell> {this.props.name} </Table.Cell>
        <Table.Cell> {this.props.department} </Table.Cell>
        <Table.Cell> {this.props.year} </Table.Cell>
        <Table.Cell> {this.props.email} </Table.Cell>
        <Table.Cell> {this.props.cgpa} </Table.Cell>
        <Table.Cell> {this.props.phone} </Table.Cell>
      </Table.Row>
    );
  }
}

export default StudentListItem;
