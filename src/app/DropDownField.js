import React from 'react';
import PropTypes from 'prop-types';
/* components */
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const DropDownField = ({
  title,
  placeholder,
  value,
  handleChangePrimitive,
  options,
  className,
  id
}) => {
  const menuItems = options.map(option => <MenuItem key={option.value} {...option} />);

  return (
    <div className={className}>
      <h2>{title}</h2>
      <SelectField
        floatingLabelText={placeholder}
        value={value}
        onChange={(event, index, value) => handleChangePrimitive(id, value)}
      >
        {menuItems}
      </SelectField>
    </div>
  );
};

DropDownField.propTypes = {
  title: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string,
  handleChangePrimitive: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.stirng,
    primaryText: PropTypes.stirng
  }).isRequired).isRequired,
  className: PropTypes.string,
  id: PropTypes.string.isRequired
};

export default DropDownField;