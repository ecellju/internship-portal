import React from 'react';
import { Table } from 'semantic-ui-react';
import browserHistory from '../../history';

class StudentListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name, department: this.props.department, year: this.props.year
    };
    this.handleClick.bind(this);
  }

  handleClick(event) {
    console.log(event);
    browserHistory.push('/user/profile');
  }

  render() {
    return (
      <Table.Row onClick={this.handleClick} style={{ cursor: 'hand' }}>
        <Table.Cell> {this.state.name} </Table.Cell>
        <Table.Cell> {this.state.department} </Table.Cell>
        <Table.Cell> {this.state.year} </Table.Cell>
      </Table.Row>
    );
  }
}

export default StudentListItem;
