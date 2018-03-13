import React from 'react';
import PropTypes from 'prop-types';
import { Divider } from 'semantic-ui-react';
import EditableProfileSkillListItem from './EditableProfileSkillListItem';
import UnselectedProfileSkillListItem from './UnselectedProfileSkillListItem';

const ProfileSkillList = (props) => {
  const editableSkillItems = props.skills.map(item => (
    <EditableProfileSkillListItem
      key={item}
      skill={item}
      removeSkill={props.removeSkill}
    />
  ));

  const unselectedSkillItems = props.unselectedSkills.map(item => (
    <UnselectedProfileSkillListItem
      key={item}
      skill={item}
      restoreSkill={props.restoreSkill}
    />
  ));

  return (
    <div>
      { editableSkillItems }
      <Divider />
      { unselectedSkillItems }
    </div>
  );
};

export default ProfileSkillList;
ProfileSkillList.propTypes = {
  skills: PropTypes.arrayOf(PropTypes.string).isRequired,
  restoreSkill: PropTypes.func.isRequired,
  removeSkill: PropTypes.func.isRequired,
  unselectedSkills: PropTypes.arrayOf(PropTypes.string).isRequired,
};
