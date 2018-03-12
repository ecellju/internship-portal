import React from 'react';
import { Label, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';

export default class SelectedSkillListItem extends React.Component {
  constructor() {
    super();
    this.handleClick = (event, data) => {
      console.log(data.children[1]);
      this.props.removeSkill(data.children[1]);
    };
  }

  render() {
    return (
      <Label as="a" onClick={this.handleClick} style={{ margin: 10 }}>
        <Icon name="remove" />{this.props.skill}
      </Label>
    );
  }
}

SelectedSkillListItem.propTypes = {
  skill: PropTypes.string.isRequired,
  removeSkill: PropTypes.func.isRequired,
};
