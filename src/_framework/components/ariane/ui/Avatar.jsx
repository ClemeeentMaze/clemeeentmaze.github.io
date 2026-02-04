/**
 * @component Avatar
 * @description Circular avatar component for user profile images or initials.
 * 
 * @source maze-monorepo/packages/ariane/src/components/Avatar/Avatar.tsx
 */
import { forwardRef } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../lib/utils';

/**
 * Avatar size variants matching Ariane
 */
const avatarVariants = cva(
  // Base styles
  "rounded-full flex items-center justify-center overflow-hidden",
  {
    variants: {
      size: {
        xs: "w-[24px] h-[24px]",
        sm: "w-[36px] h-[36px]",
        m: "w-[40px] h-[40px]",
        lg: "w-[50px] h-[50px]",
        xl: "w-[60px] h-[60px]",
      },
    },
    defaultVariants: {
      size: "m",
    },
  }
);

/**
 * Avatar initials text variants
 */
const initialsVariants = cva(
  // Base styles
  "pointer-events-none font-semibold",
  {
    variants: {
      size: {
        xs: "text-[10px] font-sans",
        sm: "text-[14px]",
        m: "text-[16px]",
        lg: "text-[18px]",
        xl: "text-[16px] font-bold",
      },
    },
    defaultVariants: {
      size: "m",
    },
  }
);

/**
 * Color token mapping
 */
const colorMap = {
  neutral000: '#FFFFFF',
  neutral900: '#000000',
};

const getColorValue = (color) => colorMap[color] || color;

/**
 * Avatar component - Ariane design system port
 * 
 * @param {object} props - Component props
 * @param {React.ReactNode} props.children - Avatar content (initials text or custom element)
 * @param {'xs' | 'sm' | 'm' | 'lg' | 'xl' | string} [props.size='m'] - Avatar size
 * @param {string} [props.bg='#000000'] - Background color
 * @param {string} [props.color='#FFFFFF'] - Text color
 * @param {string} [props.borderColor] - Border color (renders as box-shadow ring)
 * @param {boolean} [props.displayImage=false] - If true, display image instead of initials
 * @param {string} [props.imageUrl] - Image URL when displayImage is true
 * @param {function} [props.onClick] - Click handler
 * @param {string} [props.dataE2e] - E2E test attribute
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.Ref} ref - Forwarded ref
 */
const Avatar = forwardRef(function Avatar(
  {
    children,
    size = 'm',
    bg = '#000000', // neutral900
    color = '#FFFFFF', // neutral000
    borderColor,
    displayImage = false,
    imageUrl,
    onClick,
    dataE2e,
    className,
    ...props
  },
  ref
) {
  // Handle custom size (not in predefined variants)
  const isCustomSize = !['xs', 'sm', 'm', 'lg', 'xl'].includes(size);
  const bgValue = getColorValue(bg);
  const colorValue = getColorValue(color);
  const borderColorValue = borderColor ? getColorValue(borderColor) : undefined;

  const customSizeStyle = isCustomSize ? {
    width: size,
    height: size,
  } : {};

  return (
    <div
      ref={ref}
      data-e2e={dataE2e}
      className={cn(
        avatarVariants({ size: isCustomSize ? undefined : size }),
        onClick && 'cursor-pointer',
        className
      )}
      style={{
        backgroundColor: displayImage ? undefined : bgValue,
        boxShadow: borderColorValue ? `0 0 0 2px ${borderColorValue}` : undefined,
        ...customSizeStyle,
      }}
      onClick={onClick}
      {...props}
    >
      {displayImage ? (
        <img
          src={imageUrl}
          alt=""
          className="w-full h-full object-cover rounded-full"
        />
      ) : typeof children === 'string' ? (
        <span
          className={cn(initialsVariants({ size: isCustomSize ? 'm' : size }))}
          style={{ color: colorValue }}
        >
          {children}
        </span>
      ) : (
        children
      )}
    </div>
  );
});

Avatar.displayName = 'Avatar';

export { Avatar, avatarVariants };

