/**
 * @component Heading
 * @description Typography component for headings (h1-h5).
 * 
 * @source maze-monorepo/packages/ariane/src/components/Heading/Heading.tsx
 * @tokens maze-monorepo/packages/ariane/src/tokens/typography.ts
 */
import { forwardRef } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../lib/utils';

/**
 * Heading typography variants matching Ariane tokens/typography.ts
 */
const headingVariants = cva(
  // Base styles
  "font-sans font-semibold tracking-[-0.01em]",
  {
    variants: {
      level: {
        1: "text-[23px] leading-[32px]",
        2: "text-[20px] leading-[24px]",
        3: "text-[18px] leading-[24px]",
        4: "text-[16px] leading-[24px]",
        5: "text-[14px] leading-[20px]",
      },
      align: {
        start: "text-left",
        center: "text-center",
        end: "text-right",
      },
    },
    defaultVariants: {
      level: 2,
      align: "start",
    },
  }
);

/**
 * Map Ariane color tokens to actual color values
 * @param {string} color - Color token or hex value
 * @returns {string} CSS color value
 */
const getColorValue = (color) => {
  const colorMap = {
    // Raw colors
    neutral000: '#FFFFFF',
    neutral100: '#F8F8FB',
    neutral200: '#E8E8F1',
    neutral300: '#CDCEDD',
    neutral400: '#9597B0',
    neutral500: '#6C718C',
    neutral600: '#535A74',
    neutral700: '#3D425A',
    neutral800: '#282D40',
    neutral900: '#000000',
    blue500: '#0568FD',
    red500: '#CC3F4D',
    // Semantic paths
    'default.main.primary': '#000000',
    'default.main.secondary': '#535A74',
    'default.extra.awake': '#0568FD',
    'default.extra.dormant': '#6C718C',
    'default.extra.critical': '#CC3F4D',
    'default.extra.warning': '#AC5F00',
    'default.extra.success': '#15807B',
    'default.extra.featured': '#6B5BEE',
    'default.extra.onExtra': '#FFFFFF',
    'inverted.main.primary': '#FFFFFF',
    'inverted.main.secondary': '#9597B0',
  };

  return colorMap[color] || color;
};

/**
 * Heading component - Ariane design system port
 * 
 * @param {object} props - Component props
 * @param {React.ReactNode} props.children - Heading content
 * @param {1 | 2 | 3 | 4 | 5} [props.level=2] - Heading level (h1-h5)
 * @param {'start' | 'end' | 'center'} [props.align='start'] - Text alignment
 * @param {string} [props.color='neutral900'] - Text color (Ariane token or CSS color)
 * @param {'dt' | 'span'} [props.as] - Override element type (default uses h1-h5 based on level)
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.Ref} ref - Forwarded ref
 */
const Heading = forwardRef(function Heading(
  {
    children,
    level = 2,
    align = 'start',
    color = 'neutral900',
    as,
    className,
    ...props
  },
  ref
) {
  // Resolve the color value
  const colorValue = getColorValue(color);
  
  // Determine the element to render
  const Component = as || `h${level}`;

  return (
    <Component
      ref={ref}
      className={cn(
        headingVariants({
          level,
          align,
        }),
        className
      )}
      style={{ color: colorValue }}
      {...props}
    >
      {children}
    </Component>
  );
});

Heading.displayName = 'Heading';

export { Heading, headingVariants };

