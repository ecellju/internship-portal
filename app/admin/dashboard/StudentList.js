import axios from 'axios';
import React, { Component } from 'react';
import { Table, Menu, Icon, Container, Form } from 'semantic-ui-react';
import StudentListItem from './StudentListItem';
import Auth from '../../auth/modules/Auth';

class StudentList extends Component {
  constructor(props) {
    super(props);
    this.getStudentItems.bind(this);
    this.getStudentListItems.bind(this);
    this.initialState = {
      studentName: '', department: '', year: '', studentItems: [],
    };
    this.state = this.initialState;
    this.getStudentItems();
    this.handleChange = (e, { name, value }) => this.setState({ [name]: value });
    this.handleApplyfilter = (event) => {
      event.preventDefault();
      console.log(this.state.studentName, ' k ', this.state.department, ' ', this.state.year, ' ', this.state);
    };
  }

  getStudentListItems(studentList) {
    const studentListItems = studentList.map((student, index) =>
      (<StudentListItem
        name={`${student.firstName  } ${  student.lastName}`}
        department={student.profile.branch}
        year={student.profile.currentYear}
        key={index.toString()}
      />),
    );
    return studentListItems;
  }

  getStudentItems() {
    axios.get('/api/admin/getStudents', {
      headers: {
        Authorization: `bearer ${Auth.getToken()}`,
        page: 1,
      },
    })
      .then((res) => {
        console.log(res.data.students);
        const studentList = res.data.students;
        this.setState({ studentItems: this.getStudentListItems(studentList) });
        console.log(this.state.studentItems.length);
        console.log(this.state.studentItems);
      })
      .catch((error) => {
        console.error(error);
      });
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
              onChange={this.handleChange}
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
            {this.state.studentItems}
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
