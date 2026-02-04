/**
 * @component TextInputControl
 * @description Text input field with validation states and icons.
 * 
 * @source maze-monorepo/packages/ariane/src/components/TextInput/TextInputControl.tsx
 * @styles maze-monorepo/packages/ariane/src/components/TextInput/TextInputControl.styled.ts
 */
import { forwardRef, useId } from 'react';
import { cn } from '../lib/utils';
import { ErrorText } from './ErrorText';

// Shadow tokens (MD size)
const shadows = {
  dormant: '0px 1px 2px rgba(108, 113, 140, 0.08), inset 0px 0px 0px 0.5px rgba(108, 113, 140, 0.28)',
  awakeFocused: 'inset 0px 0px 0px 1px rgba(5, 104, 253, 0.28)',
  awakeHovered: '0px 1px 2px rgba(5, 104, 253, 0.08), inset 0px 0px 0px 1px rgba(5, 104, 253, 0.28)',
  criticalFocused: 'inset 0px 0px 0px 1px rgba(204, 63, 77, 0.28)',
  criticalHovered: '0px 1px 2px rgba(204, 63, 77, 0.08), inset 0px 0px 0px 1px rgba(204, 63, 77, 0.28)',
  outline: '0px 0px 0px 2px #034FD6',
  divider: 'inset 0px 0px 0px 0.5px rgba(108, 113, 140, 0.28)',
};

// Size configurations
const sizes = {
  MD: {
    inline: 16,
    block: 12,
    iconPadding: 11,
    minHeight: 48,
  },
  SM: {
    inline: 12,
    block: 4,
    iconPadding: 2,
    minHeight: 32,
  },
};

const TEXT_INPUT_ICON_SIZE = 16;

/**
 * Lock icon for disabled/readonly states
 */
const LockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 6H11V4.5C11 2.57 9.43 1 7.5 1C5.57 1 4 2.57 4 4.5V6H3C2.45 6 2 6.45 2 7V14C2 14.55 2.45 15 3 15H12C12.55 15 13 14.55 13 14V7C13 6.45 12.55 6 12 6ZM5.5 4.5C5.5 3.4 6.4 2.5 7.5 2.5C8.6 2.5 9.5 3.4 9.5 4.5V6H5.5V4.5Z"
      fill="#6C718C"
    />
  </svg>
);

/**
 * CSS styles for TextInputControl
 */
