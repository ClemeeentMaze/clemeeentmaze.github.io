/**
 * @component Figure (BaseFigure, InitialsFigure, ImageFigure, IconFigure, FigureStack, ShapeBadge)
 * @description Flexible visual representation components with shapes, modes, and variants.
 * 
 * @source maze-monorepo/packages/ariane/src/components/Figure/BaseFigure.tsx
 * @source maze-monorepo/packages/ariane/src/components/Figure/InitialsFigure.tsx
 * @source maze-monorepo/packages/ariane/src/components/Figure/ImageFigure.tsx
 * @source maze-monorepo/packages/ariane/src/components/Figure/IconFigure.tsx
 * @source maze-monorepo/packages/ariane/src/components/Figure/FigureStack.tsx
 * @source maze-monorepo/packages/ariane/src/components/Badge/ShapeBadge.tsx
 * @types maze-monorepo/packages/ariane/src/components/Figure/Figure.types.ts
 * @utils maze-monorepo/packages/ariane/src/components/Figure/Figure.utils.ts
 */
import { forwardRef, Children, isValidElement, useState } from 'react';
import { cn } from '../lib/utils';
import { Flex } from './Flex';
import { Box } from './Box';
import { Text } from './Text';
import { VisuallyHidden } from './VisuallyHidden';

// ============================================================================
// CONSTANTS & UTILITIES
// ============================================================================

/**
 * Figure size configurations
 */
const sizeMap = {
  SM: {
    size: '24px',
    textType: 'caption',
    badgeSize: 'SM',
    roundedBadgeOffset: -3,
    squaredBadgeOffset: -4,
    iconSize: '16px',
    stackBorder: 2,
    stackOffset: 8,
    squaredRadius: '4px',
  },
  MD: {
    size: '32px',
    textType: 'caption',
    badgeSize: 'MD',
    roundedBadgeOffset: -2,
    squaredBadgeOffset: -5,
    iconSize: '16px',
    stackBorder: 2,
    stackOffset: 12,
    squaredRadius: '8px',
  },
  MDPlus: {
    size: '40px',
    textType: 'lead',
    badgeSize: 'MD',
    roundedBadgeOffset: -1,
    squaredBadgeOffset: -5,
    iconSize: '20px',
    stackBorder: 3,
    stackOffset: 12,
    squaredRadius: '8px',
  },
  LG: {
    size: '48px',
    textType: 'lead',
    badgeSize: 'LG',
    roundedBadgeOffset: -3,
    squaredBadgeOffset: -8,
    iconSize: '24px',
    stackBorder: 4,
    stackOffset: 16,
    squaredRadius: '8px',
  },
  XL: {
    size: '92px',
    headingLevel: 1,
    badgeSize: 'LG',
    roundedBadgeOffset: 4,
    squaredBadgeOffset: -8,
    iconSize: '32px',
    stackBorder: 6,
    stackOffset: 32,
    squaredRadius: '8px',
  },
};

/**
 * Sentiment to base color mapping
 */
const sentiments = {
  awake: 'blue',
  dormant: 'neutral',
  critical: 'red',
  warning: 'amber',
  success: 'forest',
  featured: 'lavender',
};

/**
 * Color values for sentiments and base colors
 */
