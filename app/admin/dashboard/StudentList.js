import React from 'react';
import { Table, Menu, Icon, Input, Container, Button } from 'semantic-ui-react';
import _ from 'lodash';
import StudentListItem from './StudentListItem';

const handleApplyfilter = (event) => {
  console.log(event);
};

const StudentList = () => {
  const studentItems = _.times(10, n => <StudentListItem key={n.toString()} />);
  return (
    <Container className="StudentList">
      <Menu >
        <Menu.Item>
          <Input className="studentName" icon="search" placeholder="Student Name" />
        </Menu.Item>
        <Menu.Item>
          <Input className="Department" icon="search" placeholder="Department" />
        </Menu.Item>
        <Menu.Item>
          <Input className="Year" icon="search" placeholder="Current Year" />
        </Menu.Item>
        <Menu.Item position="right" >
          <Button primary content="Apply" onClick={handleApplyfilter} />
        </Menu.Item>
      </Menu>
      <Table celled selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Department</Table.HeaderCell>
            <Table.HeaderCell>Year</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {studentItems}
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
};

export default StudentList;
