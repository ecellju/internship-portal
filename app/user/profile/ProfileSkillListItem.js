import React from 'react';
import { Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const ProfileSkillListItem = props => (
  <Label style={{ margin: 10 }}color="teal" tag> {props.skill} </Label>
);

export default ProfileSkillListItem;
ProfileSkillListItem.propTypes = {
  skill: PropTypes.string.isRequired,
};

