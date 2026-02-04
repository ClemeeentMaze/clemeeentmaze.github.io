/**
 * @component Icon
 * @description Icon component using the maze-m-icons font
 * 
 * @source maze-monorepo/packages/ariane/src/components/Icon/Icon.tsx
 */
import { forwardRef } from 'react';
import { cn } from '../lib/utils';

/**
 * Icon component - Renders icons from the maze-m-icons font
 * 
 * @param {object} props - Component props
 * @param {string} props.name - Icon name (e.g., 'sparkles', 'folder', 'message')
 * @param {string | number} [props.size='16px'] - Icon size
 * @param {string} [props.color] - Icon color
 * @param {string} [props.className] - Additional CSS classes
 */
const Icon = forwardRef(function Icon(
  {
    name,
    size = '16px',
    color,
    className,
    style,
    ...props
  },
  ref
) {
  return (
    <i
      ref={ref}
      className={cn(`maze-m-icon-${name}`, className)}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: size,
        color: color,
        lineHeight: 1,
        ...style,
      }}
      {...props}
    />
  );
});

Icon.displayName = 'Icon';

export { Icon };

