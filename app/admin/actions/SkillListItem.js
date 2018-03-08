import React from 'react';
import { Label, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const SkillListItem = props => (
  <Label style={{ margin: 10 }}><Icon name="checkmark" /> {props.skill} </Label>
);

export default SkillListItem;
SkillListItem.propTypes = {
  skill: PropTypes.string.isRequired,
};

