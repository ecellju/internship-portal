import React from 'react';
import { Label, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';

export default class EditableProfileSkillListItem extends React.Component {
  constructor() {
    super();
    this.handleClick = (event, data) => {
      console.log(data.children[0].props.children);
      this.props.removeSkill(data.children[0].props.children);
    };
  }

  render() {
    return (
      <Label
        onClick={this.handleClick}
        key={this.props.skill}
        className="hover-delete-label"
      >
        <span className="hover-label-text">{this.props.skill}</span>
        <Icon className="hover-visible" name="remove" />
      </Label>
    );
  }
}

EditableProfileSkillListItem.propTypes = {
  skill: PropTypes.string.isRequired,
  removeSkill: PropTypes.func.isRequired,
};
