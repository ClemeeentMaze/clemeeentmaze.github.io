/**
 * @component HoverCard
 * @description Card component with interactive hover shadow effects.
 * 
 * @source maze-monorepo/packages/ariane/src/components/HoverCard/HoverCard.ts
 */
import { forwardRef } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../lib/utils';
import { Box } from './Box';

/**
 * HoverCard variants using CVA
 */
const hoverCardVariants = cva(
  // Base styles
  [
    'relative',
    'transition-all duration-200 ease-in-out',
  ],
  {
    variants: {
      ctype: {
        default: [
          // Default hover effect - shadow appears on hover
          'hover:shadow-[0px_2px_8px_rgba(108,113,140,0.16),0px_4px_16px_rgba(108,113,140,0.12)]',
        ],
        scaling: [
          // Scaling hover effect - shadow + slight scale
          'hover:shadow-[0px_2px_8px_rgba(108,113,140,0.16),0px_4px_16px_rgba(108,113,140,0.12)]',
          'hover:scale-[1.01]',
        ],
      },
      active: {
        true: 'shadow-[0px_2px_8px_rgba(108,113,140,0.16),0px_4px_16px_rgba(108,113,140,0.12)]',
        false: '',
      },
      disabled: {
        true: [
          'cursor-default',
          'hover:shadow-none',
          'hover:scale-100',
        ],
        false: 'cursor-pointer',
      },
    },
    compoundVariants: [
      // When active, always show shadow regardless of ctype
      {
        active: true,
        className: 'shadow-[0px_2px_8px_rgba(108,113,140,0.16),0px_4px_16px_rgba(108,113,140,0.12)]',
      },
      // When disabled, remove hover effects
      {
        disabled: true,
        className: 'hover:shadow-none hover:scale-100',
      },
    ],
    defaultVariants: {
      ctype: 'default',
      active: false,
      disabled: false,
    },
  }
);

/**
 * HoverCard component - Card with interactive hover effects
 * 
 * A card component that displays elevated shadow effects on hover,
 * commonly used for clickable card layouts.
 * 
 * @param {object} props - Component props
 * @param {'default' | 'scaling'} [props.ctype='default'] - Card type/hover behavior
 * @param {boolean} [props.active=false] - Whether card is in active/selected state
 * @param {boolean} [props.disabled=false] - Whether card is disabled (no hover effects)
 * @param {React.CSSProperties} [props.style] - Additional inline styles
 * @param {React.ReactNode} props.children - Card content
 * 
 * Also accepts all Box component props (bg, padding, borderRadius, etc.)
 */
const HoverCard = forwardRef(function HoverCard(
  {
    ctype = 'default',
    active = false,
    disabled = false,
    children,
    className,
    style,
    ...boxProps
  },
  ref
) {
  return (
    <Box
      ref={ref}
      position="relative"
      className={cn(
        hoverCardVariants({ ctype, active, disabled }),
        // Apply cursor styles to all children when interactive
        !active && !disabled && '[&_*]:cursor-pointer',
        className
      )}
      style={style}
      {...boxProps}
    >
      {children}
    </Box>
  );
});

HoverCard.displayName = 'HoverCard';

export { HoverCard, hoverCardVariants };

