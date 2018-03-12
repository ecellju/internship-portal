import React from 'react';
import { Label, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';

export default class DeletedProfileSkillListItem extends React.Component {
  constructor() {
    super();
    this.handleClick = (event, data) => {
      console.log(data.children[0].props.children);
      this.props.restoreSkill(data.children[0].props.children);
    };
  }

  render() {
    return (
      <Label
        onClick={this.handleClick}
        key={this.props.skill}
        className="hover-add-label"
      >
        <span className="hover-label-text">{this.props.skill}</span>
        <Icon className="hover-visible" name="checkmark" />
      </Label>
    );
  }
}

DeletedProfileSkillListItem.propTypes = {
  skill: PropTypes.string.isRequired,
  restoreSkill: PropTypes.func.isRequired,
};
