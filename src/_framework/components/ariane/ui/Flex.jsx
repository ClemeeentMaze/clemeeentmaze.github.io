/**
 * @component Flex
 * @description Flexbox layout component with gap, alignment, and direction props.
 * 
 * @source maze-monorepo/packages/ariane/src/components/Flex/Flex.tsx
 * @tokens maze-monorepo/packages/ariane/src/tokens/space.ts
 */
import { forwardRef } from 'react';
import { cn } from '../lib/utils';

/**
 * Map Ariane spacing tokens to CSS values
 * @param {string|number} value - Spacing value or token
 * @returns {string} CSS value
 */
const getSpacingValue = (value) => {
  if (value === undefined || value === null) return undefined;
  
  // Ariane spacing token mapping
  const spacingMap = {
    'XS': '4px',
    'SM': '8px', 
    'SMPlus': '12px',
    'MD': '16px',
    'LG': '24px',
    'XL': '32px',
    'XLPlus': '40px',
    'XXL': '56px',
  };
  
  return spacingMap[value] || value;
};

/**
 * Map Ariane spacing tokens to Tailwind classes
 * @param {string|number} value - Spacing value or token
 * @param {string} prefix - CSS property prefix (p, m, etc.)
 * @returns {string} Tailwind class
 */
const getSpacingClass = (value, prefix) => {
  if (value === undefined || value === null) return '';
  
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
  
  if (typeof value === 'number') {
    return `${prefix}-${value}`;
  }
  
  return '';
};

/**
 * Flex component - Ariane design system port
 * A flexbox container with layout utilities
 * 
 * @param {object} props - Component props
 * @param {React.ReactNode} props.children - Flex content
 * @param {string} [props.as='div'] - Element type to render
 * @param {'row' | 'row-reverse' | 'column' | 'column-reverse'} [props.flexDirection] - Flex direction
 * @param {'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly'} [props.justifyContent] - Justify content
 * @param {'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline' | 'normal'} [props.alignItems] - Align items
 * @param {'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline'} [props.alignContent] - Align content
 * @param {'nowrap' | 'wrap' | 'wrap-reverse'} [props.flexWrap] - Flex wrap
 * @param {string|number} [props.gap] - Gap between items
 * @param {string|number} [props.rowGap] - Row gap
 * @param {string|number} [props.columnGap] - Column gap
 * @param {string|number} [props.flex] - Flex shorthand
 * @param {string|number} [props.flexGrow] - Flex grow
 * @param {string|number} [props.flexShrink] - Flex shrink
 * @param {string|number} [props.flexBasis] - Flex basis
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
 * @param {string} [props.bg] - Background color
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
 * @param {string} [props.zIndex] - Z-index
 * @param {string} [props.className] - Additional CSS classes
 * @param {object} [props.style] - Inline styles
 * @param {React.Ref} ref - Forwarded ref
 */
const Flex = forwardRef(function Flex(
  {
    children,
    as: Component = 'div',
    flexDirection,
    justifyContent,
    alignItems,
    alignContent,
    flexWrap,
    gap,
    rowGap,
    columnGap,
    flex,
    flexGrow,
    flexShrink,
    flexBasis,
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
    position,
    zIndex,
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

  // Build inline styles - spread style last so it can override defaults
  const inlineStyles = {
    display: 'flex',
    flexDirection,
    justifyContent,
    alignItems,
    alignContent,
    flexWrap,
    gap: getSpacingValue(gap),
    rowGap: getSpacingValue(rowGap),
    columnGap: getSpacingValue(columnGap),
    flex,
    flexGrow,
    flexShrink,
    flexBasis,
    backgroundColor: bg,
    color,
    width,
    height,
    minWidth,
    maxWidth,
    minHeight,
    maxHeight,
    borderRadius,
    boxShadow,
    position,
    zIndex,
    ...style,  // Spread style last so it can override prop values
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
      className={cn(spacingClasses, className)}
      style={inlineStyles}
      {...props}
    >
      {children}
    </Component>
  );
});

Flex.displayName = 'Flex';

export { Flex };