const colorValues = {
  // Semantic extra colors (dark mode backgrounds)
  'extra.awake': '#0568FD',
  'extra.dormant': '#6C718C',
  'extra.critical': '#CC3F4D',
  'extra.warning': '#AC5F00',
  'extra.success': '#15807B',
  'extra.featured': '#6B5BEE',
  // Surface colors (light mode backgrounds)
  'surface.awake': '#F0FAFF',
  'surface.dormant': '#F8F8FB',
  'surface.critical': '#FFF6F8',
  'surface.warning': '#FFF7F1',
  'surface.success': '#EBFCFA',
  'surface.featured': '#F9F7FF',
  // Base color scales - 100 (light backgrounds)
  blue100: '#F0FAFF',
  neutral100: '#F8F8FB',
  red100: '#FFF6F8',
  amber100: '#FFF9ED',
  forest100: '#EBFCF5',
  lavender100: '#F9F7FF',
  cyan100: '#DEFFFE',
  lila100: '#FCF7FF',
  rose100: '#FFF6FE',
  // Base color scales - 500 (dark backgrounds)
  blue500: '#0568FD',
  neutral500: '#6C718C',
  red500: '#CC3F4D',
  amber500: '#AC7000',
  forest500: '#158053',
  lavender500: '#6B5BEE',
  cyan500: '#147E90',
  lila500: '#9C48E0',
  rose500: '#BB3DB0',
  // Main colors
  'default.main.background': '#FFFFFF',
  'default.main.primary': '#000000',
  'default.main.secondary': '#535A74',
  'inverted.main.background': '#282D40',
  'inverted.main.primary': '#FFFFFF',
  'inverted.main.secondary': '#9597B0',
};

/**
 * Check if color is a sentiment
 */
const isSentiment = (color) => Object.keys(sentiments).includes(color);

/**
 * Get background color based on color and mode
 */
const getBackgroundColor = (color, mode) => {
  if (color === 'primary' || color === 'secondary') {
    if (mode === 'light') return colorValues['default.main.background'];
    if (color === 'primary') return colorValues['inverted.main.background'];
    if (color === 'secondary') return colorValues['inverted.main.secondary'];
  }
  
  if (isSentiment(color)) {
    if (mode === 'dark') return colorValues[`extra.${color}`];
    return colorValues[`surface.${color}`];
  }
  
  // Base color
  const shade = mode === 'dark' ? '500' : '100';
  return colorValues[`${color}${shade}`] || colorValues[`${color}100`] || '#F8F8FB';
};

/**
 * Get text color based on color and mode
 */
const getTextColor = (color, mode) => {
  if (mode === 'dark') return 'inverted.main.primary';
  if (color === 'primary') return 'default.main.primary';
  if (color === 'secondary') return 'default.main.secondary';
  if (isSentiment(color)) return `default.extra.${color}`;
  return `${color}500`;
};

/**
 * Get text color value
 */
const getTextColorValue = (color, mode) => {
  if (mode === 'dark') return '#FFFFFF';
  if (color === 'primary') return '#000000';
  if (color === 'secondary') return '#535A74';
  if (isSentiment(color)) return colorValues[`extra.${color}`];
  return colorValues[`${color}500`] || '#000000';
};

/**
 * Check if size config uses heading
 */
const isHeading = (config) => !!config.headingLevel;

// ============================================================================
// SHAPE BADGE COMPONENT
// ============================================================================

/**
 * ShapeBadge size configurations
 */
const badgeSizeMap = {
  SM: 6,
  MD: 8,
  LG: 12,
};

/**
 * Sentiment colors for badge
 */
const badgeColors = {
  awake: '#0568FD',
  dormant: '#6C718C',
  critical: '#CC3F4D',
  warning: '#AC5F00',
  success: '#15807B',
  featured: '#6B5BEE',
};

/**
 * ShapeBadge component - A circular badge indicator
 * 
 * @param {object} props - Component props
 * @param {'awake' | 'dormant' | 'critical' | 'warning' | 'success' | 'featured'} props.sentiment - Badge sentiment color
 * @param {'SM' | 'MD' | 'LG'} [props.size='MD'] - Badge size
 * @param {string} [props.borderColor] - Border color (surface color token)
 * @param {string} props.children - Accessible label for the badge
 */
