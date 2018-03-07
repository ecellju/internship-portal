import React from 'react';
import { Label, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';

export default class SelectedSkillListItem extends React.Component {
  constructor() {
    super();
    this.handleClick = (event, data) => {
      console.log(data.children[1]);
    };
  }

  render() {
    return (
      <Label style={{ margin: 10 }} ><Icon name="checkmark" />{this.props.skill}</Label>
    );
  }
}

SelectedSkillListItem.propTypes = {
  skill: PropTypes.string.isRequired,
};
