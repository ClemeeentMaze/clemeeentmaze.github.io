/**
 * @component TextAreaControl
 * @description Multiline text area input with validation states.
 * 
 * @source maze-monorepo/packages/ariane/src/components/TextArea/TextAreaControl.tsx
 * @styles maze-monorepo/packages/ariane/src/components/TextArea/TextAreaControl.styled.ts
 */
import { forwardRef, useId, useRef, useEffect } from 'react';
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
};

// Size configurations
const sizes = {
  MD: {
    inline: 16,
    block: 12,
    minHeight: 96,
  },
  SM: {
    inline: 12,
    block: 4,
    minHeight: 64,
  },
};

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
 * CSS styles for TextAreaControl
 */
const textAreaStyles = `
  .ariane-textarea-root {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
  }
  .ariane-textarea-root.full-height {
    height: 100%;
  }
  .ariane-textarea-wrapper {
    --border-radius: 8px;
    font-family: 'Inter', system-ui, sans-serif;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: -0.01em;
    display: flex;
    gap: 8px;
    border-radius: 8px;
    position: relative;
    transition-property: box-shadow;
    transition-duration: 250ms;
    background-color: #FFFFFF;
    color: #000000;
  }
  .ariane-textarea-wrapper.size-sm {
    font-size: 14px;
    line-height: 20px;
  }
  .ariane-textarea-wrapper.full-height {
    height: 100%;
  }
  /* Default state */
  .ariane-textarea-wrapper:not(.disabled):not(.readonly) {
    box-shadow: ${shadows.dormant};
  }
  /* Hover state */
  .ariane-textarea-wrapper:not(.disabled):not(.readonly):not(.error):hover:not(:focus-within) {
    box-shadow: ${shadows.awakeHovered};
  }
  /* Focus state */
  .ariane-textarea-wrapper:not(.disabled):focus-within {
    box-shadow: ${shadows.awakeFocused};
  }
  .ariane-textarea-wrapper:not(.disabled):focus-within::after {
    box-shadow: ${shadows.outline};
  }
  /* Focus outline pseudo element */
  .ariane-textarea-wrapper::after {
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
  .ariane-textarea-wrapper.error:not(.disabled):hover:not(:focus-within) {
    box-shadow: ${shadows.criticalHovered};
  }
  .ariane-textarea-wrapper.error:not(.disabled):focus-within {
    box-shadow: ${shadows.criticalFocused};
  }
  /* Readonly state */
  .ariane-textarea-wrapper.readonly {
    background-color: #F8F8FB;
    box-shadow: ${shadows.dormant};
    color: #535A74;
  }
  /* Disabled state */
  .ariane-textarea-wrapper.disabled {
    background-color: #F8F8FB;
    box-shadow: ${shadows.dormant};
    color: #6C718C;
  }
  /* Textarea element */
  .ariane-textarea-textarea {
    width: 100%;
    border: none;
    outline: none;
    background: transparent;
    font: inherit;
    color: inherit;
    border-radius: inherit;
    resize: vertical;
  }
  .ariane-textarea-textarea.no-resize {
    resize: none;
  }
  .ariane-textarea-textarea::placeholder {
    color: #6C718C;
  }
  .ariane-textarea-textarea:disabled {
    cursor: not-allowed;
  }
  /* Trailing icon area */
  .ariane-textarea-trailing {
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
 * TextAreaControl component - Ariane design system port
 * 
 * @param {object} props - Component props
 * @param {string} [props.id] - Textarea ID
 * @param {string} [props.name] - Form field name
 * @param {string} [props.value] - Controlled textarea value
 * @param {string} [props.defaultValue] - Default textarea value
 * @param {string} [props.placeholder] - Placeholder text
 * @param {string} [props.error] - Error message (also sets error state)
 * @param {boolean} [props.disabled=false] - Whether textarea is disabled
 * @param {boolean} [props.readOnly=false] - Whether textarea is read-only
 * @param {boolean} [props.required=false] - Whether textarea is required
 * @param {'MD' | 'SM'} [props.size='MD'] - Textarea size
 * @param {boolean} [props.fullHeight=false] - Whether textarea takes full height
 * @param {boolean} [props.autoGrow=false] - Whether textarea auto-grows with content
 * @param {boolean} [props.waiting=false] - Whether showing waiting indicator
 * @param {boolean} [props.draggable=false] - Whether textarea is draggable
 * @param {number} [props.rows] - Number of visible rows
 * @param {number} [props.maxLength] - Maximum character length
 * @param {function} [props.onChange] - Change handler
 * @param {function} [props.onFocus] - Focus handler
 * @param {function} [props.onBlur] - Blur handler
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.Ref} ref - Forwarded ref
 */
const TextAreaControl = forwardRef(function TextAreaControl(
  {
    id: providedId,
    name,
    value,
    defaultValue,
    placeholder,
    error,
    disabled = false,
    readOnly = false,
    required = false,
    size = 'MD',
    fullHeight = false,
    autoGrow = false,
    waiting = false,
    draggable = false,
    rows,
    maxLength,
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
  const hasTrailingIcon = Boolean((readOnly || disabled) && !waiting);
  
  const sizeConfig = sizes[size];
  const padding = `${sizeConfig.block}px ${sizeConfig.inline}px`;
  const paddingRight = hasTrailingIcon 
    ? `${sizeConfig.inline + 8 + 16}px` 
    : `${sizeConfig.inline}px`;

  // Build aria-describedby
  const describedBy = [
    hasError ? errorId : null,
    ariaDescribedBy,
  ].filter(Boolean).join(' ') || undefined;

  // Auto-grow functionality
  const textareaRef = useRef(null);
  
  useEffect(() => {
    if (autoGrow && textareaRef.current) {
      const textarea = textareaRef.current;
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [value, autoGrow]);

  const handleChange = (e) => {
    if (autoGrow && textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
    onChange?.(e);
  };

  // Combine refs
  const setRef = (node) => {
    textareaRef.current = node;
    if (typeof ref === 'function') {
      ref(node);
    } else if (ref) {
      ref.current = node;
    }
  };

  return (
    <>
      <style>{textAreaStyles}</style>
      <div 
        className={cn(
          'ariane-textarea-root',
          fullHeight && 'full-height',
          className
        )}
      >
        <div 
          className={cn(
            'ariane-textarea-wrapper',
            size === 'SM' && 'size-sm',
            hasError && 'error',
            disabled && 'disabled',
            readOnly && 'readonly',
            fullHeight && 'full-height'
          )}
        >
          <textarea
            ref={setRef}
            id={id}
            name={name}
            value={value}
            defaultValue={defaultValue}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readOnly}
            required={required}
            rows={rows}
            maxLength={maxLength}
            aria-describedby={describedBy}
            aria-invalid={hasError}
            onChange={handleChange}
            onFocus={onFocus}
            onBlur={onBlur}
            className={cn(
              'ariane-textarea-textarea',
              fullHeight && 'no-resize'
            )}
            style={{
              padding,
              paddingRight,
              minHeight: fullHeight ? '100%' : `${sizeConfig.minHeight}px`,
            }}
            {...props}
          />
          {hasTrailingIcon && (
            <div 
              className="ariane-textarea-trailing"
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

TextAreaControl.displayName = 'TextAreaControl';

export { TextAreaControl };

