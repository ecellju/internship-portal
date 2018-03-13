import React from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';
import { Divider } from 'semantic-ui-react';
import Auth from '../../auth/modules/Auth';
import User from '../../auth/modules/User';
import ProfileSkillListItem from './ProfileSkillListItem';
import EditableProfileSkillListItem from './EditableProfileSkillListItem';
import DeletedProfileSkillListItem from './DeletedProfileSkillListItem';

export default class ProfileSkillList extends React.Component {
  constructor() {
    super();
    this.state = { editable: false };
  }
  componentWillReceiveProps(props) {
    this.setState({ editable: props.editable });
  }
  render() {
    const skillItems = this.props.skills.map(item => (
      <ProfileSkillListItem
        key={item}
        skill={item}
      />
    ));
    const editableSkillItems = this.props.skills.map(item => (
      <EditableProfileSkillListItem
        key={item}
        skill={item}
        removeSkill={this.props.removeSkill}
      />
    ));

    const deletedSkillItems = this.props.toDeleteSkills.map(item => (
      <DeletedProfileSkillListItem
        key={item}
        skill={item}
        restoreSkill={this.props.restoreSkill}
      />
    ));

    return (
      <div>
        { editableSkillItems }
        <Divider />
        { deletedSkillItems }
      </div>
    );
  }
}

ProfileSkillList.propTypes = {
  skills: PropTypes.arrayOf(PropTypes.string).isRequired,
  editable: PropTypes.bool.isRequired,
  restoreSkill: PropTypes.func.isRequired,
  removeSkill: PropTypes.func.isRequired,
  toDeleteSkills: PropTypes.arrayOf(PropTypes.string).isRequired,
};
