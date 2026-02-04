/**
 * @component Select
 * @description Select dropdown component using Radix UI primitives.
 * 
 * @source maze-monorepo/packages/ariane/src/components/Select/Select.tsx
 * @styles maze-monorepo/packages/ariane/src/components/Select/SelectControl.styled.ts
 */
import { forwardRef } from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { cn } from '../lib/utils';

// Size configurations
const sizes = {
  MD: {
    padding: '12px 16px',
    fontSize: '16px',
    lineHeight: '24px',
    minHeight: '48px',
  },
  SM: {
    padding: '4px 12px',
    fontSize: '14px',
    lineHeight: '20px',
    minHeight: '32px',
  },
};

// Shadow tokens
const shadows = {
  dormant: '0px 1px 2px rgba(108, 113, 140, 0.08), inset 0px 0px 0px 0.5px rgba(108, 113, 140, 0.28)',
  awakeFocused: 'inset 0px 0px 0px 1px rgba(5, 104, 253, 0.28)',
  awakeHovered: '0px 1px 2px rgba(5, 104, 253, 0.08), inset 0px 0px 0px 1px rgba(5, 104, 253, 0.28)',
  outline: '0px 0px 0px 2px #034FD6',
  panel: 'inset 0px 0px 0px 0.5px rgba(108, 113, 140, 0.28), 0px 1px 2px 0px rgba(108, 113, 140, 0.08), 0px 2px 8px 0px rgba(108, 113, 140, 0.08), 0px 4px 48px 0px rgba(108, 113, 140, 0.08)',
};

/**
 * Chevron icon for select
 */
const ChevronIcon = ({ className }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M4 6L8 10L12 6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * Check icon for selected item
 */
const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M13.5 4.5L6.5 11.5L2.5 7.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * CSS styles for Select
 */
const selectStyles = `
  .ariane-select-trigger {
    font-family: 'Inter', system-ui, sans-serif;
    letter-spacing: -0.01em;
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    border-radius: 8px;
    background-color: #FFFFFF;
    color: #000000;
    cursor: pointer;
    transition: box-shadow 150ms;
    position: relative;
    width: 100%;
  }
  .ariane-select-trigger:hover:not(:disabled):not(:focus) {
    box-shadow: ${shadows.awakeHovered};
  }
  .ariane-select-trigger:focus {
    outline: none;
    box-shadow: ${shadows.awakeFocused};
  }
  .ariane-select-trigger:focus::after {
    box-shadow: ${shadows.outline};
  }
  .ariane-select-trigger::after {
    content: '';
    position: absolute;
    z-index: 2;
    box-shadow: 0px 0px 0px 2px transparent;
    border-radius: calc(8px + 2px);
    inset: -2px;
    pointer-events: none;
    transition: box-shadow 250ms;
  }
  .ariane-select-trigger:disabled {
    background-color: #F8F8FB;
    color: #6C718C;
    cursor: not-allowed;
  }
  .ariane-select-trigger[data-placeholder] {
    color: #6C718C;
  }
  .ariane-select-content {
    background-color: #FFFFFF;
    border-radius: 8px;
    padding: 8px 0;
    box-shadow: ${shadows.panel};
    z-index: 9999999;
    animation: selectFadeIn 150ms ease-out;
    overflow: hidden;
  }
  .ariane-select-content.scrollable {
    max-height: var(--radix-select-content-available-height);
    overflow-y: auto;
  }
  @keyframes selectFadeIn {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
  }
  .ariane-select-item {
    font-family: 'Inter', system-ui, sans-serif;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: -0.01em;
    color: #000000;
    padding: 8px 16px;
    padding-left: 32px;
    display: flex;
    align-items: center;
    position: relative;
    cursor: pointer;
    outline: none;
    user-select: none;
    transition: background-color 150ms;
  }
  .ariane-select-item:hover,
  .ariane-select-item[data-highlighted] {
    background-color: #F8F8FB;
  }
  .ariane-select-item[data-disabled] {
    color: #9597B0;
    cursor: not-allowed;
    pointer-events: none;
  }
  .ariane-select-item-indicator {
    position: absolute;
    left: 8px;
    width: 16px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: #0568FD;
  }
  .ariane-select-separator {
    height: 1px;
    background-color: rgba(108, 113, 140, 0.28);
    margin: 8px 0;
  }
  .ariane-select-label {
    font-family: 'Inter', system-ui, sans-serif;
    font-size: 12px;
    line-height: 16px;
    font-weight: 600;
    color: #6C718C;
    padding: 8px 16px 4px;
  }
  .ariane-select-icon {
    color: #6C718C;
    transition: transform 200ms;
  }
  .ariane-select-trigger[data-state="open"] .ariane-select-icon {
    transform: rotate(180deg);
  }
`;

/**
 * Select component - Ariane design system port
 * A select dropdown using Radix UI Select primitive
 */

const Select = SelectPrimitive.Root;
const SelectGroup = SelectPrimitive.Group;
const SelectValue = SelectPrimitive.Value;

/**
 * SelectTrigger
 */
const SelectTrigger = forwardRef(function SelectTrigger(
  {
    className,
    children,
    size = 'MD',
    ...props
  },
  ref
) {
  const sizeConfig = sizes[size] || sizes.MD;

  return (
    <>
      <style>{selectStyles}</style>
      <SelectPrimitive.Trigger
        ref={ref}
        className={cn('ariane-select-trigger', className)}
        style={{
          padding: sizeConfig.padding,
          fontSize: sizeConfig.fontSize,
          lineHeight: sizeConfig.lineHeight,
          minHeight: sizeConfig.minHeight,
          boxShadow: shadows.dormant,
        }}
        {...props}
      >
        {children}
        <SelectPrimitive.Icon className="ariane-select-icon">
          <ChevronIcon />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
    </>
  );
});

/**
 * SelectContent
 */
const SelectContent = forwardRef(function SelectContent(
  {
    className,
    children,
    position = 'popper',
    sideOffset = 8,
    maxHeight,
    ...props
  },
  ref
) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        ref={ref}
        position={position}
        sideOffset={sideOffset}
        className={cn(
          'ariane-select-content',
          maxHeight && 'scrollable',
          className
        )}
        style={{
          maxHeight: maxHeight || undefined,
          width: 'var(--radix-select-trigger-width)',
        }}
        {...props}
      >
        <SelectPrimitive.Viewport>
          {children}
        </SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
});

