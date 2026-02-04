/**
 * @component ErrorText
 * @description Error message component with icon for form validation feedback.
 * 
 * @source maze-monorepo/packages/ariane/src/components/ErrorText/ErrorText.tsx
 */
import { forwardRef } from 'react';
import { cn } from '../lib/utils';

/**
 * Cross octagon icon for error messages
 */
const CrossOctagonIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.94 1H11.06L15 4.94V11.06L11.06 15H4.94L1 11.06V4.94L4.94 1ZM5.41 2.5L2.5 5.41V10.59L5.41 13.5H10.59L13.5 10.59V5.41L10.59 2.5H5.41Z"
      fill="#CC3F4D"
    />
    <path
      d="M5.46 5.46C5.17 5.75 5.17 6.22 5.46 6.52L6.94 8L5.46 9.48C5.17 9.77 5.17 10.25 5.46 10.54C5.75 10.83 6.23 10.83 6.52 10.54L8 9.06L9.48 10.54C9.77 10.83 10.25 10.83 10.54 10.54C10.83 10.25 10.83 9.77 10.54 9.48L9.06 8L10.54 6.52C10.83 6.23 10.83 5.75 10.54 5.46C10.25 5.17 9.77 5.17 9.48 5.46L8 6.94L6.52 5.46C6.23 5.17 5.75 5.17 5.46 5.46Z"
      fill="#CC3F4D"
    />
  </svg>
);

/**
 * ErrorText component - Ariane design system port
 * Displays error messages with an icon
 * 
 * @param {object} props - Component props
 * @param {string} props.children - Error message text
 * @param {string} props.id - Unique ID for accessibility (aria-describedby)
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.Ref} ref - Forwarded ref
 */
const ErrorText = forwardRef(function ErrorText(
  {
    children,
    id,
    className,
    ...props
  },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn(
        'flex items-start gap-[4px]',
        className
      )}
      {...props}
    >
      {/* Icon container */}
      <div className="flex items-center h-[20px] flex-shrink-0">
        <CrossOctagonIcon />
      </div>
      {/* Error message */}
      <span
        id={id}
        className="text-[14px] leading-[20px] font-normal tracking-[-0.01em]"
        style={{ color: '#CC3F4D' }} // critical color
      >
        {children}
      </span>
    </div>
  );
});

ErrorText.displayName = 'ErrorText';

export { ErrorText };

