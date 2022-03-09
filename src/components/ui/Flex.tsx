import React from 'react';
import classnames from 'classnames';
import { SpaceSize } from '../../types/style';

interface IFlexProps {
  children: React.ReactNode;
  direction: 'column' | 'column-reverse' | 'row' | 'row-reverse';
  gap?: SpaceSize;
  align?: 'center' | 'flex-end' | 'flex-start';
  justify?: 'center' | 'flex-end' | 'flex-start' | 'space-between';
  class?: string;
  height?: 'screen' | 'full' | 'none';
}

export const Flex = (props: IFlexProps) => {
  const classes = classnames({
    [`${props.class}`]: props.class,
    flex: true,
    'flex--column': props.direction === 'column',
    'flex--column-reverse': props.direction === 'column-reverse',
    'flex--row': props.direction === 'row',
    'flex--row-reverse': props.direction === 'row-reverse',
    [`flex--align-${props.align}`]: props.align,
    [`flex--justify-${props.justify}`]: props.justify,
    [`flex--gap-${props.gap}`]: props.gap,
    'height--screen': props.height === 'screen',
    'height--full': props.height === 'full',
  });

  return <div className={classes}>{props.children}</div>;
};
