/**
 * @component CTAButton
 * @description Primary call-to-action button with emphasis variants.
 * 
 * @source maze-monorepo/packages/ariane/src/components/Button/CTAButton.tsx
 * @styles maze-monorepo/packages/ariane/src/components/Button/Button.styled.ts
 */
import { forwardRef } from 'react';
import { cva } from 'class-variance-authority';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '../lib/utils';

/**
 * CTAButton variants using CVA
 * Matches Ariane Button.styled.ts exactly
 */
const ctaButtonVariants = cva(
  // Base styles
  [
    "inline-flex items-center justify-center",
    "relative rounded-ariane",
    "font-sans font-semibold",
    "transition-all duration-150",
    "outline-none",
    "w-fit flex-shrink-0 flex-grow-0",
    "no-underline",
    // Focus outline pseudo element handled via CSS
  ].join(" "),
  {
    variants: {
      emphasis: {
        primary: "",
        tertiary: "",
      },
      size: {
        MD: [
          "text-[16px] leading-[24px] tracking-[-0.01em]",
          "min-w-[96px] min-h-[48px]",
          "py-[11px] px-[15px]",
          "gap-[8px]",
        ].join(" "),
        SM: [
          "text-[14px] leading-[20px] tracking-[-0.01em]",
          "min-w-[64px] min-h-[32px]",
          "py-[6px] px-[8px]",
          "gap-[4px]",
        ].join(" "),
      },
      destructive: {
        true: "",
        false: "",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      emphasis: "primary",
      size: "MD",
      destructive: false,
      fullWidth: false,
    },
  }
);

/**
 * Get button colors based on emphasis and destructive states
 */
const getButtonStyles = (emphasis, destructive, waiting, disabled) => {
  // Color tokens
  const colors = {
    // Awake (default)
    awake: '#0568FD',
    awakeHovered: '#034FD6',
    awakePressed: '#0138A9',
    // Critical (destructive)
    critical: '#CC3F4D',
    criticalHovered: '#A4313C',
    criticalPressed: '#7D222B',
    // Dormant (disabled)
    dormant: '#6C718C',
    // Surfaces
    surfaceAwake: '#F0FAFF',
    surfaceAwakeHovered: '#CEEEFF',
    surfaceAwakePressed: '#9AD6FF',
    surfaceCritical: '#FFF6F8',
    surfaceCriticalHovered: '#FEE3E5',
    surfaceCriticalPressed: '#FCC0C3',
    surfaceDormant: '#F8F8FB',
    // Text
    onExtra: '#FFFFFF',
    secondary: '#535A74',
    background: '#FFFFFF',
  };

  // Shadow tokens
  const shadows = {
    awake: '0px 1px 2px rgba(5, 104, 253, 0.08), inset 0px 0px 0px 0.5px rgba(5, 104, 253, 0.28)',
    awakeHovered: '0px 1px 2px rgba(5, 104, 253, 0.08), inset 0px 0px 0px 1px rgba(5, 104, 253, 0.28)',
    awakePressed: 'inset 0px 0px 0px 1px rgba(5, 104, 253, 1)',
    awakeFocused: 'inset 0px 0px 0px 1px rgba(5, 104, 253, 0.28)',
    critical: '0px 1px 2px rgba(204, 63, 77, 0.08), inset 0px 0px 0px 0.5px rgba(204, 63, 77, 0.28)',
    criticalHovered: '0px 1px 2px rgba(204, 63, 77, 0.08), inset 0px 0px 0px 1px rgba(204, 63, 77, 0.28)',
    criticalPressed: 'inset 0px 0px 0px 1px #CC3F4D',
    dormant: '0px 1px 2px rgba(108, 113, 140, 0.08), inset 0px 0px 0px 0.5px rgba(108, 113, 140, 0.28)',
    outline: '0px 0px 0px 2px #034FD6',
  };

  const resting = destructive ? 'critical' : 'awake';
  const hovered = destructive ? 'criticalHovered' : 'awakeHovered';
  const pressed = destructive ? 'criticalPressed' : 'awakePressed';

  if (disabled) {
    return {
      backgroundColor: emphasis === 'primary' ? colors.dormant : colors.surfaceDormant,
      color: emphasis === 'primary' ? colors.onExtra : colors.dormant,
      boxShadow: emphasis === 'primary' ? 'none' : shadows.dormant,
      cursor: 'not-allowed',
    };
  }

  if (emphasis === 'primary') {
    if (waiting) {
      return {
        backgroundColor: destructive ? colors.criticalPressed : colors.awakePressed,
        color: colors.onExtra,
        boxShadow: destructive ? shadows.criticalPressed : shadows.awakePressed,
      };
    }
    return {
      backgroundColor: destructive ? colors.critical : colors.awake,
      color: colors.onExtra,
      boxShadow: destructive ? shadows.critical : shadows.awake,
      '--hover-bg': destructive ? colors.criticalHovered : colors.awakeHovered,
      '--hover-shadow': destructive ? shadows.criticalHovered : shadows.awakeHovered,
      '--active-bg': destructive ? colors.criticalPressed : colors.awakePressed,
      '--active-shadow': destructive ? shadows.criticalPressed : shadows.awakePressed,
    };
  }

  if (emphasis === 'tertiary') {
    if (waiting) {
      return {
        backgroundColor: destructive ? colors.surfaceCritical : colors.surfaceAwake,
        color: destructive ? colors.criticalPressed : colors.awakePressed,
        boxShadow: destructive ? shadows.criticalPressed : shadows.awakePressed,
      };
    }
    return {
      backgroundColor: colors.background,
      color: destructive ? colors.critical : colors.secondary,
      boxShadow: shadows.dormant,
      '--hover-color': destructive ? colors.criticalHovered : colors.awakeHovered,
      '--hover-shadow': destructive ? shadows.criticalHovered : shadows.awakeHovered,
      '--active-bg': destructive ? colors.surfaceCritical : colors.surfaceAwake,
      '--active-color': destructive ? colors.criticalPressed : colors.awakePressed,
      '--active-shadow': destructive ? shadows.criticalPressed : shadows.awakePressed,
    };
  }

  return {};
};

/**
 * Waiting indicator spinner
 */
const WaitingIndicator = ({ waiting }) => {
  if (!waiting) return null;
  
  return (
    <span className="absolute inset-0 flex items-center justify-center">
      <svg
        className="animate-spin h-5 w-5"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </span>
  );
};

/**
 * CTAButton component - Ariane design system port
 * 
 * @param {object} props - Component props
 * @param {React.ReactNode} props.children - Button content
 * @param {'primary' | 'tertiary'} [props.emphasis='primary'] - Button emphasis style
 * @param {'MD' | 'SM'} [props.size='MD'] - Button size
 * @param {boolean} [props.destructive=false] - Whether button is destructive/dangerous
 * @param {boolean} [props.pulse=false] - Whether to show pulse animation
 * @param {boolean} [props.fullWidth=false] - Whether button takes full width
 * @param {boolean} [props.waiting=false] - Whether button is in loading state
 * @param {boolean} [props.disabled=false] - Whether button is disabled
 * @param {'button' | 'submit'} [props.type='button'] - Button type
 * @param {string} [props.href] - If provided, renders as an anchor element
 * @param {boolean} [props.asChild=false] - If true, merges props with child element
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.Ref} ref - Forwarded ref
 */
const CTAButton = forwardRef(function CTAButton(
  {
    children,
    emphasis = 'primary',
    size = 'MD',
    destructive = false,
    pulse = false,
    fullWidth = false,
    waiting = false,
    disabled = false,
    type = 'button',
    href,
    asChild = false,
    className,
    ...props
  },
  ref
) {
  const isDisabled = disabled || waiting;
  const buttonStyles = getButtonStyles(emphasis, destructive, waiting, disabled);
  
  // Determine component type
  const Component = asChild ? Slot : href ? 'a' : 'button';
  
  // Build CSS for interactive states
  const interactiveStyles = `
    .cta-button-primary:not(:disabled):hover {
      background-color: var(--hover-bg) !important;
      box-shadow: var(--hover-shadow) !important;
    }
    .cta-button-primary:not(:disabled):active {
      background-color: var(--active-bg) !important;
      box-shadow: var(--active-shadow) !important;
    }
    .cta-button-tertiary:not(:disabled):hover {
      color: var(--hover-color) !important;
      box-shadow: var(--hover-shadow) !important;
    }
    .cta-button-tertiary:not(:disabled):active {
      background-color: var(--active-bg) !important;
      color: var(--active-color) !important;
      box-shadow: var(--active-shadow) !important;
    }
    .cta-button-pulse:not(:disabled)::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border-radius: 8px;
      z-index: 0;
      animation: button-pulse-animation 1.5s ease-out infinite;
    }
    @keyframes button-pulse-animation {
      0% {
        box-shadow: 0px 0px 0px 0px rgba(5, 104, 253, 0.3), 0px 0px 0px 0px rgba(5, 104, 253, 0.2);
      }
      25% {
        box-shadow: 0px 0px 2px 2px rgba(5, 104, 253, 0.5), 0px 0px 4px 4px rgba(5, 104, 253, 0.3);
      }
      50% {
        box-shadow: 0px 0px 2px 4px rgba(5, 104, 253, 0.3), 0px 0px 4px 8px rgba(5, 104, 253, 0.2);
      }
      75% {
        box-shadow: 0px 0px 4px 8px rgba(5, 104, 253, 0.16), 0px 0px 8px 16px rgba(5, 104, 253, 0.08);
      }
      100% {
        box-shadow: 0px 0px 8px 16px rgba(5, 104, 253, 0), 0px 0px 16px 24px rgba(5, 104, 253, 0.04);
      }
    }
    /* Focus outline */
    .cta-button:focus-visible::after {
      box-shadow: 0px 0px 0px 2px #034FD6 !important;
    }
    .cta-button::after {
      content: '';
      position: absolute;
      z-index: 2;
      box-shadow: 0px 0px 0px 2px transparent;
      border-radius: calc(8px + 2px);
      inset: -2px;
      pointer-events: none;
      transition: box-shadow 250ms;
    }
  `;

  return (
    <>
      <style>{interactiveStyles}</style>
      <Component
        ref={ref}
        type={Component === 'button' ? type : undefined}
        href={href}
        disabled={Component === 'button' ? isDisabled : undefined}
        aria-disabled={isDisabled}
        aria-live={waiting ? 'polite' : undefined}
        className={cn(
          ctaButtonVariants({ emphasis, size, destructive, fullWidth }),
          'cta-button',
          emphasis === 'primary' && 'cta-button-primary',
          emphasis === 'tertiary' && 'cta-button-tertiary',
          pulse && !isDisabled && 'cta-button-pulse',
          waiting && 'opacity-70',
          className
        )}
        style={{
          ...buttonStyles,
          cursor: isDisabled ? 'not-allowed' : 'pointer',
        }}
        {...props}
      >
        <span 
          className={cn(
            "flex items-center justify-center gap-[8px]",
            waiting && "opacity-0"
          )}
        >
          {children}
        </span>
        <WaitingIndicator waiting={waiting} />
      </Component>
    </>
  );
});

CTAButton.displayName = 'CTAButton';

export { CTAButton, ctaButtonVariants };

