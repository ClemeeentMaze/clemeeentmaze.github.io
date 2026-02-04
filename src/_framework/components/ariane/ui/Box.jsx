/**
 * @component Box
 * @description Flexible container component with spacing, color, and layout props.
 * 
 * @source maze-monorepo/packages/ariane/src/components/Box/Box.tsx
 * @tokens maze-monorepo/packages/ariane/src/tokens/space.ts
 */
import { forwardRef } from 'react';
import { cn } from '../lib/utils';

/**
 * Map Ariane spacing tokens to Tailwind classes
 * @param {string|number} value - Spacing value or token
 * @param {string} prefix - CSS property prefix (p, m, etc.)
 * @returns {string} Tailwind class
 */
const getSpacingClass = (value, prefix) => {
  if (value === undefined || value === null) return '';
  
  // Ariane spacing token mapping
  const spacingMap = {
    'XS': 'xs',
    'SM': 'sm', 
    'SMPlus': 'sm-plus',
    'MD': 'md',
    'LG': 'lg',
    'XL': 'xl',
    'XLPlus': 'xl-plus',
    'XXL': 'xxl',
  };
  
  const mapped = spacingMap[value];
  if (mapped) {
    return `${prefix}-${mapped}`;
  }
  
  // Handle numeric values (assume they're Tailwind spacing scale)
  if (typeof value === 'number') {
    return `${prefix}-${value}`;
  }
  
  return '';
};

/**
 * Box component - Ariane design system port
 * A flexible container component with layout utilities
 * 
 * @param {object} props - Component props
 * @param {React.ReactNode} props.children - Box content
 * @param {string} [props.as='div'] - Element type to render
 * @param {string|number} [props.p] - Padding (all sides)
 * @param {string|number} [props.px] - Padding horizontal
 * @param {string|number} [props.py] - Padding vertical
 * @param {string|number} [props.pt] - Padding top
 * @param {string|number} [props.pr] - Padding right
 * @param {string|number} [props.pb] - Padding bottom
 * @param {string|number} [props.pl] - Padding left
 * @param {string|number} [props.m] - Margin (all sides)
 * @param {string|number} [props.mx] - Margin horizontal
 * @param {string|number} [props.my] - Margin vertical
 * @param {string|number} [props.mt] - Margin top
 * @param {string|number} [props.mr] - Margin right
 * @param {string|number} [props.mb] - Margin bottom
 * @param {string|number} [props.ml] - Margin left
 * @param {string} [props.bg] - Background color (Ariane token or CSS color)
 * @param {string} [props.color] - Text color
 * @param {string} [props.width] - Width
 * @param {string} [props.height] - Height
 * @param {string} [props.minWidth] - Minimum width
 * @param {string} [props.maxWidth] - Maximum width
 * @param {string} [props.minHeight] - Minimum height
 * @param {string} [props.maxHeight] - Maximum height
 * @param {string} [props.borderRadius] - Border radius
 * @param {string} [props.boxShadow] - Box shadow
 * @param {string} [props.position] - CSS position
 * @param {string} [props.display] - CSS display
 * @param {string} [props.zIndex] - Z-index
 * @param {boolean} [props.radius] - Apply default border radius
 * @param {boolean} [props.clickable] - Make cursor pointer
 * @param {string} [props.className] - Additional CSS classes
 * @param {object} [props.style] - Inline styles
 * @param {React.Ref} ref - Forwarded ref
 */
const Box = forwardRef(function Box(
  {
    children,
    as: Component = 'div',
    p,
    px,
    py,
    pt,
    pr,
    pb,
    pl,
    m,
    mx,
    my,
    mt,
    mr,
    mb,
    ml,
    bg,
    color,
    width,
    height,
    minWidth,
    maxWidth,
    minHeight,
    maxHeight,
    borderRadius,
    boxShadow,
    position = 'relative',
    display,
    zIndex,
    radius,
    clickable,
    className,
    style,
    ...props
  },
  ref
) {
  // Build spacing classes
  const spacingClasses = [
    getSpacingClass(p, 'p'),
    getSpacingClass(px, 'px'),
    getSpacingClass(py, 'py'),
    getSpacingClass(pt, 'pt'),
    getSpacingClass(pr, 'pr'),
    getSpacingClass(pb, 'pb'),
    getSpacingClass(pl, 'pl'),
    getSpacingClass(m, 'm'),
    getSpacingClass(mx, 'mx'),
    getSpacingClass(my, 'my'),
    getSpacingClass(mt, 'mt'),
    getSpacingClass(mr, 'mr'),
    getSpacingClass(mb, 'mb'),
    getSpacingClass(ml, 'ml'),
  ].filter(Boolean);

  // Build inline styles for properties that need exact values
  const inlineStyles = {
    ...style,
    backgroundColor: bg,
    color,
    width,
    height,
    minWidth,
    maxWidth,
    minHeight,
    maxHeight,
    borderRadius: radius ? '8px' : borderRadius,
    boxShadow,
    position,
    display,
    zIndex,
  };

  // Remove undefined values
  Object.keys(inlineStyles).forEach(key => {
    if (inlineStyles[key] === undefined) {
      delete inlineStyles[key];
    }
  });

  return (
    <Component
      ref={ref}
      className={cn(
        spacingClasses,
        clickable && 'cursor-pointer',
        className
      )}
      style={inlineStyles}
      {...props}
    >
      {children}
    </Component>
  );
});

Box.displayName = 'Box';

export { Box };

