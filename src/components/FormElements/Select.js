import React from 'react';

const Select = ({name, className, value, onChange, defaultOption, options}) =>
  <select
    name={name}
    className={className ? className : ''}
    size="1"
    value={value}
    onChange={(event) => onChange(event.target.value)} >
    <option value={defaultOption ? defaultOption.value : ''}> {defaultOption ? defaultOption.label : ''} </option>
    {Object.keys(options).map((key, index) => (
      <option key={index} value={key}> {options[key]} </option>
    ))}
  </select>

export default Select;