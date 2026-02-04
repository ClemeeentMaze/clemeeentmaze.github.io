/**
 * @component Field
 * @description Form field wrapper with label, helper text, and error display.
 * 
 * @source maze-monorepo/packages/ariane/src/components/Field/Field.tsx
 */
import { forwardRef, useId } from 'react';
import { cn } from '../lib/utils';
import { Text } from './Text';
import { Flex } from './Flex';

/**
 * CSS styles for Field component
 */
const fieldStyles = `
  .ariane-field-root {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
  }
  .ariane-field-root fieldset& {
    border: none;
    padding: 0;
    margin: 0;
  }
  .ariane-field-label {
    font-family: 'Inter', system-ui, sans-serif;
    font-size: 16px;
    line-height: 24px;
    font-weight: 400;
    letter-spacing: -0.01em;
    color: #000000;
    display: inline-flex;
    align-items: flex-start;
    align-self: flex-start;
  }
  .ariane-field-label.disabled {
    color: #6C718C;
  }
  .ariane-field-label.as-legend {
    cursor: pointer;
  }
  .ariane-field-footer {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 8px;
  }
`;

/**
 * Field component - Ariane design system port
 * A form field wrapper with label, helper text, and character count
 * 
 * @param {object} props - Component props
 * @param {string} [props.id] - Label ID
 * @param {React.ReactNode} props.children - Field control (input, textarea, etc.)
 * @param {string} props.label - Field label text
 * @param {string} [props.controlId] - ID of the control for label's htmlFor
 * @param {string | React.ReactElement} [props.helperText] - Helper text below the field
 * @param {string} [props.helperTextId] - ID for the helper text
 * @param {number} [props.count] - Current character count
 * @param {number} [props.maxLength] - Maximum character length
 * @param {boolean} [props.required=false] - Whether field is required
 * @param {boolean} [props.disabled=false] - Whether field is disabled
 * @param {boolean} [props.asFieldSet=false] - Whether to render as fieldset with legend
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.Ref} ref - Forwarded ref
 */
const Field = forwardRef(function Field(
  {
    id,
    children,
    label,
    controlId,
    helperText,
    helperTextId: providedHelperTextId,
    count = 0,
    maxLength,
    required = false,
    disabled = false,
    asFieldSet = false,
    className,
    'aria-describedby': ariaDescribedBy,
    ...props
  },
  ref
) {
  const generatedHelperTextId = useId();
  const helperTextId = providedHelperTextId || generatedHelperTextId;
  
  const hasFooter = helperText || maxLength;
  
  // Component type based on asFieldSet prop
  const RootComponent = asFieldSet ? 'fieldset' : 'div';
  const LabelComponent = asFieldSet ? 'legend' : 'label';
  
  // Handle click on fieldset legend to focus first input
  const handleLabelClick = (event) => {
    if (!asFieldSet || disabled) return;
    
    const field = event.target.closest('fieldset');
    if (field) {
      const input = field.querySelector('input, textarea, select');
      input?.focus();
    }
  };

  return (
    <>
      <style>{fieldStyles}</style>
      <RootComponent
        ref={ref}
        className={cn('ariane-field-root', className)}
        aria-describedby={ariaDescribedBy}
        {...props}
      >
        <LabelComponent
          id={id}
          htmlFor={!asFieldSet ? controlId : undefined}
          onClick={asFieldSet ? handleLabelClick : undefined}
          className={cn(
            'ariane-field-label',
            disabled && 'disabled',
            asFieldSet && 'as-legend'
          )}
        >
          <Flex gap="2px">
            {label}
            {required && <span aria-hidden="true">*</span>}
          </Flex>
        </LabelComponent>
        
        {children}
        
        {hasFooter && (
          <div className="ariane-field-footer">
            {helperText ? (
              <Text type="caption" color="default.main.secondary" id={helperTextId}>
                {helperText}
              </Text>
            ) : (
              <div />
            )}
            {maxLength && (
              <Text type="caption">
                {count}/{maxLength}
              </Text>
            )}
          </div>
        )}
      </RootComponent>
    </>
  );
});

Field.displayName = 'Field';

export { Field };