/**
 * SelectItem
 */
const SelectItem = forwardRef(function SelectItem(
  { className, children, ...props },
  ref
) {
  return (
    <SelectPrimitive.Item
      ref={ref}
      className={cn('ariane-select-item', className)}
      {...props}
    >
      <span className="ariane-select-item-indicator">
        <SelectPrimitive.ItemIndicator>
          <CheckIcon />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
});

/**
 * SelectSeparator
 */
const SelectSeparator = forwardRef(function SelectSeparator(
  { className, ...props },
  ref
) {
  return (
    <SelectPrimitive.Separator
      ref={ref}
      className={cn('ariane-select-separator', className)}
      {...props}
    />
  );
});

/**
 * SelectLabel
 */
const SelectLabel = forwardRef(function SelectLabel(
  { className, ...props },
  ref
) {
  return (
    <SelectPrimitive.Label
      ref={ref}
      className={cn('ariane-select-label', className)}
      {...props}
    />
  );
});

/**
 * Simple Select wrapper (Ariane-compatible API)
 * 
 * @param {object} props - Component props
 * @param {Array<{value: string, label: string}>} props.options - Select options
 * @param {string} [props.value] - Controlled value
 * @param {string} [props.defaultValue] - Default value
 * @param {function} [props.onChange] - Called when value changes
 * @param {string} [props.placeholder='Select...'] - Placeholder text
 * @param {'MD' | 'SM'} [props.size='MD'] - Select size
 * @param {boolean} [props.disabled=false] - Whether select is disabled
 * @param {string} [props.name] - Form field name
 * @param {number} [props.maxHeight] - Maximum dropdown height
 */
const SimpleSelect = forwardRef(function SimpleSelect(
  {
    options = [],
    value,
    defaultValue,
    onChange,
    placeholder = 'Select...',
    size = 'MD',
    disabled = false,
    name,
    maxHeight,
    className,
    ...props
  },
  ref
) {
  return (
    <Select
      value={value}
      defaultValue={defaultValue}
      onValueChange={onChange}
      disabled={disabled}
      name={name}
    >
      <SelectTrigger ref={ref} size={size} className={className} {...props}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent maxHeight={maxHeight}>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
});

SelectTrigger.displayName = 'SelectTrigger';
SelectContent.displayName = 'SelectContent';
SelectItem.displayName = 'SelectItem';
SelectSeparator.displayName = 'SelectSeparator';
SelectLabel.displayName = 'SelectLabel';
SimpleSelect.displayName = 'SimpleSelect';

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectLabel,
  SimpleSelect,
};

