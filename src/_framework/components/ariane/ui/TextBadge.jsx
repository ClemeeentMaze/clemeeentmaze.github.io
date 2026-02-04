/**
 * @component TextBadge
 * @description Badge component with sentiment colors for status indicators.
 * 
 * @source maze-monorepo/packages/ariane/src/components/Badge/TextBadge.tsx
 * @styles maze-monorepo/packages/ariane/src/components/Badge/TextBadge.styled.ts
 */
import { forwardRef } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../lib/utils';
import { VisuallyHidden } from './VisuallyHidden';

/**
 * Sentiment color mapping
 */
const sentimentColors = {
  awake: {
    bg: '#F0FAFF', // surface.awake
    text: '#0568FD', // extra.awake
  },
  dormant: {
    bg: '#F8F8FB', // surface.dormant
    text: '#6C718C', // extra.dormant
  },
  critical: {
    bg: '#FFF6F8', // surface.critical
    text: '#CC3F4D', // extra.critical
  },
  warning: {
    bg: '#FFF7F1', // surface.warning
    text: '#AC5F00', // extra.warning
  },
  success: {
    bg: '#EBFCFA', // surface.success
    text: '#15807B', // extra.success
  },
  featured: {
    bg: '#F9F7FF', // surface.featured
    text: '#6B5BEE', // extra.featured
  },
};

/**
 * Icon to sentiment mapping
 */
const iconSentimentMap = {
  lock: 'dormant',
  sparkles: 'featured',
};

/**
 * TextBadge variants
 */
const textBadgeVariants = cva(
  // Base styles
  "inline-flex items-center gap-[4px] rounded-full text-[14px] leading-[20px] font-normal",
  {
    variants: {
      hasIcon: {
        true: "pl-[4px] pr-[8px] py-[2px]",
        false: "px-[8px] py-[2px]",
      },
      iconOnly: {
        true: "p-[4px]",
        false: "",
      },
    },
    defaultVariants: {
      hasIcon: false,
      iconOnly: false,
    },
  }
);

/**
 * Simple icon component for badges
 * Note: In a real implementation, you'd use a proper icon library
 */
const BadgeIcon = ({ name, color }) => {
  // Simple placeholder icons - replace with actual icon library
  const icons = {
    lock: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12 6H11V4.5C11 2.57 9.43 1 7.5 1C5.57 1 4 2.57 4 4.5V6H3C2.45 6 2 6.45 2 7V14C2 14.55 2.45 15 3 15H12C12.55 15 13 14.55 13 14V7C13 6.45 12.55 6 12 6ZM5.5 4.5C5.5 3.4 6.4 2.5 7.5 2.5C8.6 2.5 9.5 3.4 9.5 4.5V6H5.5V4.5Z"
          fill={color}
        />
      </svg>
    ),
    sparkles: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M8 2L9.09 5.26L12 6L9.09 6.74L8 10L6.91 6.74L4 6L6.91 5.26L8 2Z"
          fill={color}
        />
        <path
          d="M3 10L3.55 11.45L5 12L3.55 12.55L3 14L2.45 12.55L1 12L2.45 11.45L3 10Z"
          fill={color}
        />
        <path
          d="M12 9L12.73 10.77L14.5 11.5L12.73 12.23L12 14L11.27 12.23L9.5 11.5L11.27 10.77L12 9Z"
          fill={color}
        />
      </svg>
    ),
  };

  return icons[name] || null;
};

/**
 * TextBadge component - Ariane design system port
 * 
 * @param {object} props - Component props
 * @param {string | number} props.children - Badge content
 * @param {'awake' | 'dormant' | 'critical' | 'warning' | 'success' | 'featured'} [props.sentiment] - Sentiment for styling
 * @param {'lock' | 'sparkles'} [props.icon] - Icon name (determines sentiment if sentiment not provided)
 * @param {boolean} [props.iconOnly=false] - If true, visually hide text but keep for accessibility
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.Ref} ref - Forwarded ref
 */
const TextBadge = forwardRef(function TextBadge(
  {
    children,
    sentiment: sentimentProp,
    icon,
    iconOnly = false,
    className,
    ...props
  },
  ref
) {
  // Determine sentiment from prop or icon
  const sentiment = sentimentProp || (icon ? iconSentimentMap[icon] : 'dormant');
  const colors = sentimentColors[sentiment] || sentimentColors.dormant;
  const hasIcon = Boolean(icon);

  return (
    <span
      ref={ref}
      className={cn(
        textBadgeVariants({ hasIcon, iconOnly }),
        className
      )}
      style={{
        backgroundColor: colors.bg,
        color: colors.text,
      }}
      {...props}
    >
      {hasIcon && <BadgeIcon name={icon} color={colors.text} />}
      {iconOnly ? (
        <VisuallyHidden>{children}</VisuallyHidden>
      ) : (
        children
      )}
    </span>
  );
});

TextBadge.displayName = 'TextBadge';

export { TextBadge, textBadgeVariants };