const ShapeBadge = forwardRef(function ShapeBadge(
  {
    sentiment,
    size = 'MD',
    borderColor,
    children,
    className,
    ...props
  },
  ref
) {
  const pixelSize = badgeSizeMap[size];
  const borderSize = borderColor ? Math.ceil(pixelSize / 4) : 0;
  
  // Get border color value
  const borderColorValue = borderColor 
    ? (colorValues[borderColor] || '#FFFFFF')
    : undefined;

  return (
    <div
      ref={ref}
      className={cn('rounded-full', className)}
      style={{
        boxSizing: 'content-box',
        width: `${pixelSize}px`,
        height: `${pixelSize}px`,
        backgroundColor: badgeColors[sentiment],
        border: borderColorValue ? `${borderSize}px solid ${borderColorValue}` : undefined,
      }}
      {...props}
    >
      <VisuallyHidden>{children}</VisuallyHidden>
    </div>
  );
});

ShapeBadge.displayName = 'ShapeBadge';

// ============================================================================
// BASE FIGURE COMPONENT
// ============================================================================

/**
 * BaseFigure component - The foundation for all figure variants
 * 
 * @param {object} props - Component props
 * @param {'awake' | 'dormant' | 'critical' | 'warning' | 'success' | 'featured' | 'blue' | 'neutral' | 'red' | 'amber' | 'forest' | 'lavender' | 'cyan' | 'lila' | 'rose' | 'primary' | 'secondary'} props.color - Figure color
 * @param {'light' | 'dark'} [props.mode='light'] - Color mode
 * @param {'rounded' | 'squared'} [props.shape='rounded'] - Figure shape
 * @param {'SM' | 'MD' | 'MDPlus' | 'LG' | 'XL'} [props.size='MD'] - Figure size
 * @param {boolean} [props.stroke] - Whether to show stroke border
 * @param {object} [props.badge] - Badge configuration { sentiment, label, borderColor? }
 * @param {React.ReactNode} props.children - Figure content
 */
const BaseFigure = forwardRef(function BaseFigure(
  {
    color,
    mode = 'light',
    shape = 'rounded',
    size = 'MD',
    badge,
    stroke,
    'aria-hidden': ariaHidden,
    'aria-label': ariaLabel,
    role,
    children,
    className,
    ...props
  },
  ref
) {
  const configuration = sizeMap[size];
  const backgroundColor = getBackgroundColor(color, mode);
  const showStroke = stroke ?? mode === 'light';
  
  const borderRadius = shape === 'rounded' ? '50%' : configuration.squaredRadius;
  const badgeOffset = shape === 'rounded' 
    ? configuration.roundedBadgeOffset 
    : configuration.squaredBadgeOffset;

  return (
    <Flex
      ref={ref}
      position="relative"
      alignItems="center"
      justifyContent="center"
      width={configuration.size}
      height={configuration.size}
      borderRadius={borderRadius}
      className={cn('flex-shrink-0', className)}
      style={{
        backgroundColor,
        boxShadow: showStroke ? 'inset 0px 0px 0px 0.5px rgba(108, 113, 140, 0.28)' : undefined,
      }}
      aria-hidden={ariaHidden}
      aria-label={ariaLabel}
      role={role}
      {...props}
    >
      {children}
      {badge && (
        <div
          style={{
            position: 'absolute',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            bottom: `${badgeOffset}px`,
            right: `${badgeOffset}px`,
          }}
        >
          <ShapeBadge 
            sentiment={badge.sentiment} 
            borderColor={badge.borderColor} 
            size={configuration.badgeSize}
          >
            {badge.label}
          </ShapeBadge>
        </div>
      )}
    </Flex>
  );
});

BaseFigure.displayName = 'BaseFigure';

// ============================================================================
// INITIALS FIGURE COMPONENT
// ============================================================================

