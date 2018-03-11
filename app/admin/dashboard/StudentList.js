import axios from 'axios';
import React, { Component } from 'react';
import { Table, Menu, Icon, Container, Form } from 'semantic-ui-react';
import StudentListItem from './StudentListItem';
import Auth from '../../auth/modules/Auth';

class StudentList extends Component {
  constructor(props) {
    super(props);
    this.getStudentItems.bind(this);
    this.getNumOfStudents.bind(this);
    this.getPageNavigator.bind(this);
    this.initialState = {
      studentName: '',
      department: '',
      year: '',
      studentItems: [],
      pageNavigator: [],
      leftPageNavIndex: null,
      rightPageNavIndex: null,
      numOfPages: null,
      currentPage: 1,
    };
    this.state = this.initialState;
    this.getStudentItems();
    this.getNumOfStudents();
    this.handleChange = (e, { name, value }) => this.setState({ [name]: value });
    this.handleApplyfilter = (event) => {
      event.preventDefault();
      //console.log(this.state.studentName, ' k ', this.state.department, ' ', this.state.year, ' ', this.state);
    };
  }

  getPageNavigator() {
    const paginateArray = [];
    // if (this.state.leftPageNavIndex === 1) {
    //   paginateArray.push(<Menu.Item as="a" disabled icon> <Icon name="left chevron" /> </Menu.Item>);
    // } else {
    //   paginateArray.push(<Menu.Item as="a" icon> <Icon name="left chevron" /> </Menu.Item>);
    // }
    //console.log('leftPageNavIndex', this.state.leftPageNavIndex);
    paginateArray.push(<Menu.Item
      icon
      disabled={this.state.leftPageNavIndex === 1}
      onClick={() => {
      //console.log(this);
    }}
    >
      <Icon name="left chevron" />
    </Menu.Item>);
    let index;
    for (index = this.state.leftPageNavIndex; index <= this.state.rightPageNavIndex; index += 1) {
      paginateArray.push(<button
        value={index}
        key={index}
        onClick={(event) => {
        //console.log('page: ', event.target.value);
        new Promise((resolve) => {
          //console.log(this);
          this.setState({ currentPage: event.target.value });
          resolve(this);
        })
        .then((studentListReactObject) => {
          //console.log(studentListReactObject);
          studentListReactObject.getStudentItems();
        })
        .catch(() => {
          console.error('error occurred');
        });
      }}
      >
        {index}
      </button>);
    }
    if (this.state.rightPageNavIndex === this.state.numOfPages) {
      paginateArray.push(<Menu.Item as="a" disabled icon> <Icon name="right chevron" /> </Menu.Item>);
    } else {
      paginateArray.push(<Menu.Item as="a" icon> <Icon name="right chevron" /> </Menu.Item>);
    }
    return paginateArray;
  }

  getNumOfStudents() {
    axios.get('/api/admin/getNumOfStudents', {
      headers: {
        Authorization: `bearer ${Auth.getToken()}`,
      },
    })
      .then((res) => {
        //console.log('count', res.data.count);
        new Promise((resolve) => {
          this.setState({
            leftPageNavIndex: 1,
            rightPageNavIndex: Math.min(Math.ceil(res.data.count / 10), this.state.leftPageNavIndex + 4),
            numOfPages: Math.ceil(res.data.count / 10),
          });
          //console.log('getNumOfStudents', this);
          resolve(this);
        })
          .then((studentListReactObject) => {
            studentListReactObject.setState({ pageNavigator: studentListReactObject.getPageNavigator() });
          });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  getStudentItems() {
    axios.get('/api/admin/getStudents', {
      headers: {
        Authorization: `bearer ${Auth.getToken()}`,
        page: this.state.currentPage,
      },
    })
      .then((res) => {
        //console.log(res.data.students);
        const studentList = res.data.students;
        this.setState(() => ({
          studentItems: studentList.map((student, index) =>
            (<StudentListItem
              name={`${student.firstName} ${student.lastName}`}
              department={student.profile.branch}
              year={student.profile.currentYear}
              key={index.toString()}
            />)),
        }));
        //console.log(this.state.studentItems.length);
        //console.log(this.state.studentItems);
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
                  {this.state.pageNavigator}
                </Menu>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
        {console.log(this.state)}
      </Container>
    );
  }
}

export default StudentList;
