/**
 * @component SegmentControl
 * @description Segmented button control for selecting between options.
 * 
 * @source maze-monorepo/packages/ariane/src/components/SegmentControl/SegmentControl.tsx
 * @styles maze-monorepo/packages/ariane/src/components/SegmentControl/SegmentControl.styled.ts
 */
import { forwardRef, useState } from 'react';

/**
 * Find continuous index for keyboard navigation
 */
const findContinuousIndex = (direction, array, predicate) => {
  const currentIndex = array.findIndex(predicate);
  
  if (direction === 'previous') {
    return currentIndex <= 0 ? array.length - 1 : currentIndex - 1;
  }
  
  return currentIndex >= array.length - 1 ? 0 : currentIndex + 1;
};

/**
 * Color tokens from Ariane
 */
const colors = {
  neutral000: '#FFFFFF',
  neutral300: '#CDCEDD',
  neutral500: '#6C718C',
  blue100: '#F0FAFF',
  blue200: '#CEEEFF',
  blue500: '#0568FD',
  blue800: '#012577',
};

/**
 * Size configurations matching CTAButton heights
 * MD: 48px total, SM: 32px total
 */
const sizeConfig = {
  MD: {
    fontSize: '16px',
    lineHeight: '24px',
    padding: '11px 16px', // 1 + 11 + 24 + 11 + 1 = 48px
  },
  SM: {
    fontSize: '14px',
    lineHeight: '20px',
    padding: '5px 12px', // 1 + 5 + 20 + 5 + 1 = 32px
  },
};

/**
 * Get container styles
 */
const getContainerStyle = (fullWidth) => ({
  display: fullWidth ? 'flex' : 'inline-flex',
  flexDirection: 'row',
  alignItems: 'stretch',
  borderRadius: '8px',
  border: `1px solid ${colors.neutral300}`,
  backgroundColor: colors.neutral000,
  padding: '2px',
  gap: 0,
  width: fullWidth ? '100%' : undefined,
});

/**
 * Get option button styles
 */
const getOptionStyle = (size, isSelected, isDisabled, fullWidth, customWidth) => {
  const sizeStyles = sizeConfig[size] || sizeConfig.MD;
  
  return {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "'Inter', system-ui, sans-serif",
    fontWeight: 700,
    fontSize: sizeStyles.fontSize,
    lineHeight: sizeStyles.lineHeight,
    padding: sizeStyles.padding,
    color: isSelected ? colors.blue800 : colors.neutral500,
    backgroundColor: isSelected ? colors.blue100 : 'transparent',
    border: `1px solid ${isSelected ? colors.blue500 : 'transparent'}`,
    borderRadius: '6px',
    cursor: isDisabled ? 'not-allowed' : (isSelected ? 'default' : 'pointer'),
    transition: 'all 150ms ease',
    whiteSpace: 'nowrap',
    textAlign: 'center',
    margin: 0,
    flexShrink: 0,
    flex: fullWidth ? '1 1 0%' : undefined,
    width: customWidth,
    opacity: isDisabled ? 0.5 : 1,
    boxSizing: 'border-box',
  };
};

/**
 * SegmentControl component - Ariane design system port
 * A segmented button group that acts like radio buttons
 * 
 * @param {object} props - Component props
 * @param {Array<{id: string, label: string, width?: string}>} props.options - Available options
 * @param {string} [props.selected] - Currently selected option ID
 * @param {function} props.onChange - Called when selection changes (id, option) => void
 * @param {'SM' | 'MD'} [props.size='MD'] - Size variant (SM = compact, MD = medium)
 * @param {boolean} [props.disabled=false] - Whether all options are disabled
 * @param {boolean} [props.fullWidth=false] - Whether to take full width
 * @param {string} [props['aria-label']] - ARIA label for the group
 * @param {string} [props['aria-labelledby']] - ARIA labelledby reference
 * @param {string} [props['aria-describedby']] - ARIA describedby reference
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.Ref} ref - Forwarded ref
 */
const SegmentControl = forwardRef(function SegmentControl(
  {
    options,
    selected = '',
    onChange,
    size = 'MD',
    disabled = false,
    fullWidth = false,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    'aria-describedby': ariaDescribedBy,
    className,
    ...props
  },
  ref
) {
  const [focus, setFocus] = useState(false);

  const handleOptionClick = (option) => {
    if (!disabled) {
      onChange(option.id, option);
    }
  };

  const handleFocus = () => setFocus(true);
  const handleBlur = () => setFocus(false);

  const handleKeyDown = (event) => {
    const target = event.target;
    const buttonList = target.parentElement?.querySelectorAll('button');
    if (!buttonList) return;

    const buttonArray = Array.from(buttonList);

    switch (event.key) {
      case 'ArrowUp':
      case 'ArrowLeft': {
        event.preventDefault();
        const previousIndex = selected
          ? findContinuousIndex('previous', options, option => option.id === selected)
          : findContinuousIndex('previous', buttonArray, item => item === target);

        const previousOption = options[previousIndex];
        buttonArray[previousIndex]?.focus();
        onChange(previousOption.id, previousOption);
        break;
      }

      case 'ArrowDown':
      case 'ArrowRight': {
        event.preventDefault();
        const nextIndex = selected
          ? findContinuousIndex('next', options, option => option.id === selected)
          : findContinuousIndex('next', buttonArray, item => item === target);

        const nextOption = options[nextIndex];
        buttonArray[nextIndex]?.focus();
        onChange(nextOption.id, nextOption);
        break;
      }

      default:
        break;
    }
  };

  if (options.length === 0) return null;

  return (
    <div
      ref={ref}
      role="radiogroup"
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      aria-describedby={ariaDescribedBy}
      onKeyDown={handleKeyDown}
      onFocus={handleFocus}
      onBlur={handleBlur}
      className={className}
      style={getContainerStyle(fullWidth)}
      {...props}
    >
      {options.map((option) => {
        const isSelected = selected === option.id;
        return (
          <button
            key={option.id}
            type="button"
            role="radio"
            aria-checked={isSelected}
            disabled={disabled}
            tabIndex={isSelected || (!selected && !focus) ? 0 : -1}
            onClick={() => handleOptionClick(option)}
            style={getOptionStyle(size, isSelected, disabled, fullWidth, option.width)}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
});

SegmentControl.displayName = 'SegmentControl';

export { SegmentControl };
