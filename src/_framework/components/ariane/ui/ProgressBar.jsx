/**
 * @component ProgressBar
 * @description Progress bar with automatic color coding based on percentage.
 * 
 * @source maze-monorepo/packages/ariane/src/components/ProgressBar/ProgressBar.tsx
 */
import { forwardRef } from 'react';
import { Bar } from './Bar';

/**
 * Determine bar color based on percentage
 * @param {number} percent - Percentage value
 * @returns {string} Color token
 */
const pickColor = (percent) => {
  if (percent > 50) return 'cyan400';
  if (percent > 25) return 'amber500';
  return 'red500';
};

/**
 * ProgressBar component - Ariane design system port
 * A progress bar with color scaling based on percentage
 * 
 * @param {object} props - Component props
 * @param {number} [props.value=0] - Current progress value
 * @param {number} [props.max=100] - Maximum value
 * @param {boolean} [props.solid=false] - If true, use solid blue instead of scaled colors
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.Ref} ref - Forwarded ref
 */
const ProgressBar = forwardRef(function ProgressBar(
  {
    value = 0,
    max = 100,
    solid = false,
    className,
    ...props
  },
  ref
) {
  const percent = (value / max) * 100;
  const color = solid ? 'blue500' : pickColor(percent);

  return (
    <Bar
      ref={ref}
      percent={100}
      color="neutral200"
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      className={className}
      {...props}
    >
      <Bar percent={percent} color={color} />
    </Bar>
  );
});

ProgressBar.displayName = 'ProgressBar';

export { ProgressBar };

