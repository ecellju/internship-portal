import React, { Component } from 'react';
import axios from 'axios';
import { Form, Button, Divider } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Auth from '../../auth/modules/Auth';

const addSkill = skill => axios.post('/api/admin/add-skills', skill, {
  headers: {
    Authorization: `bearer ${Auth.getToken()}`,
  },
})
  .then(res => res);

class AddSkill extends Component {
  constructor() {
    super();
    this.state = { newSkill: '' };
    this.handleAdd = () => {
      console.log('new skill', this.state.newSkill);
      const temp = { name: this.state.newSkill };
      addSkill(temp)
        .then((res) => {
          console.log(res);
          this.props.refreshSkillList();
          this.setState({ newSkill: '' });
        })
        .catch(console.error());
    };
    this.handleChange = (e, { name, value }) => this.setState({ [name]: value });
  }

  render() {
    return (
      <div className="addSkillBar" >
        <Form>
          <Divider />
          <Form.Group>
            <Form.Input name="newSkill" value={this.state.newSkill} onChange={this.handleChange} width={16} placeholder="Add new skill here    eg: Software Development" />
            <Form.Button onClick={this.handleAdd} floated="right" content="Add" />
          </Form.Group>
          <Divider />
        </Form>
      </div>
    );
  }
}

AddSkill.prototypes = {
  refreshSkillList: PropTypes.func.isRequired,
};
export default AddSkill;
