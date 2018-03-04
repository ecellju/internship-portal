import React from 'react';
import { Label, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';

export default class SkillListItem extends React.Component {
  constructor() {
    super();
    this.handleClick = (event, data) => {
      console.log(data.children[1]);
      this.props.addSkill(data.children[1]);
    };
  }

  render() {
    return (
      <Label as="a" onClick={this.handleClick}><Icon name="add" />{this.props.skill}</Label>
    );
  }
}

SkillListItem.propTypes = {
  skill: PropTypes.string.isRequired,
  addSkill: PropTypes.func.isRequired,
};

