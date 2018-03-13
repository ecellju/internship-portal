import React from 'react';
import { Modal, Button, Icon, Divider } from 'semantic-ui-react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Auth from '../../auth/modules/Auth';
import User from '../../auth/modules/User';
import AvailableSkillListItem from './AvailableSkillListItem';
import SelectedSkillListItem from './SelectedSkillListItem';


export default class ModalSkillList extends React.Component {
  constructor() {
    super();
    this.state = { open: false };
    this.open = () => {
      this.setState({ ...this.state, open: true });
    };
    this.close = () => {
      this.props.close();
      this.setState({ ...this.state, open: false });
    };
    this.handleAdd = () => {
      this.props.handleAdd();
      this.setState({ ...this.state, open: false });
    };
  }
  render() {
    const availableSkillItems = this.props.unselectedSkills.map(item => (
      <AvailableSkillListItem
        key={item}
        skill={item}
        addSkill={this.props.addSkill}
      />
    ));

    const selectedSkillItems = this.props.selectedSkills.map(item => (
      <SelectedSkillListItem
        key={item}
        skill={item}
        removeSkill={this.props.removeSkill}
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
  handleAdd: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
  selectedSkills: PropTypes.arrayOf(PropTypes.string).isRequired,
  unselectedSkills: PropTypes.arrayOf(PropTypes.string).isRequired,
  addSkill: PropTypes.func.isRequired,
  removeSkill: PropTypes.func.isRequired,
};
