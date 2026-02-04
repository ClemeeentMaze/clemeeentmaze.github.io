/**
 * @component VisuallyHidden
 * @description Visually hides content while keeping it accessible to screen readers.
 * 
 * @source maze-monorepo/packages/ariane/src/components/VisuallyHidden/VisuallyHidden.tsx
 */
import { forwardRef } from 'react';

/**
 * VisuallyHidden component - Ariane design system port
 * Visually hides content while keeping it accessible to screen readers
 * 
 * @param {object} props - Component props
 * @param {React.ReactNode} props.children - Hidden content
 * @param {string} [props.id] - Element ID
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.Ref} ref - Forwarded ref
 */
const VisuallyHidden = forwardRef(function VisuallyHidden(
  { children, id, className, ...props },
  ref
) {
  return (
    <span
      ref={ref}
      id={id}
      className={className}
      style={{
        position: 'absolute',
        width: '1px',
        height: '1px',
        padding: 0,
        margin: '-1px',
        overflow: 'hidden',
        clip: 'rect(0, 0, 0, 0)',
        whiteSpace: 'nowrap',
        border: 0,
      }}
      {...props}
    >
      {children}
    </span>
  );
});

VisuallyHidden.displayName = 'VisuallyHidden';

export { VisuallyHidden };

