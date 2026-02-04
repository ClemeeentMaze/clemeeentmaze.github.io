/**
 * @component InfoTooltip
 * @description Info icon with tooltip for contextual help.
 * 
 * @source maze-monorepo/packages/ariane/src/components/InfoTooltip/InfoTooltip.tsx
 */
import { forwardRef } from 'react';
import { cn } from '../lib/utils';
import { Tooltip } from './Tooltip';

/**
 * Info circle icon component
 */
const InfoCircleIcon = ({ size = '16px', color = '#535A74', className, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn('flex-shrink-0', className)}
    {...props}
  >
    <circle cx="8" cy="8" r="7" stroke={color} strokeWidth="1.5" fill="none" />
    <path
      d="M8 7V11"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <circle cx="8" cy="5" r="0.75" fill={color} />
  </svg>
);

/**
 * Color mapping for semantic colors
 */
const colorMap = {
  'default.main.secondary': '#535A74',
  'default.main.primary': '#000000',
  'default.extra.dormant': '#6C718C',
  'default.extra.awake': '#0568FD',
  'default.extra.critical': '#CC3F4D',
  'default.extra.warning': '#AC5F00',
  'default.extra.success': '#15807B',
};

/**
 * InfoTooltip component - Info icon with tooltip
 * 
 * A convenient combination of an info circle icon and a tooltip.
 * Commonly used to provide additional context or help text.
 * 
 * @param {object} props - Component props
 * @param {string | number} [props.size='16px'] - Icon size
 * @param {string} [props.color='default.main.secondary'] - Icon color (semantic or hex)
 * @param {string} props.content - Tooltip content text
 * @param {'top' | 'right' | 'bottom' | 'left'} [props.side='top'] - Tooltip position
 * @param {'start' | 'center' | 'end'} [props.align='center'] - Tooltip alignment
 * @param {number} [props.delayDuration=200] - Delay before showing tooltip (ms)
 * 
 * Also accepts all other Tooltip props
 */
const InfoTooltip = forwardRef(function InfoTooltip(
  {
    size = '16px',
    color = 'default.main.secondary',
    content,
    side = 'top',
    align = 'center',
    delayDuration = 200,
    className,
    ...tooltipProps
  },
  ref
) {
  // Resolve color value
  const colorValue = colorMap[color] || color;
  
  // Normalize size to string with px
  const sizeValue = typeof size === 'number' ? `${size}px` : size;

  return (
    <Tooltip
      content={content}
      side={side}
      align={align}
      delayDuration={delayDuration}
      {...tooltipProps}
    >
      <span
        ref={ref}
        className={cn('inline-flex items-center justify-center cursor-help', className)}
        tabIndex={0}
        role="button"
        aria-label="More information"
      >
        <InfoCircleIcon size={sizeValue} color={colorValue} />
      </span>
    </Tooltip>
  );
});

InfoTooltip.displayName = 'InfoTooltip';

export { InfoTooltip, InfoCircleIcon };

