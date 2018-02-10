import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';

import './styles.scss';

const AdminRemoveButton = (props) => {
  const onClick = () => {
    props.onButtonClick(props.admin);
  };
  return (
    <div className="admin-remove-button">
      <Button onClick={onClick}>
        Remove
      </Button>
    </div>
  );
};

AdminRemoveButton.propTypes = {
  admin: PropTypes.shape({
    email: PropTypes.string.isRequired,
    isSuperAdmin: PropTypes.bool.isRequired,
  }).isRequired,
  onButtonClick: PropTypes.func.isRequired,
};

export default AdminRemoveButton;
