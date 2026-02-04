/**
 * @component SearchControl
 * @description Search input field with clear button and disabled state.
 * 
 * @source maze-monorepo/packages/ariane/src/components/SearchControl/SearchControl.tsx
 * @styles maze-monorepo/packages/ariane/src/components/SearchControl/SearchControl.styled.ts
 */
import { forwardRef, useState, useEffect, useRef } from 'react';
import { cn } from '../lib/utils';

/**
 * Search icon component
 */
const SearchIcon = ({ size = 16, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <circle cx="7" cy="7" r="5.25" stroke="currentColor" strokeWidth="1.5" />
    <path d="M11 11L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/**
 * Cross/clear icon component
 */
const CrossIcon = ({ size = 16, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/**
 * Lock icon component
 */
const LockIcon = ({ size = 16, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <rect x="3" y="7" width="10" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M5 7V5C5 3.34315 6.34315 2 8 2C9.65685 2 11 3.34315 11 5V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/**
 * Size configurations
 */
const sizes = {
  MD: {
    input: 'py-3 px-4 text-[16px] leading-[24px]',
    iconPadding: 'pl-[40px]', // 16px padding + 8px gap + 16px icon
    iconPaddingRight: 'pr-[40px]',
    leadingArea: 'p-[16px] pr-2',
    trailingArea: 'p-[16px] pl-2',
  },
  SM: {
    input: 'py-1 px-3 text-[14px] leading-[20px]',
    iconPadding: 'pl-[36px]', // 12px padding + 8px gap + 16px icon
    iconPaddingRight: 'pr-[36px]',
    leadingArea: 'p-[8px] pr-2',
    trailingArea: 'p-[8px] pl-2',
  },
};

/**
 * SearchControl component - Search input with clear button
 * 
 * A search input field with:
 * - Leading search icon
 * - Optional clear button
 * - Disabled state with lock icon
 * 
 * @param {object} props - Component props
 * @param {boolean} [props.clearable=false] - Whether to show clear button when there's value
 * @param {'MD' | 'SM'} [props.size='MD'] - Input size
 * @param {boolean} [props.disabled=false] - Whether input is disabled
 * @param {string} [props.value] - Controlled input value
 * @param {string} [props.defaultValue] - Default input value
 * @param {function} [props.onChange] - Change handler
 * @param {string} [props.placeholder] - Placeholder text
 * @param {string} [props.id] - Input ID
 */
const SearchControl = forwardRef(function SearchControl(
  {
    clearable = false,
    size = 'MD',
    disabled = false,
    id,
    value: controlledValue,
    defaultValue,
    onChange,
    placeholder = 'Search...',
    className,
    'aria-describedby': ariaDescribedBy,
    ...props
  },
  ref
) {
  const [internalValue, setInternalValue] = useState(controlledValue || defaultValue || '');
  const wrapperRef = useRef(null);
  const inputRef = useRef(null);

  // Sync with controlled value
  useEffect(() => {
    if (controlledValue !== undefined) {
      setInternalValue(controlledValue);
    }
  }, [controlledValue]);

  const value = controlledValue !== undefined ? controlledValue : internalValue;

  const handleChange = (event) => {
    const newValue = event.target.value;
    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }
    onChange?.(event);
  };

  const handleClear = () => {
    const syntheticEvent = {
      target: { value: '' },
      currentTarget: { value: '' },
    };
    if (controlledValue === undefined) {
      setInternalValue('');
    }
    onChange?.(syntheticEvent);
    inputRef.current?.focus();
  };

  const sizeConfig = sizes[size];
  const hasTrailingIcon = clearable || disabled;

  return (
    <div
      ref={wrapperRef}
      className={cn(
        'flex flex-col gap-2 w-full min-w-[120px]',
        className
      )}
    >
      <div
        className={cn(
          // Base styles
          'relative flex items-center gap-2 rounded-[8px]',
          'text-[16px] leading-[24px]',
          'transition-shadow duration-250',
          'bg-white text-black',
          // Default shadow
          'shadow-[inset_0px_0px_0px_0.5px_rgba(108,113,140,0.28)]',
          // Hover (when not focused or disabled)
          !disabled && 'hover:shadow-[inset_0px_0px_0px_0.5px_rgba(5,104,253,0.4)]',
          // Focus within
          'focus-within:shadow-[inset_0px_0px_0px_1px_rgba(5,104,253,0.6)]',
          // Disabled
          disabled && 'bg-neutral-100 text-neutral-400 shadow-[inset_0px_0px_0px_0.5px_rgba(108,113,140,0.28)]',
        )}
      >
        {/* Leading search icon */}
        <div
          className={cn(
            'absolute top-0 left-0 flex items-center',
            sizeConfig.leadingArea,
            'text-neutral-500'
          )}
        >
          <SearchIcon size={16} />
        </div>

        {/* Input */}
        <input
          ref={(node) => {
            inputRef.current = node;
            if (typeof ref === 'function') {
              ref(node);
            } else if (ref) {
              ref.current = node;
            }
          }}
          type="search"
          id={id}
          disabled={disabled}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          aria-describedby={ariaDescribedBy}
          className={cn(
            'w-full rounded-[8px] bg-transparent outline-none',
            'overflow-hidden whitespace-nowrap text-ellipsis',
            'placeholder:text-neutral-400',
            sizeConfig.input,
            sizeConfig.iconPadding,
            hasTrailingIcon && sizeConfig.iconPaddingRight,
            // Remove default search input styles
            '[&::-webkit-search-cancel-button]:hidden',
            '[&::-webkit-search-decoration]:hidden',
          )}
          {...props}
        />

        {/* Trailing area - Lock or Clear button */}
        {disabled ? (
          <div
            className={cn(
              'absolute top-0 right-0 flex items-center',
              sizeConfig.trailingArea,
              'text-neutral-400'
            )}
          >
            <LockIcon size={16} />
          </div>
        ) : clearable && value ? (
          <button
            type="button"
            onClick={handleClear}
            className={cn(
              'absolute top-0 right-0 flex items-center cursor-pointer',
              sizeConfig.trailingArea,
              'text-neutral-500 hover:text-neutral-700',
              'bg-transparent border-none'
            )}
            aria-label="Clear search"
            data-testid="search-control-clear-button"
          >
            <CrossIcon size={16} />
          </button>
        ) : null}
      </div>
    </div>
  );
});

SearchControl.displayName = 'SearchControl';

export { SearchControl };

