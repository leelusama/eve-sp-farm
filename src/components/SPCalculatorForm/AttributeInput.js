import React from 'react';

function AttributeInput(props) {
  const { label, name, defaultValue } = props;
  return (
    <React.Fragment>
      <label htmlFor={name}>{label}</label>
      <br />
      <input
        id={name}
        type='number'
        name={name}
        min='17'
        max='100'
        step='1'
        placeholder='17 - 100'
        required
        defaultValue={defaultValue}
      />
      <span className='validity'></span>
    </React.Fragment>
  );
}

export default AttributeInput;
