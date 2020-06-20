import React from 'react'

const Input = ({name, value, type, className, onChange}) => {
  let onChangeHandler;
  
  if (type === 'N') {
    onChangeHandler = (event) => {
      if (!isNaN(event.target.value)) {
        const parsedVal = parseFloat(event.target.value);
        const val = isNaN(parsedVal) ? '' : parsedVal;
        onChange(val);
      }
    }
  } else {
    onChangeHandler = (event) => onChange(event.target.value)
  }

  return (
    <input
      type="text"
      name={name}
      className={className}
      value={value}
      onChange={onChangeHandler} />
  );
}

export default Input;