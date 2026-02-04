/**
 * @component CheckboxField
 * @description Complete checkbox field with label, error, and helper text.
 * 
 * @source maze-monorepo/packages/ariane/src/components/Checkbox/CheckboxField.tsx
 * @styles maze-monorepo/packages/ariane/src/components/Checkbox/CheckboxField.styled.ts
 */
import { forwardRef, useId } from 'react';
import { cn } from '../lib/utils';
import { Flex } from './Flex';
import { Text } from './Text';
import { ErrorText } from './ErrorText';
import { CheckboxControl } from './CheckboxControl';

/**
 * CheckboxField component - Checkbox with label, error, and helper text
 * 
 * A complete checkbox form field that combines:
 * - CheckboxControl for the actual checkbox
 * - Label text
 * - Optional error message
 * - Optional helper text
 * 
 * @param {object} props - Component props
 * @param {string} props.valueLabel - The label text displayed next to the checkbox
 * @param {string} [props.id] - Input ID (auto-generated if not provided)
 * @param {string} [props.name] - Input name for form submission
 * @param {boolean} [props.checked] - Controlled checked state
 * @param {boolean} [props.defaultChecked] - Default checked state (uncontrolled)
 * @param {function} [props.onCheckedChange] - Callback when checked state changes
 * @param {boolean} [props.disabled=false] - Whether the checkbox is disabled
 * @param {string} [props.error] - Error message to display
 * @param {string} [props.helperText] - Helper text to display below
 * @param {'ltr' | 'rtl'} [props.dir] - Text direction
 * @param {boolean} [props.hidden] - Whether to hide the field
 */
const CheckboxField = forwardRef(function CheckboxField(
  {
    valueLabel,
    id: providedId,
    name,
    checked,
    defaultChecked,
    onCheckedChange,
    disabled = false,
    error,
    helperText,
    dir,
    hidden,
    className,
    ...props
  },
  ref
) {
  const autoId = useId();
  const controlId = providedId || autoId;
  const errorTextId = `${controlId}-error`;
  const helperTextId = `${controlId}-helper`;

  if (hidden) {
    return null;
  }

  return (
    <div
      ref={ref}
      dir={dir}
      className={cn('flex flex-col', className)}
      {...props}
    >
      <Flex gap="SM" alignItems="flex-start">
        <CheckboxControl
          id={controlId}
          name={name}
          checked={checked}
          defaultChecked={defaultChecked}
          onCheckedChange={onCheckedChange}
          disabled={disabled}
          error={Boolean(error)}
          aria-describedby={
            [error ? errorTextId : null, helperText ? helperTextId : null]
              .filter(Boolean)
              .join(' ') || undefined
          }
        />
        <label
          htmlFor={controlId}
          className={cn(
            'text-[16px] leading-[24px] cursor-pointer select-none',
            disabled && 'text-neutral-400 cursor-not-allowed'
          )}
        >
          {valueLabel}
        </label>
      </Flex>
      
      {error && (
        <ErrorText id={errorTextId} className="mt-xs">
          {error}
        </ErrorText>
      )}
      
      {helperText && (
        <Text
          id={helperTextId}
          type="caption"
          color={disabled ? 'default.extra.dormant' : 'default.main.secondary'}
          className="mt-xs"
        >
          {helperText}
        </Text>
      )}
    </div>
  );
});

CheckboxField.displayName = 'CheckboxField';

export { CheckboxField };

