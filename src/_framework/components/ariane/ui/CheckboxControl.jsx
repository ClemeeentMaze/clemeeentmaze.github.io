/**
 * @component CheckboxControl
 * @description Styled checkbox input using Radix UI primitives.
 * 
 * @source maze-monorepo/packages/ariane/src/components/Checkbox/CheckboxControl.tsx
 * @styles maze-monorepo/packages/ariane/src/components/Checkbox/CheckboxControl.styled.ts
 */
import { forwardRef } from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { cn } from '../lib/utils';

// Constants
const CHOICE_INDICATOR_SIZE = 16;

// Checkmark SVG (encoded for background-image)
const CHECKMARK_ACTIVE = "url('data:image/svg+xml,%3Csvg%20width%3D%2212%22%20height%3D%2210%22%20viewBox%3D%220%200%2012%2010%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M11.8044%201.56903L3.99967%209.37379L0.195557%205.56967L1.13837%204.62686L3.99967%207.48817L10.8616%200.626221L11.8044%201.56903Z%22%20fill%3D%22%23034FD6%22%2F%3E%0A%3C%2Fsvg%3E')";
const CHECKMARK_DISABLED = "url('data:image/svg+xml,%3Csvg%20width%3D%2212%22%20height%3D%2210%22%20viewBox%3D%220%200%2012%2010%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M11.8044%201.56903L3.99967%209.37379L0.195557%205.56967L1.13837%204.62686L3.99967%207.48817L10.8616%200.626221L11.8044%201.56903Z%22%20fill%3D%22%236C718C%22%2F%3E%0A%3C%2Fsvg%3E')";
const INDETERMINATE_ACTIVE = "url('data:image/svg+xml,%3Csvg%20width%3D%228%22%20height%3D%222%22%20viewBox%3D%220%200%208%202%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M8%202H0V0.5H8V2Z%22%20fill%3D%22%23034FD6%22%2F%3E%0A%3C%2Fsvg%3E')";
const INDETERMINATE_DISABLED = "url('data:image/svg+xml,%3Csvg%20width%3D%228%22%20height%3D%222%22%20viewBox%3D%220%200%208%202%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M8%202H0V0.5H8V2Z%22%20fill%3D%22%236C718C%22%2F%3E%0A%3C%2Fsvg%3E')";

// Shadow tokens
const shadows = {
  dormant: '0px 1px 2px rgba(108, 113, 140, 0.08), inset 0px 0px 0px 0.5px rgba(108, 113, 140, 0.8)',
  dormantHovered: '0px 1px 2px rgba(108, 113, 140, 0.08), inset 0px 0px 0px 1px rgba(108, 113, 140, 0.8)',
  dormantPressed: 'inset 0px 0px 0px 1px rgba(108, 113, 140, 1)',
  dormantFocused: 'inset 0px 0px 0px 1px rgba(108, 113, 140, 0.8), 0px 0px 0px 2px rgba(3, 79, 214, 1), 0px 0px 0px 2px rgba(255, 255, 255, 1)',
  awake: '0px 1px 2px rgba(5, 104, 253, 0.08), inset 0px 0px 0px 0.5px rgba(5, 104, 253, 0.8)',
  awakeHovered: '0px 1px 2px rgba(5, 104, 253, 0.08), inset 0px 0px 0px 1px rgba(5, 104, 253, 0.8)',
  awakePressed: 'inset 0px 0px 0px 1px rgba(5, 104, 253, 1)',
  critical: '0px 1px 2px rgba(204, 63, 77, 0.08), inset 0px 0px 0px 0.5px rgba(204, 63, 77, 0.8)',
  criticalHovered: '0px 1px 2px rgba(204, 63, 77, 0.08), inset 0px 0px 0px 1px rgba(204, 63, 77, 0.8)',
};

/**
 * CSS styles for checkbox states
 */
