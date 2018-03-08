import React from 'react';
import { Label, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';

export default class DeletedProfileSkillListItem extends React.Component {
  constructor() {
    super();
    this.handleClick = (event, data) => {
      console.log(data.children[1]);
      this.props.restoreSkill(data.children[1]);
    };
  }

  render() {
    return (
      <Label as="a" onClick={this.handleClick} style={{ margin: 10 }} ><Icon name="checkmark" />{this.props.skill}</Label>
    );
  }
}

DeletedProfileSkillListItem.propTypes = {
  skill: PropTypes.string.isRequired,
  restoreSkill: PropTypes.func.isRequired,
};
