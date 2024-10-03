import * as React from 'react';

import {createComponent} from '@workday/canvas-kit-react/common';
import {systemIconStencil} from '@workday/canvas-kit-react/icon';
import {createStencil, cssVar} from '@workday/canvas-kit-styling';
import {brand, system} from '@workday/canvas-tokens-web';
import {buttonColorPropVars, buttonStencil} from './BaseButton';
import {Button, ButtonProps} from './Button';
import {mergeStyles} from '@workday/canvas-kit-react/layout';

/**
 * Extends all the style properties from Box to our buttons as well as props from ButtonProps.
 * We omit `ref` since all of our buttons use `createComponent` and already give access to `ref`.
 * Use this type to extend and customize any one off buttons that you want full control over styling.
 */
export interface PrimaryButtonProps extends ButtonProps {
  /**
   * Variant has an option for `inverse` which will inverse the styling
   */
  variant?: 'inverse';
}

const primaryButtonStencil = createStencil({
  extends: buttonStencil,
  base: {
    // Base Styles
    [buttonStencil.vars.background]: brand.primary.base,
    [buttonStencil.vars.borderRadius]: system.shape.round,
    [buttonStencil.vars.label]: brand.primary.accent,
    [systemIconStencil.vars.color]: cssVar(buttonColorPropVars.default.icon, brand.primary.accent),
    // Focus Styles
    '&:focus-visible, &.focus': {
      [buttonStencil.vars.background]: brand.primary.base,
      [buttonStencil.vars.label]: brand.primary.accent,
      [buttonStencil.vars.boxShadowInner]: system.color.border.inverse,
      [buttonStencil.vars.boxShadowOuter]: brand.common.focusOutline,
      [systemIconStencil.vars.color]: cssVar(buttonColorPropVars.focus.icon, brand.primary.accent),
    },
    // Hover Styles
    '&:hover, &.hover': {
      [buttonStencil.vars.background]: brand.primary.dark,
      [buttonStencil.vars.label]: brand.primary.accent,
      [systemIconStencil.vars.color]: cssVar(buttonColorPropVars.hover.icon, brand.primary.accent),
    },
    // Active Styles
    '&:active, &.active': {
      [buttonStencil.vars.background]: brand.primary.darkest,
      [buttonStencil.vars.label]: brand.primary.accent,
      [systemIconStencil.vars.color]: cssVar(buttonColorPropVars.active.icon, brand.primary.accent),
    },
    // Disabled Styles
    '&:disabled, &.disabled': {
      [buttonStencil.vars.background]: brand.primary.base,
      [buttonStencil.vars.label]: brand.primary.accent,
      [buttonStencil.vars.opacity]: system.opacity.disabled,
      [systemIconStencil.vars.color]: cssVar(
        buttonColorPropVars.disabled.icon,
        brand.primary.accent
      ),
    },
  },
  modifiers: {
    variant: {
      // Inverse Styles
      inverse: {
        [buttonStencil.vars.background]: system.color.bg.default,
        [buttonStencil.vars.borderRadius]: system.shape.round,
        [buttonStencil.vars.label]: system.color.fg.strong,
        [systemIconStencil.vars.color]: cssVar(
          buttonColorPropVars.default.icon,
          system.color.fg.strong
        ),
        // Focus Styles
        '&:focus-visible, &.focus': {
          [buttonStencil.vars.background]: system.color.bg.default,
          [buttonStencil.vars.label]: system.color.fg.strong,
          [buttonStencil.vars.boxShadowInner]: system.color.border.contrast.default,
          [buttonStencil.vars.boxShadowOuter]: system.color.border.inverse,
          [systemIconStencil.vars.color]: cssVar(
            buttonColorPropVars.focus.icon,
            system.color.fg.strong
          ),
        },
        // Hover Styles
        '&:hover, &.hover': {
          [buttonStencil.vars.background]: system.color.bg.alt.default,
          [buttonStencil.vars.label]: system.color.fg.stronger,
          [systemIconStencil.vars.color]: cssVar(
            buttonColorPropVars.hover.icon,
            system.color.fg.stronger
          ),
        },
        // Active Styles
        '&:active, &.active': {
          [buttonStencil.vars.background]: system.color.bg.alt.strong,
          [buttonStencil.vars.label]: system.color.fg.stronger,
          [systemIconStencil.vars.color]: cssVar(
            buttonColorPropVars.active.icon,
            system.color.fg.stronger
          ),
        },
        // Disabled Styles
        '&:disabled, &.disabled': {
          [buttonStencil.vars.background]: system.color.bg.default,
          [buttonStencil.vars.label]: system.color.fg.strong,
          [systemIconStencil.vars.color]: cssVar(
            buttonColorPropVars.disabled.icon,
            system.color.fg.strong
          ),
        },
      },
    },
  },
});

export const PrimaryButton = createComponent('button')({
  displayName: 'PrimaryButton',
  Component: (
    {children, size, grow, iconPosition, variant, ...elemProps}: PrimaryButtonProps,
    ref,
    Element
  ) => {
    return (
      <Button
        as={Element}
        ref={ref}
        iconPosition={iconPosition}
        {...mergeStyles(elemProps, primaryButtonStencil({size, grow, iconPosition, variant}))}
      >
        {children}
      </Button>
    );
  },
});
