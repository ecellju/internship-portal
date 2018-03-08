import React from 'react';
import { Label, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';

export default class AvailableSkillListItem extends React.Component {
  constructor() {
    super();
    this.handleClick = (event, data) => {
      console.log(data.children[1]);
      this.props.addSkill(data.children[1]);
    };
  }

  render() {
    return (
      <Label style={{ margin: 10 }} as="a" onClick={this.handleClick}><Icon name="add" />{this.props.skill}</Label>
    );
  }
}

AvailableSkillListItem.propTypes = {
  skill: PropTypes.string.isRequired,
  addSkill: PropTypes.func.isRequired,
};

