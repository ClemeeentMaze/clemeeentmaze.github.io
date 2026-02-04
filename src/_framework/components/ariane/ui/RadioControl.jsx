/**
 * @component RadioControl, RadioGroup
 * @description Radio button input and group using Radix UI primitives.
 * 
 * @source maze-monorepo/packages/ariane/src/components/Radio/RadioControl.tsx
 * @styles maze-monorepo/packages/ariane/src/components/Radio/RadioControl.styled.ts
 */
import { forwardRef } from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { cn } from '../lib/utils';

// Constants
const CHOICE_INDICATOR_SIZE = 16;

// Shadow tokens (SM size)
const shadows = {
  dormant: '0px 1px 2px rgba(108, 113, 140, 0.08), inset 0px 0px 0px 0.5px rgba(108, 113, 140, 0.8)',
  dormantHovered: '0px 1px 2px rgba(108, 113, 140, 0.08), inset 0px 0px 0px 1px rgba(108, 113, 140, 0.8)',
  dormantPressed: 'inset 0px 0px 0px 1px rgba(108, 113, 140, 1)',
  dormantFocused: 'inset 0px 0px 0px 1px rgba(108, 113, 140, 0.8), 0px 0px 0px 2px rgba(3, 79, 214, 1), 0px 0px 0px 2px rgba(255, 255, 255, 1)',
  awakePressed: 'inset 0px 0px 0px 1px rgba(5, 104, 253, 1)',
  critical: '0px 1px 2px rgba(204, 63, 77, 0.08), inset 0px 0px 0px 0.5px rgba(204, 63, 77, 0.8)',
  criticalHovered: '0px 1px 2px rgba(204, 63, 77, 0.08), inset 0px 0px 0px 1px rgba(204, 63, 77, 0.8)',
};

/**
 * CSS styles for radio states
 */
const radioStyles = `
  .ariane-radio-root {
    position: relative;
    display: inline-flex;
    width: ${CHOICE_INDICATOR_SIZE}px;
    min-width: ${CHOICE_INDICATOR_SIZE}px;
    height: ${CHOICE_INDICATOR_SIZE}px;
    margin-top: 4px;
  }
  .ariane-radio-root[hidden] {
    display: none;
  }
  .ariane-radio-indicator-wrapper {
    display: inline-flex;
    width: 100%;
    height: 100%;
    background-color: #FFFFFF;
    border-radius: 50%;
    transition: background-color 250ms, box-shadow 250ms, outline-color 250ms;
    outline: 2px solid transparent;
    outline-offset: 2px;
    align-items: center;
    justify-content: center;
  }
  /* Hover */
  .ariane-radio-root:hover:not([data-disabled]) .ariane-radio-indicator-wrapper {
    box-shadow: ${shadows.dormantHovered};
  }
  .ariane-radio-root:hover:not([data-disabled]).error .ariane-radio-indicator-wrapper {
    box-shadow: ${shadows.criticalHovered};
  }
  /* Active/Pressed */
  .ariane-radio-root:active:not([data-disabled]) .ariane-radio-indicator-wrapper {
    background-color: #F0FAFF;
    box-shadow: ${shadows.dormantPressed};
  }
  /* Focus */
  .ariane-radio-root:focus-visible .ariane-radio-indicator-wrapper {
    box-shadow: ${shadows.dormantFocused};
    outline-color: #034FD6;
  }
  /* Checked */
  .ariane-radio-root[data-state="checked"]:not([data-disabled]) .ariane-radio-indicator-wrapper {
    box-shadow: ${shadows.awakePressed};
  }
  /* Checked Disabled */
  .ariane-radio-root[data-state="checked"][data-disabled] .ariane-radio-indicator-wrapper {
    background-color: #F8F8FB;
  }
  /* Disabled */
  .ariane-radio-root[data-disabled] .ariane-radio-indicator-wrapper {
    box-shadow: ${shadows.dormant};
    background-color: #F8F8FB;
    cursor: not-allowed;
  }
  /* Error state */
  .ariane-radio-indicator-wrapper.error {
    box-shadow: ${shadows.critical};
  }
  /* Radio dot */
  .ariane-radio-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: #034FD6;
  }
  .ariane-radio-root[data-disabled] .ariane-radio-dot {
    background-color: #6C718C;
  }
`;

/**
 * RadioControl component - Ariane design system port
 * Must be used within a RadioGroupPrimitive.Root
 * 
 * @param {object} props - Component props
 * @param {string} props.value - Radio value
 * @param {boolean} [props.selected] - Controlled selected state (use within RadioGroup)
 * @param {boolean} [props.defaultSelected] - Default selected state
 * @param {boolean} [props.error=false] - Whether radio is in error state
 * @param {boolean} [props.disabled=false] - Whether radio is disabled
 * @param {boolean} [props.hidden=false] - Whether to hide the radio
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.Ref} ref - Forwarded ref
 */
const RadioControl = forwardRef(function RadioControl(
  {
    value,
    error = false,
    disabled = false,
    hidden = false,
    className,
    ...props
  },
  ref
) {
  return (
    <>
      <style>{radioStyles}</style>
      <RadioGroupPrimitive.Item
        ref={ref}
        value={value}
        disabled={disabled}
        aria-invalid={error}
        className={cn(
          'ariane-radio-root',
          error && 'error',
          className
        )}
        hidden={hidden}
        {...props}
      >
        <span 
          className={cn(
            'ariane-radio-indicator-wrapper',
            error && 'error'
          )}
          style={{
            boxShadow: error ? shadows.critical : shadows.dormant,
          }}
        >
          <RadioGroupPrimitive.Indicator className="ariane-radio-dot" />
        </span>
      </RadioGroupPrimitive.Item>
    </>
  );
});

RadioControl.displayName = 'RadioControl';

/**
 * RadioGroup component - wrapper for RadioControl items
 * 
 * @param {object} props - Component props
 * @param {string} [props.value] - Controlled value
 * @param {string} [props.defaultValue] - Default value
 * @param {function} [props.onValueChange] - Called when value changes
 * @param {boolean} [props.disabled=false] - Whether all radios are disabled
 * @param {string} [props.name] - Form field name
 * @param {boolean} [props.required=false] - Whether selection is required
 * @param {'horizontal' | 'vertical'} [props.orientation='vertical'] - Layout orientation
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.ReactNode} props.children - RadioControl items
 */
const RadioGroup = forwardRef(function RadioGroup(
  {
    value,
    defaultValue,
    onValueChange,
    disabled = false,
    name,
    required = false,
    orientation = 'vertical',
    className,
    children,
    ...props
  },
  ref
) {
  return (
    <RadioGroupPrimitive.Root
      ref={ref}
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      disabled={disabled}
      name={name}
      required={required}
      orientation={orientation}
      className={cn(
        'flex',
        orientation === 'vertical' ? 'flex-col gap-sm' : 'flex-row gap-md',
        className
      )}
      {...props}
    >
      {children}
    </RadioGroupPrimitive.Root>
  );
});

RadioGroup.displayName = 'RadioGroup';

export { RadioControl, RadioGroup };

