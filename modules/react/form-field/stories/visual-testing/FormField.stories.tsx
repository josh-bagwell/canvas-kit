import * as React from 'react';
import {
  ComponentStatesTable,
  permutateProps,
  StaticStates,
} from '@workday/canvas-kit-react/testing';
import {themeParameters} from './utils';

import {TextInput} from '@workday/canvas-kit-react/text-input';
import {FormFieldLabelPosition, FormField} from '@workday/canvas-kit-react/form-field';

export default {
  title: 'Testing/Inputs/Form Field',
  component: FormField,
  parameters: {
    chromatic: {
      disable: false,
    },
  },
};

export const FormFieldStates = {
  render: () => (
    <StaticStates>
      <ComponentStatesTable
        rowProps={[
          {label: 'Required', props: {required: true}},
          {label: 'Hidden Label', props: {labelPosition: FormFieldLabelPosition.Hidden}},
          {label: 'Grow', props: {grow: true}},
          {label: 'Left Label', props: {labelPosition: FormFieldLabelPosition.Left}},
        ]}
        columnProps={permutateProps({
          error: [
            {value: undefined, label: 'Default'},
            {value: FormField.ErrorType.Alert, label: 'Alert'},
            {value: FormField.ErrorType.Error, label: 'Error'},
          ],
        })}
      >
        {props => (
          <FormField {...props} hintText="Helpful text goes here." label="Label">
            <TextInput />
          </FormField>
        )}
      </ComponentStatesTable>
    </StaticStates>
  ),
};

export const FormFieldThemedStates = {
  parameters: themeParameters,
  render: FormFieldStates.render,
};