const checkboxStyles = `
  .ariane-checkbox-root {
    position: relative;
    display: inline-flex;
    width: ${CHOICE_INDICATOR_SIZE}px;
    min-width: ${CHOICE_INDICATOR_SIZE}px;
    height: ${CHOICE_INDICATOR_SIZE}px;
    margin-top: 4px;
  }
  .ariane-checkbox-root[hidden] {
    display: none;
  }
  .ariane-checkbox-input {
    position: absolute;
    width: 100%;
    height: 100%;
    outline: none;
    inset: 0;
    opacity: 0;
    cursor: pointer;
    margin: 0;
  }
  .ariane-checkbox-input:disabled {
    cursor: not-allowed;
  }
  .ariane-checkbox-indicator {
    display: inline-flex;
    width: 100%;
    height: 100%;
    background-color: #FFFFFF;
    border-radius: 4px;
    background-repeat: no-repeat;
    background-position: center;
    transition: background-color 250ms, box-shadow 250ms, outline-color 250ms;
    outline: 2px solid transparent;
    outline-offset: 2px;
    pointer-events: none;
  }
  /* Hover */
  .ariane-checkbox-input:hover:not(:disabled) + .ariane-checkbox-indicator {
    box-shadow: ${shadows.dormantHovered};
  }
  .ariane-checkbox-input:hover:not(:disabled).error + .ariane-checkbox-indicator {
    box-shadow: ${shadows.criticalHovered};
  }
  /* Active/Pressed */
  .ariane-checkbox-input:active:not(:disabled) + .ariane-checkbox-indicator {
    background-color: #F0FAFF;
    box-shadow: ${shadows.dormantPressed};
  }
  /* Focus */
  .ariane-checkbox-input:focus-visible + .ariane-checkbox-indicator {
    box-shadow: ${shadows.dormantFocused};
    outline-color: #034FD6;
  }
  /* Checked */
  .ariane-checkbox-input:checked:not(:disabled) + .ariane-checkbox-indicator {
    background-image: ${CHECKMARK_ACTIVE};
    box-shadow: ${shadows.awakePressed};
  }
  /* Checked Disabled */
  .ariane-checkbox-input:checked:disabled + .ariane-checkbox-indicator {
    background-image: ${CHECKMARK_DISABLED};
    background-color: #F8F8FB;
  }
  /* Indeterminate */
  .ariane-checkbox-input[data-state="indeterminate"]:not(:disabled) + .ariane-checkbox-indicator {
    background-image: ${INDETERMINATE_ACTIVE};
    box-shadow: ${shadows.awakePressed};
  }
  /* Indeterminate Disabled */
  .ariane-checkbox-input[data-state="indeterminate"]:disabled + .ariane-checkbox-indicator {
    background-image: ${INDETERMINATE_DISABLED};
    background-color: #F8F8FB;
  }
  /* Disabled */
  .ariane-checkbox-input:disabled + .ariane-checkbox-indicator {
    box-shadow: ${shadows.dormant};
    background-color: #F8F8FB;
  }
  /* Error state */
  .ariane-checkbox-indicator.error {
    box-shadow: ${shadows.critical};
  }
`;

/**
 * CheckboxControl component - Ariane design system port
 * 
 * @param {object} props - Component props
 * @param {boolean} [props.selected] - Controlled checked state
 * @param {boolean} [props.defaultSelected] - Default checked state (uncontrolled)
 * @param {boolean} [props.error=false] - Whether checkbox is in error state
 * @param {boolean} [props.disabled=false] - Whether checkbox is disabled
 * @param {boolean} [props.readOnly=false] - Whether checkbox is read-only
 * @param {boolean} [props.hidden=false] - Whether to hide the checkbox
 * @param {string} [props.name] - Form field name
 * @param {string} [props.value] - Form field value
 * @param {function} [props.onCheckedChange] - Called when checked state changes
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.Ref} ref - Forwarded ref
 */
const CheckboxControl = forwardRef(function CheckboxControl(
  {
    selected,
    defaultSelected,
    error = false,
    disabled = false,
    readOnly = false,
    hidden = false,
    name,
    value,
    onCheckedChange,
    className,
    ...props
  },
  ref
) {
  // Handle the onCheckedChange to respect readOnly
  const handleCheckedChange = (checked) => {
    if (readOnly) return;
    onCheckedChange?.(checked);
  };

  return (
    <>
      <style>{checkboxStyles}</style>
      <CheckboxPrimitive.Root
        ref={ref}
        checked={selected}
        defaultChecked={defaultSelected}
        onCheckedChange={handleCheckedChange}
        disabled={disabled || readOnly}
        name={name}
        value={value}
        aria-invalid={error}
        className={cn(
          'ariane-checkbox-root',
          className
        )}
        hidden={hidden}
        {...props}
      >
        {/* Hidden native checkbox for form submission */}
        <input
          type="checkbox"
          className={cn(
            'ariane-checkbox-input',
            error && 'error'
          )}
          checked={selected}
          defaultChecked={defaultSelected}
          disabled={disabled || readOnly}
          readOnly={readOnly}
          tabIndex={-1}
          style={{ pointerEvents: 'none' }}
        />
        {/* Visual indicator */}
        <span 
          className={cn(
            'ariane-checkbox-indicator',
            error && 'error'
          )}
          style={{
            boxShadow: error ? shadows.critical : shadows.dormant,
          }}
        />
      </CheckboxPrimitive.Root>
    </>
  );
});

CheckboxControl.displayName = 'CheckboxControl';

export { CheckboxControl };

