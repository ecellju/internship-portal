import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container } from 'semantic-ui-react';
import axios from 'axios';
import AddSkill from '../actions/AddSkill';
import SkillList from '../actions/SkillList';
import Auth from '../../auth/modules/Auth';

const getAllSkills = () => axios.get('/api/admin/all-skills', {
  headers: {
    Authorization: `bearer ${Auth.getToken()}`,
  },
})
  .then(res => res);

class AdminAction extends Component {
  constructor() {
    super();
    this.state = { skills: [] };
    this.refreshSkillList = () => {
      getAllSkills()
        .then((res) => {
        // console.log('THIS ', this);
          // console.log('All Skills ', res.data);
          this.setState({ ...this.state, skills: res.data });
          // console.log('get', this.state);
        })
        .catch(console.error());
    };
    this.refreshSkillList = this.refreshSkillList.bind(this);
  }

  componentWillMount() {
    // console.log('Mounting parent');
    getAllSkills()
      .then((res) => {
      // console.log('THIS ', this);
        // console.log('All Skills ', res.data);
        this.setState({ ...this.state, skills: res.data });
        // console.log('get', this.state);
      })
      .catch(console.error());
  }
  render() {
    return (
      <div className="Actions" >
        <AddSkill refreshSkillList={this.refreshSkillList} />
        <SkillList skills={this.state.skills} />
      </div>
    );
  }
}

export default AdminAction;
