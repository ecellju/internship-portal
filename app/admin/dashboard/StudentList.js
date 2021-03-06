import axios from 'axios';
import React, { Component } from 'react';
import { Table, Menu, Icon, Container, Form, Dropdown } from 'semantic-ui-react';
import StudentListItem from './StudentListItem';
import Auth from '../../auth/modules/Auth';

class StudentList extends Component {
  constructor(props) {
    super(props);
    this.getStudentItems.bind(this);
    this.getNumOfStudents.bind(this);
    this.getPageNavigator.bind(this);
    this.getAllSkills.bind(this);
    this.initialState = {
      skills: [],
      department: '',
      year: '',
      appliedSkills: [],
      appliedDepartment: '',
      appliedYear: '',
      studentItems: [],
      pageNavigator: [],
      leftPageNavIndex: null,
      rightPageNavIndex: null,
      numOfPages: null,
      currentPage: 1,
      allSkills: [],
    };
    this.state = this.initialState;
    this.getStudentItems();
    this.getNumOfStudents();
    this.getAllSkills();
    this.handleChange = (e, { name, value }) => {
      this.setState({ [name]: value });
    };
    this.handleApplyfilter = (event) => {
      event.preventDefault();
      new Promise((resolve) => {
        this.setState({
          currentPage: 1,
          appliedSkills: this.state.skills,
          appliedDepartment: this.state.department,
          appliedYear: this.state.year,
        });
        resolve(this);
      })
        .then((studentListReactObject) => {
          console.log(studentListReactObject.state);
          studentListReactObject.getStudentItems();
          studentListReactObject.getNumOfStudents();
        })
        .catch(() => {
          console.error('error occurred');
        })
    };
  }
  getAllSkills() {
    axios.get('/api/user/all-skills', {
      headers: {
        Authorization: `bearer ${Auth.getToken()}`,
      },
    })
      .then((res) => {
        const allSkills = res.data;
        const allSkillsViewObject = [];
        let index;
        for (index = 0; index < allSkills.length; index += 1) {
          allSkillsViewObject.push({ key: index, text: allSkills[index], value: allSkills[index] });
          this.setState({ allSkills: allSkillsViewObject });
        }
      });
  }
  getPageNavigator() {
    const paginateArray = [];
    paginateArray.push(<Menu.Item
      icon
      disabled={this.state.leftPageNavIndex === 1}
      onClick={() => {
        new Promise((resolve) => {
          this.setState(prevState => ({
          leftPageNavIndex: prevState.leftPageNavIndex - 5,
          rightPageNavIndex: prevState.leftPageNavIndex - 1,
          currentPage: prevState.leftPageNavIndex - 1,
        }));
        resolve(this);
      })
      .then((studentListReactObject) => {
        studentListReactObject.getStudentItems();
        studentListReactObject.getPageNavigator();
      })
      .catch(() => {
        console.error('error occurred');
      });
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
        new Promise((resolve) => {
          this.setState({ currentPage: parseInt(event.target.value) });
          resolve(this);
        })
        .then((studentListReactObject) => {
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
    paginateArray.push(<Menu.Item
      icon
      disabled={this.state.rightPageNavIndex === this.state.numOfPages}
      onClick={() => {
        new Promise((resolve) => {
          this.setState(prevState => ({
          leftPageNavIndex: prevState.leftPageNavIndex + 5,
          rightPageNavIndex: Math.min(prevState.rightPageNavIndex + 5, prevState.numOfPages),
          currentPage: prevState.leftPageNavIndex + 5,
        }));
        resolve(this);
      })
      .then((studentListReactObject) => {
        console.log(studentListReactObject);
        studentListReactObject.getStudentItems();
        studentListReactObject.getPageNavigator();
      })
      .catch(() => {
        console.error('error occurred');
      });
    }}
    >
      <Icon name="right chevron" />
    </Menu.Item>);
    this.setState({ pageNavigator: paginateArray });
  }

  getNumOfStudents() {
    axios.get('/api/admin/getNumOfStudents', {
      headers: {
        Authorization: `bearer ${Auth.getToken()}`,
        skills: this.state.appliedSkills,
        department: this.state.appliedDepartment,
        year: this.state.appliedYear,
      },
    })
      .then((res) => {
        new Promise((resolve) => {
          this.setState({
            leftPageNavIndex: 1,
            rightPageNavIndex: Math.min(Math.ceil(res.data.count / 10), 5),
            numOfPages: Math.ceil(res.data.count / 10),
          });
          resolve(this);
        })
          .then((studentListReactObject) => {
            studentListReactObject.getPageNavigator();
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
        skills: this.state.appliedSkills,
        department: this.state.appliedDepartment,
        year: this.state.appliedYear,
      },
    })
      .then((res) => {
        const studentList = res.data.students;
        this.setState(() => ({
          studentItems: studentList.map((student, index) =>
            (<StudentListItem
              name={`${student.firstName} ${student.lastName}`}
              department={student.profile.branch}
              year={student.profile.currentYear}
              email={student.email}
              cgpa={student.profile.cgpa}
              phone={student.profile.contactNo}
              id={student._id}
              key={index.toString()}
            />)),
        }));
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
            <Dropdown
              className="skills"
              name="skills"
              placeholder="Skills"
              fluid
              multiple
              selection
              options={this.state.allSkills}
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
              <Table.HeaderCell>Email</Table.HeaderCell>
              <Table.HeaderCell>Cgpa</Table.HeaderCell>
              <Table.HeaderCell>Phone</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.state.studentItems}
          </Table.Body>
          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan="6">
                <Menu floated="right" pagination>
                  {this.state.pageNavigator}
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
