/**
 * @component Bar
 * @description Horizontal bar indicator for displaying percentages or progress.
 * 
 * @source maze-monorepo/packages/ariane/src/components/Bar/Bar.tsx
 * @tokens maze-monorepo/packages/ariane/src/theme/colors.ts
 */
import { forwardRef } from 'react';
import { cn } from '../lib/utils';

/**
 * Color token mapping for Bar component
 */
const colorMap = {
  neutral000: '#FFFFFF',
  neutral100: '#F8F8FB',
  neutral200: '#E8E8F1',
  neutral300: '#CDCEDD',
  neutral400: '#9597B0',
  neutral500: '#6C718C',
  neutral600: '#535A74',
  neutral700: '#3D425A',
  neutral800: '#282D40',
  neutral900: '#000000',
  blue100: '#F0FAFF',
  blue200: '#CEEEFF',
  blue300: '#9AD6FF',
  blue400: '#3B9FEC',
  blue500: '#0568FD',
  blue600: '#034FD6',
  blue700: '#0138A9',
  blue800: '#012577',
  cyan400: '#2BA7B8',
  amber500: '#AC7000',
  red500: '#CC3F4D',
};

/**
 * Get color value from token or return as-is
 */
const getColorValue = (color) => {
  return colorMap[color] || color;
};

/**
 * Bar component - Ariane design system port
 * A simple progress/percentage bar
 * 
 * @param {object} props - Component props
 * @param {React.ReactNode} [props.children] - Nested Bar for layered progress
 * @param {number} props.percent - Percentage of bar filled (0-100)
 * @param {string} [props.color='blue500'] - Bar color (Ariane token or CSS color)
 * @param {number} [props.height=4] - Bar height in pixels
 * @param {boolean} [props.animated=false] - Whether to animate width changes
 * @param {boolean} [props.boxShadow=false] - Whether to show box shadow
 * @param {string} [props.role] - ARIA role
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.Ref} ref - Forwarded ref
 */
const Bar = forwardRef(function Bar(
  {
    children,
    percent,
    color = '#0568FD', // blue500
    height = 4,
    animated = false,
    boxShadow = false,
    role,
    className,
    ...props
  },
  ref
) {
  const colorValue = getColorValue(color);

  return (
    <div
      ref={ref}
      role={role}
      className={cn(
        'relative',
        animated && 'transition-[width] duration-500 ease-out',
        className
      )}
      style={{
        backgroundColor: colorValue,
        width: `${percent}%`,
        borderRadius: `${height}px`,
        height: `${height}px`,
        boxShadow: boxShadow ? '0px 0px 0px 0.5px rgba(108, 113, 140, 0.28) inset' : undefined,
      }}
      {...props}
    >
      {children}
    </div>
  );
});

Bar.displayName = 'Bar';

export { Bar };