const textInputStyles = `
  .ariane-text-input-root {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
  }
  .ariane-text-input-root.type-number {
    min-width: 64px;
  }
  .ariane-text-input-root:not(.type-number) {
    min-width: 120px;
  }
  .ariane-text-input-wrapper {
    --border-radius: 8px;
    font-family: 'Inter', system-ui, sans-serif;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: -0.01em;
    display: flex;
    gap: 8px;
    align-items: center;
    border-radius: 8px;
    position: relative;
    transition-property: box-shadow;
    transition-duration: 250ms;
    background-color: #FFFFFF;
    color: #000000;
  }
  .ariane-text-input-wrapper.size-sm {
    font-size: 14px;
    line-height: 20px;
  }
  /* Default state */
  .ariane-text-input-wrapper:not(.disabled):not(.readonly) {
    box-shadow: ${shadows.dormant};
  }
  /* Hover state */
  .ariane-text-input-wrapper:not(.disabled):not(.readonly):not(.error):hover:not(:focus-within) {
    box-shadow: ${shadows.awakeHovered};
  }
  /* Focus state */
  .ariane-text-input-wrapper:not(.disabled):focus-within {
    box-shadow: ${shadows.awakeFocused};
  }
  .ariane-text-input-wrapper:not(.disabled):focus-within::after {
    box-shadow: ${shadows.outline};
  }
  /* Focus outline pseudo element */
  .ariane-text-input-wrapper::after {
    content: '';
    --outline-offset: 2px;
    position: absolute;
    z-index: 2;
    box-shadow: 0px 0px 0px 2px transparent;
    border-radius: calc(var(--border-radius) + var(--outline-offset));
    inset: calc(var(--outline-offset) * -1);
    pointer-events: none;
    transition-property: box-shadow;
    transition-duration: 250ms;
  }
  /* Error state */
  .ariane-text-input-wrapper.error:not(.disabled):hover:not(:focus-within) {
    box-shadow: ${shadows.criticalHovered};
  }
  .ariane-text-input-wrapper.error:not(.disabled):focus-within {
    box-shadow: ${shadows.criticalFocused};
  }
  /* Readonly state */
  .ariane-text-input-wrapper.readonly {
    background-color: #F8F8FB;
    box-shadow: ${shadows.dormant};
    color: #535A74;
  }
  /* Disabled state */
  .ariane-text-input-wrapper.disabled {
    background-color: #F8F8FB;
    box-shadow: ${shadows.dormant};
    color: #6C718C;
  }
  /* Input element */
  .ariane-text-input-input {
    width: 100%;
    border: none;
    outline: none;
    background: transparent;
    font: inherit;
    color: inherit;
    border-radius: inherit;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .ariane-text-input-input::placeholder {
    color: #6C718C;
  }
  .ariane-text-input-input:disabled {
    cursor: not-allowed;
  }
  /* Trailing icon area */
  .ariane-text-input-trailing {
    position: absolute;
    top: 0;
    right: 0;
    border-radius: inherit;
    pointer-events: none;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

/**
 * TextInputControl component - Ariane design system port
 * 
 * @param {object} props - Component props
 * @param {string} [props.id] - Input ID
 * @param {string} [props.name] - Form field name
 * @param {string} [props.value] - Controlled input value
 * @param {string} [props.defaultValue] - Default input value
 * @param {string} [props.placeholder] - Placeholder text
 * @param {string} [props.type='text'] - Input type (text, email, password, number, etc.)
 * @param {string} [props.error] - Error message (also sets error state)
 * @param {boolean} [props.disabled=false] - Whether input is disabled
 * @param {boolean} [props.readOnly=false] - Whether input is read-only
 * @param {boolean} [props.required=false] - Whether input is required
 * @param {'MD' | 'SM'} [props.size='MD'] - Input size
 * @param {string} [props.trailingIcon] - Trailing icon name or config
 * @param {string} [props.leadingIcon] - Leading icon (single letter A-Z)
 * @param {boolean} [props.draggable=false] - Whether input is draggable
 * @param {function} [props.onChange] - Change handler
 * @param {function} [props.onFocus] - Focus handler
 * @param {function} [props.onBlur] - Blur handler
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.Ref} ref - Forwarded ref
 */
const TextInputControl = forwardRef(function TextInputControl(
  {
    id: providedId,
    name,
    value,
    defaultValue,
    placeholder,
    type = 'text',
    error,
    disabled = false,
    readOnly = false,
    required = false,
    size = 'MD',
    trailingIcon,
    leadingIcon,
    draggable = false,
    onChange,
    onFocus,
    onBlur,
    className,
    'aria-describedby': ariaDescribedBy,
    ...props
  },
  ref
) {
  const generatedId = useId();
  const id = providedId || generatedId;
  const errorId = `${id}-error`;
  const hasError = Boolean(error);
  const hasTrailingIcon = Boolean(readOnly || disabled || trailingIcon);
  
  const sizeConfig = sizes[size];
  const padding = `${sizeConfig.block}px ${sizeConfig.inline}px`;
  const paddingRight = hasTrailingIcon 
    ? `${sizeConfig.inline + 8 + TEXT_INPUT_ICON_SIZE}px` 
    : `${sizeConfig.inline}px`;

  // Build aria-describedby
  const describedBy = [
    hasError ? errorId : null,
    ariaDescribedBy,
  ].filter(Boolean).join(' ') || undefined;

  return (
    <>
      <style>{textInputStyles}</style>
      <div 
        className={cn(
          'ariane-text-input-root',
          type === 'number' && 'type-number',
          className
        )}
      >
        <div 
          className={cn(
            'ariane-text-input-wrapper',
            size === 'SM' && 'size-sm',
            hasError && 'error',
            disabled && 'disabled',
            readOnly && 'readonly'
          )}
        >
          <input
            ref={ref}
            id={id}
            name={name}
            type={type}
            value={value}
            defaultValue={defaultValue}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readOnly}
            required={required}
            aria-describedby={describedBy}
            aria-invalid={hasError}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            className="ariane-text-input-input"
            style={{
              padding,
              paddingRight,
              minHeight: `${sizeConfig.minHeight}px`,
            }}
            {...props}
          />
          {hasTrailingIcon && (
            <div 
              className="ariane-text-input-trailing"
              style={{
                padding: `${sizeConfig.block}px ${sizeConfig.inline}px`,
              }}
            >
              <LockIcon />
            </div>
          )}
        </div>
        {hasError && <ErrorText id={errorId}>{error}</ErrorText>}
      </div>
    </>
  );
});

TextInputControl.displayName = 'TextInputControl';

export { TextInputControl };

