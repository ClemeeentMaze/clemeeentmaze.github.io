/**
 * @component InfoBox
 * @description Dismissible information box for announcements or tips.
 * 
 * @source maze-monorepo/packages/ariane/src/components/InfoBox/InfoBox.tsx
 * 
 * Original spacing (styled-system numeric indices):
 * - pl={3} = 32px
 * - pr={dismissable ? 0 : 3} = 0 or 32px
 * - py="LG" = 24px on inner Flex
 * - Icon: py={1}=12px, px={2}=16px
 */
import { forwardRef, useState } from 'react';
import { cn } from '../lib/utils';

/**
 * Cross icon for dismiss button
 */
const CrossIcon = ({ color = '#6C718C' }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12.5 4.20711L11.7929 3.5L8 7.29289L4.20711 3.5L3.5 4.20711L7.29289 8L3.5 11.7929L4.20711 12.5L8 8.70711L11.7929 12.5L12.5 11.7929L8.70711 8L12.5 4.20711Z"
      fill={color}
    />
  </svg>
);

/**
 * InfoBox component - Ariane design system port
 * A dismissable information box/alert
 * 
 * @param {object} props - Component props
 * @param {string} props.title - Box title
 * @param {string} [props.body] - Box body text
 * @param {boolean} [props.dismissable=true] - Whether box can be dismissed
 * @param {string} [props.bgColor='#F8F8FB'] - Background color
 * @param {string} [props.titleColor='#000000'] - Title text color
 * @param {string} [props.bodyColor='#6C718C'] - Body text color
 * @param {string} [props.iconColor='#6C718C'] - Icon color
 * @param {React.ReactNode} [props.children] - Additional content
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.Ref} ref - Forwarded ref
 */
const InfoBox = forwardRef(function InfoBox(
  {
    title,
    body = '',
    dismissable = true,
    bgColor = '#F8F8FB', // neutral100
    titleColor = '#000000', // neutral900
    bodyColor = '#6C718C', // neutral500
    iconColor = '#6C718C', // neutral500
    children,
    className,
    style,
    ...props
  },
  ref
) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      ref={ref}
      className={cn('relative', className)}
      style={{
        backgroundColor: bgColor,
        paddingLeft: '32px', // pl={3} = 32px
        paddingRight: dismissable ? '0' : '32px', // pr={dismissable ? 0 : 3}
        borderRadius: '10px',
        ...style,
      }}
      {...props}
    >
      {/* Outer flex for justify-content: space-between */}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Content area with vertical padding */}
        <div 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            paddingTop: '24px',  // py="LG" = 24px
            paddingBottom: '24px',
          }}
        >
          <div>
            {/* Title */}
            <span
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontWeight: 600,
                fontSize: '16px',
                lineHeight: '24px',
                color: titleColor,
                display: 'inline',
              }}
            >
              {title}
            </span>
            {/* Body */}
            {body && (
              <div style={{ marginTop: '4px' }}> {/* mt="XS" = 4px */}
                <span
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontWeight: 400,
                    fontSize: '14px',
                    lineHeight: '20px',
                    color: bodyColor,
                  }}
                >
                  {body}
                </span>
              </div>
            )}
          </div>
        </div>
        
        {/* Additional children */}
        {children}
        
        {/* Dismiss button */}
        {dismissable && (
          <button
            type="button"
            aria-label="Dismiss"
            onClick={() => setIsVisible(false)}
            style={{
              padding: '12px 16px', // py={1}=12px, px={2}=16px
              cursor: 'pointer',
              background: 'transparent',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'stretch',
            }}
          >
            <CrossIcon color={iconColor} />
          </button>
        )}
      </div>
    </div>
  );
});

InfoBox.displayName = 'InfoBox';

export { InfoBox };
