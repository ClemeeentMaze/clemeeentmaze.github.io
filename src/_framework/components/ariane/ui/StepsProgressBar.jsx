/**
 * @component StepsProgressBar
 * @description Multi-step progress indicator for wizard-style flows.
 * 
 * @source maze-monorepo/packages/ariane/src/components/StepsProgressBar/StepsProgressBar.tsx
 */
import { forwardRef } from 'react';
import { cn } from '../lib/utils';
import { Flex } from './Flex';

/**
 * Color mappings for step progress bars
 */
const colorMap = {
  blue: {
    active: '#0568FD',
    inactive: '#CEEEFF',
  },
  neutral: {
    active: '#6C718C',
    inactive: '#E8E8F1',
  },
  red: {
    active: '#CC3F4D',
    inactive: '#FFCDD8',
  },
  amber: {
    active: '#AC7000',
    inactive: '#FFE4B8',
  },
  forest: {
    active: '#158053',
    inactive: '#C0F5E3',
  },
  lavender: {
    active: '#6B5BEE',
    inactive: '#E3DFFF',
  },
  cyan: {
    active: '#147E90',
    inactive: '#C5FFFE',
  },
};

/**
 * Single step indicator
 */
const Step = forwardRef(function Step(
  { active, completed, color, activeColor, inactiveColor, isLast, className, ...props },
  ref
) {
  const colors = colorMap[color] || colorMap.blue;
  const bgColor = activeColor || (active || completed ? colors.active : (inactiveColor || colors.inactive));

  return (
    <div
      ref={ref}
      className={cn(
        'flex-1 h-1 rounded',
        !isLast && 'mr-1',
        className
      )}
      style={{ backgroundColor: bgColor }}
      {...props}
    />
  );
});

Step.displayName = 'Step';

/**
 * StepsProgressBar component - Multi-step progress indicator
 * 
 * Displays a series of step indicators showing progress through a multi-step process.
 * 
 * @param {object} props - Component props
 * @param {number} props.steps - Total number of steps
 * @param {number} props.activeStep - Currently active step (0-indexed)
 * @param {'blue' | 'neutral' | 'red' | 'amber' | 'forest' | 'lavender' | 'cyan'} [props.color='blue'] - Base color theme
 * @param {string} [props.activeColor] - Custom color for active/completed steps
 * @param {string} [props.inactiveColor] - Custom color for inactive steps
 */
const StepsProgressBar = forwardRef(function StepsProgressBar(
  {
    steps,
    activeStep,
    color = 'blue',
    activeColor,
    inactiveColor,
    className,
    ...props
  },
  ref
) {
  if (!steps || steps <= 0) {
    return null;
  }

  return (
    <Flex
      ref={ref}
      width="100%"
      className={className}
      {...props}
    >
      {Array.from({ length: steps }, (_, index) => (
        <Step
          key={`steps-progressbar-step-${index}`}
          active={index === activeStep}
          completed={index < activeStep}
          color={color}
          activeColor={activeColor}
          inactiveColor={inactiveColor}
          isLast={index === steps - 1}
        />
      ))}
    </Flex>
  );
});

StepsProgressBar.displayName = 'StepsProgressBar';

export { StepsProgressBar };

