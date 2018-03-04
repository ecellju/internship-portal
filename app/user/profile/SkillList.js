import React from 'react';
import { Modal, Button, Icon } from 'semantic-ui-react';
import Axios from 'axios';
import PropTypes from 'prop-types';
import Auth from '../../auth/modules/Auth';
import User from '../../auth/modules/User';
import SkillListItem from './SkillListItem';

const skillList = [
  'Database Management', 'C++', 'Machine Learning', 'People Skills', 'Python', 'Full stack development',
  'C#', 'Java', 'Data Science', 'Leadership',
];

export default class SkillList extends React.Component {
  constructor() {
    super();
    this.state = { skills: skillList, selectedSkills: [] };
    this.addSkill = (skill) => {
      let temp = this.state.selectedSkills;
      temp.push(skill);
      this.setState({ ...this.state, selectedSkills: temp });
      temp = this.state.skills;
      const newSkillList = temp.filter(e => e !== skill);
      this.setState({ ...this.state, skills: newSkillList });
    };
    this.addSkill = this.addSkill.bind(this);
    this.handleClose = () => {
      this.props.refreshSkillList(this.state.selectedSkills);
    };
  }


  render() {
    const skillItems = this.state.skills.map(item => (
      <SkillListItem
        key={item}
        skill={item}
        addSkill={this.addSkill}
      />
    ));
    return (
      <Modal
        closeIcon
        onClose={this.handleClose}
        trigger={
          <Button size="small" >
            <Icon name="add" />
            Add a new skill
          </Button>
        }
      >
        <Modal.Header>Select a new skill</Modal.Header>
        <Modal.Content scrolling>
          <Modal.Description>
            {skillItems}
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

SkillList.propTypes = {
  refreshSkillList: PropTypes.func.isRequired,
};