/**
 * InitialsFigure component - Displays initials inside a figure
 * 
 * @param {object} props - Component props
 * @param {string} props.initials - 1-2 character initials to display
 * @param {'awake' | 'dormant' | 'critical' | 'warning' | 'success' | 'featured' | 'blue' | 'neutral' | 'red' | 'amber' | 'forest' | 'lavender' | 'cyan' | 'lila' | 'rose' | 'primary' | 'secondary'} props.color - Figure color
 * @param {'light' | 'dark'} [props.mode='light'] - Color mode
 * @param {'rounded' | 'squared'} [props.shape='rounded'] - Figure shape
 * @param {'SM' | 'MD' | 'MDPlus' | 'LG' | 'XL'} [props.size='MD'] - Figure size
 */
const InitialsFigure = forwardRef(function InitialsFigure(
  {
    initials,
    color,
    mode = 'light',
    size = 'MD',
    ...props
  },
  ref
) {
  const configuration = sizeMap[size];
  const textColorValue = getTextColorValue(color, mode);
  const truncated = initials?.substring(0, 2)?.toLocaleUpperCase();
  
  // Determine text styling based on size
  const textStyle = isHeading(configuration)
    ? {
        fontSize: '23px',
        lineHeight: '32px',
        fontWeight: 600,
        cursor: 'default',
        color: textColorValue,
      }
    : {
        cursor: 'default',
        color: textColorValue,
      };

  return (
    <BaseFigure 
      color={color} 
      mode={mode} 
      size={size} 
      ref={ref} 
      role="img" 
      {...props}
    >
      {isHeading(configuration) ? (
        <span style={textStyle}>{truncated}</span>
      ) : (
        <Text 
          type={configuration.textType} 
          style={textStyle}
        >
          {truncated}
        </Text>
      )}
    </BaseFigure>
  );
});

InitialsFigure.displayName = 'InitialsFigure';

// ============================================================================
// IMAGE FIGURE COMPONENT
// ============================================================================

/**
 * ImageFigure component - Displays an image inside a figure
 * 
 * @param {object} props - Component props
 * @param {string} props.src - Image source URL
 * @param {string} props.alt - Image alt text
 * @param {'rounded' | 'squared'} [props.shape='rounded'] - Figure shape
 * @param {'SM' | 'MD' | 'MDPlus' | 'LG' | 'XL'} [props.size='MD'] - Figure size
 * @param {function} [props.onError] - Error handler for image load failure
 * @param {function} [props.fallback] - Fallback component to render on error
 */
const ImageFigure = forwardRef(function ImageFigure(
  {
    src,
    alt,
    onError,
    fallback,
    size = 'MD',
    shape = 'rounded',
    ...props
  },
  ref
) {
  const configuration = sizeMap[size];
  const [error, setError] = useState(false);
  
  const handleOnError = onError ?? (fallback ? () => setError(true) : undefined);

  if (error && fallback) {
    return fallback?.();
  }

  const borderRadius = shape === 'rounded' ? '50%' : '8px';

  return (
    <BaseFigure 
      color="neutral" 
      mode="dark" 
      size={size} 
      shape={shape} 
      ref={ref} 
      {...props}
    >
      <img
        src={src}
        alt={alt}
        onError={handleOnError}
        width={configuration.size}
        height={configuration.size}
        style={{ 
          borderRadius,
          objectFit: 'cover',
        }}
      />
    </BaseFigure>
  );
});

ImageFigure.displayName = 'ImageFigure';

// ============================================================================
// ICON FIGURE COMPONENT
// ============================================================================

import { Icon } from './Icon';

/**
 * IconFigure component - Displays an icon inside a figure
 * 
 * Available icons from maze-m-icons font include:
 * sparkles, idea, goal, folder, message, layers, prototype, figma,
 * settings, user, team, star, heart, dashboard, edit, plus, search,
 * checkmark, cross, eye, home, mail, link, and many more.
 * 
 * @param {object} props - Component props
 * @param {string} props.name - Icon name (e.g., 'sparkles', 'folder', 'message')
 * @param {'awake' | 'dormant' | 'critical' | 'warning' | 'success' | 'featured' | 'blue' | 'neutral' | 'red' | 'amber' | 'forest' | 'lavender' | 'cyan' | 'lila' | 'rose' | 'primary' | 'secondary'} props.color - Figure color
 * @param {'light' | 'dark'} [props.mode='light'] - Color mode
 * @param {'rounded' | 'squared'} [props.shape='rounded'] - Figure shape
 * @param {'SM' | 'MD' | 'MDPlus' | 'LG' | 'XL'} [props.size='MD'] - Figure size
 * @param {string} [props.alt] - Accessible description for the icon
 */
