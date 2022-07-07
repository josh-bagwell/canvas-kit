import * as React from 'react';
import styled from '@emotion/styled';
import {createComponent, StyledType} from '@workday/canvas-kit-react/common';
import {Box, BoxProps} from './Box';

import {grid, GridStyleProps} from './utils/grid';
import {gridItem, GridItemStyleProps} from './utils/gridItem';

export type GridProps = BoxProps & GridStyleProps;
export type GridItemProps = BoxProps & GridItemStyleProps;

const StyledGrid = styled(Box)<StyledType & GridProps>(
  {
    display: 'grid',
  },
  grid
);

const StyledGridItem = styled(Box)<StyledType & GridItemProps>(gridItem);

/**
 * `Grid` is a two-dimensional layout system for the web. It lets you lay content out in rows and columns.
 * It is highly flexible, and can be used on its own or to build other components.
 *
 * @example
 * import { Grid, GridProps } from '@workday/canvas-kit-react/layout';
 * `Grid` is built on top of `Box` and has access to all `BoxProps`.
 *
 * interface CardProps extends GridProps {
 *   // card-specific props
 * }
 *
 * // `Card`'s default values are set using `GridProps`
 * const Card = (props: CardProps) => (
 *   <Grid gridAutoFlow="row" alignItems="start" depth={1} space="m" {...props}>
 *     <h1>Hello, Card!</h1>
 *     <p>This card uses grid to set its layout.</p>
 *   </Grid>
 * );
 *
 */

const GridItem = createComponent('div')({
  displayName: 'Grid.Item',
  Component: ({children, ...elemProps}: GridItemProps, ref, Element) => {
    return (
      <StyledGridItem as={Element} ref={ref} {...elemProps}>
        {children}
      </StyledGridItem>
    );
  },
});

export const Grid = createComponent('div')({
  displayName: 'Grid',
  Component: ({children, ...elemProps}: GridProps, ref, Element) => {
    return (
      <StyledGrid as={Element} ref={ref} {...elemProps}>
        {children}
      </StyledGrid>
    );
  },
  subComponents: {
    Item: GridItem,
  },
});