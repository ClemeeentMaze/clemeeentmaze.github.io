/**
 * @component Link
 * @description Styled anchor component for navigation links.
 * 
 * @source maze-monorepo/packages/ariane/src/components/Link/Link.tsx
 */
import { forwardRef } from 'react';
import { Text } from './Text';

/**
 * Link component - Ariane design system port
 * Wraps Text component with link behavior
 * 
 * @param {object} props - Component props
 * @param {React.ReactNode} props.children - Link content
 * @param {string} props.href - Link destination URL
 * @param {'caption' | 'default' | 'lead' | 'kicker'} [props.type='default'] - Typography variant
 * @param {'start' | 'end' | 'center'} [props.align='start'] - Text alignment
 * @param {string} [props.color='neutral900'] - Text color (Ariane token or CSS color)
 * @param {string} [props.target] - Link target (_blank, _self, etc.)
 * @param {string} [props.rel] - Link relationship
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.Ref} ref - Forwarded ref
 */
const Link = forwardRef(function Link(
  { children, href, ...props },
  ref
) {
  return (
    <Text
      ref={ref}
      href={href}
      {...props}
    >
      {children}
    </Text>
  );
});

Link.displayName = 'Link';

export { Link };

