import React from 'react';

const CheckBox = ({ name, checked, label, className, onChange }) => (
  <label>
    <input
      type="checkbox"
      name={name}
      className={className ? className : ''}
      checked={checked}
      onChange={event => onChange(event.target.checked)} />
    {' ' + label}
  </label>
);

export default CheckBox;