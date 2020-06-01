import React from 'react';
import AttributeInput from './AttributeInput';

function SPCalculatorForm(props) {
  const {
    omegaClone,
    primaryAttribute,
    secondaryAttribute,
    onChange: handleChange,
    onSubmit: handleSubmit,
  } = props;

  return (
    <form onChange={handleChange} onSubmit={handleSubmit}>
      <p>
        <input
          id='omegaClone'
          type='checkbox'
          name='omegaClone'
          defaultChecked={omegaClone}
        />
        <label htmlFor='omegaClone'>Omega Clone</label>
      </p>
      <p>
        <AttributeInput
          name='primaryAttribute'
          label='Primary Attribute'
          defaultValue={primaryAttribute}
        />
      </p>
      <p>
        <AttributeInput
          name='secondaryAttribute'
          label='Secondary Attribute'
          defaultValue={secondaryAttribute}
        />
      </p>
    </form>
  );
}

export default SPCalculatorForm;
