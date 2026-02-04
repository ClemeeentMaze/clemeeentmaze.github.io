/**
 * @component Tag
 * @description Small label/tag element for categorization or status.
 * 
 * @source maze-monorepo/packages/ariane/src/components/Tag/Tag.tsx
 */
import { forwardRef } from 'react';
import { cn } from '../lib/utils';

/**
 * Tag component - Ariane design system port
 * A small label/tag element
 * 
 * @param {object} props - Component props
 * @param {React.ReactNode} props.children - Tag content
 * @param {string} [props.bg='#F8F8FB'] - Background color (neutral100)
 * @param {string} [props.color='#9597B0'] - Text color (neutral400)
 * @param {string} [props.height='24px'] - Tag height
 * @param {string} [props.lineHeight='24px'] - Line height
 * @param {string} [props.maxWidth='unset'] - Maximum width
 * @param {string} [props.fontSize='10px'] - Font size
 * @param {number} [props.fontWeight=700] - Font weight
 * @param {boolean} [props.uppercase=true] - Whether to uppercase text
 * @param {string} [props.borderRadius='8px'] - Border radius
 * @param {string} [props.textAlign='center'] - Text alignment
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.Ref} ref - Forwarded ref
 */
const Tag = forwardRef(function Tag(
  {
    children,
    bg = '#F8F8FB', // neutral100
    color = '#9597B0', // neutral400
    height = '24px',
    lineHeight = '24px',
    maxWidth = 'unset',
    fontSize = '10px',
    fontWeight = 700,
    uppercase = true,
    borderRadius = '8px',
    textAlign = 'center',
    className,
    ...props
  },
  ref
) {
  return (
    <span
      ref={ref}
      className={cn(
        'inline-block px-sm',
        uppercase && 'uppercase',
        className
      )}
      style={{
        backgroundColor: bg,
        color,
        height,
        lineHeight,
        maxWidth,
        fontSize,
        fontWeight,
        borderRadius,
        textAlign,
        letterSpacing: '0.04em',
      }}
      {...props}
    >
      {children}
    </span>
  );
});

Tag.displayName = 'Tag';

export { Tag };

