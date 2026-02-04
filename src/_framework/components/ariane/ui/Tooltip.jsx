/**
 * @component Tooltip
 * @description Tooltip component using Radix UI primitives.
 * 
 * @source maze-monorepo/packages/ariane/src/components/Tooltip/Tooltip.tsx
 */
import { forwardRef } from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { cn } from '../lib/utils';

// Theme configurations
const themes = {
  dark: {
    background: '#282D40', // neutral800
    textColor: '#FFFFFF',
    border: 'transparent',
    hasShadow: false,
  },
  light: {
    background: '#FFFFFF',
    textColor: '#000000',
    border: 'transparent',
    hasShadow: false,
  },
  'light-emphasized': {
    background: '#FFFFFF',
    textColor: '#000000',
    border: 'rgba(108, 113, 140, 0.28)',
    hasShadow: true,
  },
};

/**
 * CSS styles for Tooltip
 */
const tooltipStyles = `
  .ariane-tooltip-content {
    font-family: 'Inter', system-ui, sans-serif;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: -0.01em;
    border-radius: 8px;
    padding: 8px 12px;
    z-index: 100;
    animation: fadeIn 150ms ease-out;
    max-width: 300px;
  }
  .ariane-tooltip-content.no-padding {
    padding: 0;
  }
  .ariane-tooltip-content.has-shadow {
    box-shadow: 0px 4px 16px rgba(108, 113, 140, 0.16), 0px 2px 8px rgba(108, 113, 140, 0.08);
  }
  .ariane-tooltip-content.has-animation {
    animation: tooltipBounce 300ms cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes tooltipBounce {
    0% { 
      opacity: 0; 
      transform: scale(0.95);
    }
    100% { 
      opacity: 1; 
      transform: scale(1);
    }
  }
  .ariane-tooltip-arrow {
    fill: currentColor;
  }
`;

/**
 * Tooltip component - Ariane design system port
 * A tooltip using Radix UI Tooltip primitive
 * 
 * @param {object} props - Component props
 * @param {React.ReactNode} props.children - Trigger element
 * @param {React.ReactNode | string} props.label - Tooltip content
 * @param {'dark' | 'light' | 'light-emphasized'} [props.type='dark'] - Tooltip theme
 * @param {boolean} [props.hasArrow=true] - Whether to show arrow
 * @param {number} [props.offset=10] - Distance from trigger
 * @param {'top' | 'right' | 'bottom' | 'left'} [props.placement='top'] - Tooltip placement
 * @param {number} [props.zIndex=100] - Z-index
 * @param {boolean} [props.enabled=true] - Whether tooltip is enabled
 * @param {boolean} [props.hasPadding] - Whether to apply default padding (auto for custom content)
 * @param {number} [props.delayDuration=300] - Delay before showing tooltip
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.Ref} ref - Forwarded ref
 */
const Tooltip = forwardRef(function Tooltip(
  {
    children,
    label,
    type = 'dark',
    hasArrow = true,
    offset = 10,
    placement = 'top',
    zIndex = 100,
    enabled = true,
    hasPadding,
    delayDuration = 300,
    className,
    ...props
  },
  ref
) {
  const theme = themes[type] || themes.dark;
  const isCustomContent = typeof label !== 'string';
  const shouldHavePadding = hasPadding ?? !isCustomContent;

  if (!enabled) {
    return children;
  }

  return (
    <>
      <style>{tooltipStyles}</style>
      <TooltipPrimitive.Provider delayDuration={delayDuration}>
        <TooltipPrimitive.Root>
          <TooltipPrimitive.Trigger asChild ref={ref}>
            {children}
          </TooltipPrimitive.Trigger>
          <TooltipPrimitive.Portal>
            <TooltipPrimitive.Content
              side={placement}
              sideOffset={offset}
              className={cn(
                'ariane-tooltip-content',
                !shouldHavePadding && 'no-padding',
                theme.hasShadow && 'has-shadow',
                type === 'light-emphasized' && 'has-animation',
                className
              )}
              style={{
                backgroundColor: theme.background,
                color: theme.textColor,
                border: theme.border !== 'transparent' ? `1px solid ${theme.border}` : undefined,
                zIndex,
              }}
              {...props}
            >
              {isCustomContent ? label : (
                <span className="text-[14px] leading-[20px]" style={{ color: theme.textColor }}>
                  {label}
                </span>
              )}
              {hasArrow && (
                <TooltipPrimitive.Arrow
                  className="ariane-tooltip-arrow"
                  style={{ color: theme.background }}
                  width={12}
                  height={6}
                />
              )}
            </TooltipPrimitive.Content>
          </TooltipPrimitive.Portal>
        </TooltipPrimitive.Root>
      </TooltipPrimitive.Provider>
    </>
  );
});

Tooltip.displayName = 'Tooltip';

export { Tooltip };

