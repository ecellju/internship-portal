import React, { Component } from 'react';
import { Table, Menu, Icon, Container, Form } from 'semantic-ui-react';
import _ from 'lodash';
import StudentListItem from './StudentListItem';

class StudentList extends Component {
  constructor() {
    super();
    this.studentItems = _.times(10, n => <StudentListItem key={n.toString()} />);
    this.initialState = { studentName: '', department: '', year: '' };
    this.state = this.initialState;
    this.handleChange = (e, { name, value }) => this.setState({ [name]: value });
    this.handleApplyfilter = (event) => {
      event.preventDefault();
      console.log(this.state.studentName, ' k ', this.state.department, ' ', this.state.year, ' ', this.state);
    };
  }
  render() {
    return (
      <Container className="StudentList">
        <Form onSubmit={this.handleApplyfilter}>
          <Form.Group widths="equal">
            <Form.Input
              className="studentName"
              icon="search"
              name="studentName"
              value={this.state.studentName}
              placeholder="Student Name"
              onChange={this.handleChange}
            />
            <Form.Input
              className="Department"
              icon="search"
              name="department"
              value={this.state.department}
              placeholder="Department"
              onChange={this.handleChange}
            />
            <Form.Input
              className="Year"
              icon="search"
              name="year"
              value={this.state.year}
              placeholder="Current Year"
              onChange={this.handleChange.bind(this)}
            />
            <Form.Button floated="right" type="submit" content="Apply" />
          </Form.Group>
        </Form>
        <Table celled selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Department</Table.HeaderCell>
              <Table.HeaderCell>Year</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.studentItems}
          </Table.Body>
          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan="3">
                <Menu floated="right" pagination>
                  <Menu.Item as="a" icon>
                    <Icon name="left chevron" />
                  </Menu.Item>
                  <Menu.Item as="a">1</Menu.Item>
                  <Menu.Item as="a">2</Menu.Item>
                  <Menu.Item as="a">3</Menu.Item>
                  <Menu.Item as="a">4</Menu.Item>
                  <Menu.Item as="a" icon>
                    <Icon name="right chevron" />
                  </Menu.Item>
                </Menu>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      </Container>
    );
  }
}

export default StudentList;
