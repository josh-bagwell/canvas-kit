import React, {ReactNode, ReactElement, FC, ChangeEvent} from 'react';
import {Meta, StoryObj} from '@storybook/react';
import {ExampleCodeBlock} from '../../../../utils/storybook';
import mdxDoc from './Combobox.mdx';

import {
  Combobox,
  ComboboxProps,
  ComboBoxMenuItemGroup,
} from '@workday/canvas-kit-labs-react/combobox';
import {FormField} from '@workday/canvas-kit-react/form-field';
import {StyledMenuItem, MenuItemProps} from '@workday/canvas-kit-react/menu';
import {TextInput} from '@workday/canvas-kit-react/text-input';
import {CanvasProvider, ContentDirection} from '@workday/canvas-kit-react/common';

const autocompleteResult = (
  textModifier: number,
  disabled: boolean
): ReactElement<MenuItemProps> => (
  <StyledMenuItem isDisabled={disabled}>
    Result
    <span>
      num<span>ber</span>
    </span>
    {textModifier}
  </StyledMenuItem>
);

const simpleAutoComplete = (count: number, showDisabledItems, total = 5) =>
  Array.apply(null, Array(count))
    .map((_, i) => autocompleteResult(i, showDisabledItems && i === 0))
    .splice(0, total);

const groupOfResults = (
  count: number,
  showDisabledItems: boolean,
  groupHeading: ReactNode = 'Group'
): ComboBoxMenuItemGroup => ({
  header: (
    <StyledMenuItem>
      <strong>{groupHeading}</strong>
    </StyledMenuItem>
  ),
  items: simpleAutoComplete(count, showDisabledItems, 10),
});

const Autocomplete: FC<
  Omit<ComboboxProps, 'children'> & {
    group?: boolean;
    showDisabledItems?: boolean;
  }
> = ({showClearButton, group, showDisabledItems = false, ...props}) => {
  const [currentText, setCurrentText] = React.useState('');

  const autocompleteCallback = (event: ChangeEvent<HTMLInputElement>): void => {
    setCurrentText(event.target.value);
  };

  const textLength = currentText.length;
  const groupLength = Math.floor(textLength / 2);

  return (
    <Combobox
      autocompleteItems={
        group
          ? [
              groupOfResults(groupLength, showDisabledItems, <em>Animals</em>),
              groupOfResults(Math.min(1, groupLength), showDisabledItems, 'Cars'),
            ]
          : simpleAutoComplete(textLength, showDisabledItems, 10)
      }
      onChange={autocompleteCallback}
      showClearButton={showClearButton == null ? true : showClearButton}
      labelId="autocomplete-123"
      initialValue="Test"
      {...props}
    >
      <TextInput placeholder="Autocomplete" />
    </Combobox>
  );
};

const meta: Meta<typeof Combobox> = {
  title: 'Labs/Combobox',
  component: Combobox,
  tags: ['autodocs'],
  parameters: {
    ReadmePath: 'labs-react/combobox',
    docs: {
      page: mdxDoc,
      components: {
        ExampleCodeBlock,
      },
    },
  },
};

export default meta;

export const Basic: StoryObj = {
  name: 'Autocomplete',
  render: () => (
    <FormField id="autocomplete-123" label="Autocomplete example">
      <Autocomplete />
    </FormField>
  ),
};

export const Grow: StoryObj = {
  render: () => (
    <FormField grow={true} id="autocomplete-123" label="Grow example">
      <Autocomplete />
    </FormField>
  ),
};

export const NoClearButton: StoryObj = {
  render: () => (
    <FormField id="autocomplete-123" label="No clear button">
      <Autocomplete showClearButton={false} />
    </FormField>
  ),
};

export const GroupOfResult: StoryObj = {
  render: () => (
    <FormField id="autocomplete-123" label="Group of results">
      <Autocomplete group={true} />
    </FormField>
  ),
};

export const DisabledItem: StoryObj = {
  render: () => (
    <FormField id="autocomplete-123" label="Group of results">
      <Autocomplete showDisabledItems={true} />
    </FormField>
  ),
};

export const RTL: StoryObj = {
  render: () => (
    <CanvasProvider theme={{canvas: {direction: ContentDirection.RTL}}}>
      <FormField id="rtl-autocomplete-123" label="RTL Autocomplete example">
        <Autocomplete />
      </FormField>
    </CanvasProvider>
  ),
};
