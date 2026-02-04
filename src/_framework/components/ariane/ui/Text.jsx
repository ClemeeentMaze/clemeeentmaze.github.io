/**
 * @component Text
 * @description Typography component for body text, captions, and other non-heading text.
 * 
 * @source maze-monorepo/packages/ariane/src/components/Text/Text.tsx
 * @tokens maze-monorepo/packages/ariane/src/tokens/typography.ts
 */
import { forwardRef } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../lib/utils';

/**
 * Text typography variants matching Ariane tokens/typography.ts
 * Excludes heading and link variants
 */
const textVariants = cva(
  // Base styles
  "font-sans",
  {
    variants: {
      type: {
        caption: "text-[14px] leading-[20px] font-normal tracking-[-0.01em]",
        default: "text-[16px] leading-[24px] font-normal tracking-[-0.01em]",
        lead: "text-[18px] leading-[24px] font-normal tracking-[-0.01em]",
        kicker: "text-[13px] leading-[16px] font-bold tracking-[0] uppercase",
        // Link variants (applied when href is present)
        captionLink: "text-[14px] leading-[20px] font-normal tracking-[-0.01em] underline",
        defaultLink: "text-[16px] leading-[24px] font-normal tracking-[-0.01em] underline",
        leadLink: "text-[18px] leading-[24px] font-normal tracking-[-0.01em] underline",
      },
      align: {
        start: "text-left",
        center: "text-center",
        end: "text-right",
        justify: "text-justify",
      },
      whiteSpace: {
        normal: "whitespace-normal",
        pre: "whitespace-pre",
        nowrap: "whitespace-nowrap",
        "pre-wrap": "whitespace-pre-wrap",
        "break-spaces": "whitespace-break-spaces",
        "pre-line": "whitespace-pre-line",
      },
      overflowWrap: {
        normal: "break-normal",
        "break-word": "break-words",
        anywhere: "[overflow-wrap:anywhere]",
      },
      truncate: {
        true: "truncate",
        false: "",
      },
      inline: {
        true: "inline-block",
        false: "block",
        inline: "inline",
        "inline-block": "inline-block",
      },
    },
    defaultVariants: {
      type: "default",
      align: "start",
      whiteSpace: "normal",
      overflowWrap: "break-word",
      truncate: false,
      inline: false,
    },
  }
);

/**
 * Map Ariane color tokens to actual color values
 * @param {string} color - Color token or hex value
 * @returns {string} CSS color value
 */
const getColorValue = (color) => {
  // Color token mapping from Ariane
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
 * Text component - Ariane design system port
 * 
 * @param {object} props - Component props
 * @param {React.ReactNode} props.children - Text content
 * @param {'caption' | 'default' | 'lead' | 'kicker'} [props.type='default'] - Typography variant
 * @param {'start' | 'end' | 'center'} [props.align='start'] - Text alignment
 * @param {string} [props.color='neutral900'] - Text color (Ariane token or CSS color)
 * @param {'normal' | 'pre' | 'nowrap' | 'pre-wrap' | 'break-spaces' | 'pre-line'} [props.whiteSpace='normal'] - White space handling
 * @param {'normal' | 'break-word' | 'anywhere'} [props.overflowWrap='break-word'] - Overflow wrap behavior
 * @param {boolean} [props.truncate=false] - Whether to truncate with ellipsis
 * @param {boolean | 'inline' | 'inline-block'} [props.inline=false] - Display mode
 * @param {string} [props.href] - If provided, renders as a link
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.Ref} ref - Forwarded ref
 */
const Text = forwardRef(function Text(
  {
    children,
    type = 'default',
    align = 'start',
    color = 'neutral900',
    whiteSpace = 'normal',
    overflowWrap = 'break-word',
    truncate = false,
    inline = false,
    href,
    className,
    ...props
  },
  ref
) {
  // Determine if this should render as a link
  const isLink = Boolean(href);
  
  // Get the appropriate type variant (add Link suffix if href present)
  const resolvedType = isLink && type !== 'kicker' ? `${type}Link` : type;
  
  // Resolve the color value
  const colorValue = getColorValue(color);
  
  // Determine the element to render
  const Component = isLink ? 'a' : 'span';

  return (
    <Component
      ref={ref}
      href={href}
      className={cn(
        textVariants({
          type: resolvedType,
          align,
          whiteSpace,
          overflowWrap,
          truncate,
          inline,
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

Text.displayName = 'Text';

export { Text, textVariants };

