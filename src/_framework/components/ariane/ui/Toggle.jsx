/**
 * @component Toggle
 * @description Toggle switch component using Radix UI primitives.
 * 
 * @source maze-monorepo/packages/ariane/src/components/Toggle/Toggle.tsx
 */
import { forwardRef } from 'react';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import { cn } from '../lib/utils';

// Size configurations matching Ariane
const SIZES = {
  xs: {
    width: 32,
    height: 18,
    thumbSize: 14,
    thumbOffset: 2,
  },
  m: {
    width: 50,
    height: 24,
    thumbSize: 20,
    thumbOffset: 2,
  },
  lg: {
    width: 75,
    height: 33,
    thumbSize: 29,
    thumbOffset: 2,
  },
};

// Default colors
const defaultColors = {
  onColor: '#0568FD', // blue500
  offColor: '#9597B0', // neutral400
};

/**
 * CSS styles for Toggle
 */
const toggleStyles = `
  .ariane-toggle-root {
    all: unset;
    border-radius: 9999px;
    position: relative;
    transition: background-color 150ms ease-out;
    cursor: pointer;
  }
  .ariane-toggle-root:focus-visible {
    box-shadow: 0px 0px 0px 2px #034FD6;
    outline: 2px solid transparent;
    outline-offset: 2px;
  }
  .ariane-toggle-root:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  .ariane-toggle-thumb {
    display: block;
    background-color: white;
    border-radius: 9999px;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);
    transition: transform 150ms ease-out;
    will-change: transform;
  }
`;

/**
 * Toggle component - Ariane design system port
 * A switch/toggle control using Radix UI Switch primitive
 * 
 * @param {object} props - Component props
 * @param {boolean} props.checked - Controlled checked state
 * @param {function} props.onChange - Called when state changes (checked: boolean) => void
 * @param {'xs' | 'm' | 'lg'} [props.size='m'] - Toggle size
 * @param {boolean} [props.disabled=false] - Whether toggle is disabled
 * @param {boolean} [props.icons=false] - Whether to show icons (not implemented - use default)
 * @param {string} [props.onColor='#0568FD'] - Background color when checked
 * @param {string} [props.offColor='#9597B0'] - Background color when unchecked
 * @param {string} [props.name] - Form field name
 * @param {string} [props['data-e2e']] - E2E test attribute
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.Ref} ref - Forwarded ref
 */
const Toggle = forwardRef(function Toggle(
  {
    checked,
    onChange,
    size = 'm',
    disabled = false,
    icons = false,
    onColor = defaultColors.onColor,
    offColor = defaultColors.offColor,
    name,
    'data-e2e': dataE2E,
    className,
    ...props
  },
  ref
) {
  const sizeConfig = SIZES[size] || SIZES.m;
  
  const handleCheckedChange = (newChecked) => {
    onChange?.(newChecked);
  };

  return (
    <>
      <style>{toggleStyles}</style>
      <SwitchPrimitive.Root
        ref={ref}
        checked={checked}
        onCheckedChange={handleCheckedChange}
        disabled={disabled}
        name={name}
        data-e2e={dataE2E}
        className={cn('ariane-toggle-root', className)}
        style={{
          width: `${sizeConfig.width}px`,
          height: `${sizeConfig.height}px`,
          backgroundColor: checked ? onColor : offColor,
        }}
        {...props}
      >
        <SwitchPrimitive.Thumb
          className="ariane-toggle-thumb"
          style={{
            width: `${sizeConfig.thumbSize}px`,
            height: `${sizeConfig.thumbSize}px`,
            transform: checked 
              ? `translateX(${sizeConfig.width - sizeConfig.thumbSize - sizeConfig.thumbOffset}px)` 
              : `translateX(${sizeConfig.thumbOffset}px)`,
          }}
        />
      </SwitchPrimitive.Root>
    </>
  );
});

Toggle.displayName = 'Toggle';

export { Toggle };