const IconFigure = forwardRef(function IconFigure(
  {
    name,
    color,
    mode = 'light',
    size = 'MD',
    alt,
    ...props
  },
  ref
) {
  const configuration = sizeMap[size];
  const textColorValue = getTextColorValue(color, mode);

  const a11yProps = alt
    ? { 'aria-label': alt, role: 'img' }
    : { role: 'presentation' };

  return (
    <BaseFigure 
      color={color} 
      mode={mode} 
      size={size} 
      ref={ref} 
      {...a11yProps} 
      {...props}
    >
      <Icon 
        name={name} 
        size={configuration.iconSize} 
        color={textColorValue} 
      />
    </BaseFigure>
  );
});

IconFigure.displayName = 'IconFigure';

// ============================================================================
// FIGURE STACK COMPONENT
// ============================================================================

/**
 * FigureStack component - Stacks multiple figures with overlap
 * 
 * @param {object} props - Component props
 * @param {'SM' | 'MD' | 'MDPlus' | 'LG' | 'XL'} props.size - Figure size
 * @param {'rounded' | 'squared'} [props.shape='rounded'] - Figure shape
 * @param {string} [props.backgroundColor='default.main.background'] - Background color for borders
 * @param {'ltr' | 'rtl'} [props.direction='ltr'] - Stack direction
 * @param {React.ReactNode} props.children - Figure components to stack
 */
const FigureStack = forwardRef(function FigureStack(
  {
    size,
    shape = 'rounded',
    direction = 'ltr',
    backgroundColor = 'default.main.background',
    children,
    className,
    ...props
  },
  ref
) {
  const borderColorValue = colorValues[backgroundColor] || '#FFFFFF';
  const stackSize = Children.count(children);
  const { stackBorder, stackOffset } = sizeMap[size];

  return (
    <Flex ref={ref} className={className} {...props}>
      {Children.map(children, (child, index) => {
        if (!isValidElement(child)) return null;
        
        // Don't add border to first (ltr) or last (rtl) element
        const hasBorder = (direction === 'ltr' && index > 0) || (direction === 'rtl' && index < stackSize - 1);
        const border = hasBorder ? `${stackBorder}px solid ${borderColorValue}` : undefined;
        
        // Add margin to first (ltr) or last (rtl) element for vertical alignment
        const marginTop = hasBorder ? undefined : `${stackBorder}px`;
        const borderRadius = shape === 'rounded' ? '50%' : `${8 + stackBorder}px`;
        
        // Negative margin creates overlap
        const marginLeft = index > 0 ? `-${stackOffset - (hasBorder ? 0 : stackBorder)}px` : undefined;
        
        // Z-index for correct stacking order
        const zIndex = direction === 'ltr' ? index : stackSize - index - 1;

        return (
          <Box
            style={{
              border,
              marginTop,
              borderRadius,
              marginLeft,
              zIndex,
            }}
          >
            {child}
          </Box>
        );
      })}
    </Flex>
  );
});

FigureStack.displayName = 'FigureStack';

// ============================================================================
// EXPORTS
// ============================================================================

export {
  BaseFigure,
  InitialsFigure,
  ImageFigure,
  IconFigure,
  FigureStack,
  ShapeBadge,
  // Utility exports for advanced usage
  sizeMap as figureSizeMap,
  getBackgroundColor,
  getTextColor,
  getTextColorValue,
};

