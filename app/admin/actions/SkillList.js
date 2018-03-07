import React from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';
import Auth from '../../auth/modules/Auth';
import User from '../../auth/modules/User';
import SkillListItem from './SkillListItem';


const ProfileSkillList = (props) => {
  const skillItems = props.skills.map(item => (
    <SkillListItem
      key={item}
      skill={item}
    />
  ));
  return (
    <div>
      { skillItems }
    </div>
  );
};

export default ProfileSkillList;
ProfileSkillList.propTypes = {
  skills: PropTypes.arrayOf(PropTypes.string).isRequired,
};
