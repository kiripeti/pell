import React from 'react';

const RadioButton = ({name, label, value, selectedValue, onChange}) => (
  <label>
    <input
      type="radio"
      name={name}
      value={value}
      checked={selectedValue === value}
      onChange={(event) => onChange(event.target.value)} />
    {' ' + label}
  </label>
);

export default RadioButton;
