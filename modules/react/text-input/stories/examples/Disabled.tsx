import React from 'react';
import {FormField} from '@workday/canvas-kit-preview-react/form-field';
import {TextInput} from '@workday/canvas-kit-react/text-input';

export const Disabled = () => {
  const [value, setValue] = React.useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <FormField>
      <FormField.Label>Email</FormField.Label>
      <FormField.Input as={TextInput} disabled onChange={handleChange} value={value} />
    </FormField>
  );
};
