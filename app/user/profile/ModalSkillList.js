import React from 'react';
import { Modal, Button, Icon, Divider } from 'semantic-ui-react';
import Axios from 'axios';
import PropTypes from 'prop-types';
import Auth from '../../auth/modules/Auth';
import User from '../../auth/modules/User';
import AvailableSkillListItem from './AvailableSkillListItem';
import SelectedSkillListItem from './SelectedSkillListItem';

const skillList = [
  'Database Management', 'C++', 'Machine Learning', 'People Skills', 'Python', 'Full stack development',
  'C#', 'Java', 'Data Science', 'Leadership',
];

export default class ModalSkillList extends React.Component {
  constructor() {
    super();
    this.state = { skills: skillList, selectedSkills: [], open: false };
    this.addSkill = (skill) => {
      let temp = this.state.selectedSkills;
      temp.push(skill);
      this.setState({ ...this.state, selectedSkills: temp });
      temp = this.state.skills;
      const newSkillList = temp.filter(e => e !== skill);
      this.setState({ ...this.state, skills: newSkillList });
    };
    this.addSkill = this.addSkill.bind(this);
    this.handleAdd = () => {
      this.props.refreshSkillList(this.state.selectedSkills);
      this.setState({ ...this.state, open: false, selectedSkills: [] });
    };
    this.open = () => {
      this.setState({ ...this.state, open: true });
    };
    this.close = () => {
      this.setState({ ...this.state, open: false });
    };
  }


  render() {
    const availableSkillItems = this.state.skills.map(item => (
      <AvailableSkillListItem
        key={item}
        skill={item}
        addSkill={this.addSkill}
      />
    ));
    const selectedSkillItems = this.state.selectedSkills.map(item => (
      <SelectedSkillListItem
        key={item}
        skill={item}
        addSkill={this.addSkill}
      />
    ));
    return (
      <div>
        <Button onClick={this.open} size="small" >
          <Icon name="add" />
          Add a new skill
        </Button>
        <Modal closeIcon open={this.state.open} onClose={this.close} >
          <Modal.Header>Select a new skill</Modal.Header>
          <Modal.Content scrolling>
            <Modal.Description>
              {selectedSkillItems}
              <Divider section />
              {availableSkillItems}
              <Divider section />
              <Button primary onClick={this.handleAdd} floated="right"> Add </Button>
            </Modal.Description>
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}

ModalSkillList.propTypes = {
  refreshSkillList: PropTypes.func.isRequired,
};
