/**
 * @component DropdownMenu
 * @description Dropdown menu component using Radix UI primitives.
 * 
 * @source maze-monorepo/packages/ariane/src/components/DropdownMenu/DropdownMenu.tsx
 */
import { forwardRef } from 'react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { cn } from '../lib/utils';

/**
 * CSS styles for DropdownMenu
 */
const dropdownStyles = `
  .ariane-dropdown-content {
    min-width: 180px;
    background-color: #FFFFFF;
    border-radius: 8px;
    padding: 8px 0;
    box-shadow: inset 0px 0px 0px 0.5px rgba(108, 113, 140, 0.28), 
                0px 1px 2px 0px rgba(108, 113, 140, 0.08), 
                0px 2px 8px 0px rgba(108, 113, 140, 0.08), 
                0px 4px 48px 0px rgba(108, 113, 140, 0.08);
    z-index: 100;
    animation: dropdownFadeIn 150ms ease-out;
  }
  @keyframes dropdownFadeIn {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
  }
  .ariane-dropdown-item {
    font-family: 'Inter', system-ui, sans-serif;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: -0.01em;
    color: #000000;
    padding: 8px 16px;
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    outline: none;
    user-select: none;
    transition: background-color 150ms;
  }
  .ariane-dropdown-item:hover,
  .ariane-dropdown-item[data-highlighted] {
    background-color: #F8F8FB;
  }
  .ariane-dropdown-item:active {
    background-color: #E8E8F1;
  }
  .ariane-dropdown-item[data-disabled] {
    color: #9597B0;
    cursor: not-allowed;
    pointer-events: none;
  }
  .ariane-dropdown-item.destructive {
    color: #CC3F4D;
  }
  .ariane-dropdown-item.destructive:hover,
  .ariane-dropdown-item.destructive[data-highlighted] {
    background-color: #FFF6F8;
  }
  .ariane-dropdown-separator {
    height: 1px;
    background-color: rgba(108, 113, 140, 0.28);
    margin: 8px 0;
  }
  .ariane-dropdown-label {
    font-family: 'Inter', system-ui, sans-serif;
    font-size: 12px;
    line-height: 16px;
    font-weight: 600;
    color: #6C718C;
    padding: 8px 16px 4px;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }
`;

/**
 * DropdownMenu component - Ariane design system port
 * A dropdown menu using Radix UI DropdownMenu primitive
 */

/**
 * DropdownMenu Root
 */
const DropdownMenu = DropdownMenuPrimitive.Root;

/**
 * DropdownMenu Trigger
 */
const DropdownMenuTrigger = forwardRef(function DropdownMenuTrigger(
  { className, children, asChild = true, ...props },
  ref
) {
  return (
    <DropdownMenuPrimitive.Trigger
      ref={ref}
      asChild={asChild}
      className={className}
      {...props}
    >
      {children}
    </DropdownMenuPrimitive.Trigger>
  );
});

/**
 * DropdownMenu Content
 */
const DropdownMenuContent = forwardRef(function DropdownMenuContent(
  {
    className,
    sideOffset = 8,
    align = 'end',
    children,
    ...props
  },
  ref
) {
  return (
    <>
      <style>{dropdownStyles}</style>
      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content
          ref={ref}
          sideOffset={sideOffset}
          align={align}
          className={cn('ariane-dropdown-content', className)}
          {...props}
        >
          {children}
        </DropdownMenuPrimitive.Content>
      </DropdownMenuPrimitive.Portal>
    </>
  );
});

/**
 * DropdownMenu Item
 */
const DropdownMenuItem = forwardRef(function DropdownMenuItem(
  {
    className,
    destructive = false,
    disabled = false,
    children,
    ...props
  },
  ref
) {
  return (
    <DropdownMenuPrimitive.Item
      ref={ref}
      disabled={disabled}
      className={cn(
        'ariane-dropdown-item',
        destructive && 'destructive',
        className
      )}
      {...props}
    >
      {children}
    </DropdownMenuPrimitive.Item>
  );
});

/**
 * DropdownMenu Separator
 */
const DropdownMenuSeparator = forwardRef(function DropdownMenuSeparator(
  { className, ...props },
  ref
) {
  return (
    <DropdownMenuPrimitive.Separator
      ref={ref}
      className={cn('ariane-dropdown-separator', className)}
      {...props}
    />
  );
});

/**
 * DropdownMenu Label
 */
const DropdownMenuLabel = forwardRef(function DropdownMenuLabel(
  { className, children, ...props },
  ref
) {
  return (
    <DropdownMenuPrimitive.Label
      ref={ref}
      className={cn('ariane-dropdown-label', className)}
      {...props}
    >
      {children}
    </DropdownMenuPrimitive.Label>
  );
});

/**
 * DropdownMenu Group
 */
const DropdownMenuGroup = DropdownMenuPrimitive.Group;

/**
 * Simple DropdownMenu wrapper (Ariane-compatible API)
 * 
 * @param {object} props - Component props
 * @param {React.ReactNode} props.children - Trigger element
 * @param {Array<{id: string, label: string, onClick?: function, destructive?: boolean, disabled?: boolean, isHidden?: boolean}>} props.menuItems - Menu items
 * @param {'click' | 'hover'} [props.trigger='click'] - Trigger type (click only supported)
 * @param {boolean} [props.arrow=false] - Whether to show arrow (not supported)
 * @param {'bottom-start' | 'bottom-end' | 'top-start' | 'top-end'} [props.placement='bottom-end'] - Menu placement
 * @param {boolean} [props.isVisible] - Controlled visibility
 * @param {function} [props.onHide] - Called when menu closes
 * @param {function} [props.onOpen] - Called when menu opens
 * @param {[number, number]} [props.offset=[0, 0]] - Offset from trigger
 */
const SimpleDropdownMenu = forwardRef(function SimpleDropdownMenu(
  {
    children,
    menuItems = [],
    trigger = 'click',
    arrow = false,
    placement = 'bottom-end',
    isVisible,
    onHide,
    onOpen,
    offset = [0, 0],
    className,
    ...props
  },
  ref
) {
  // Map placement to Radix side/align
  const [side, align] = placement.split('-');
  const radixSide = side === 'top' ? 'top' : 'bottom';
  const radixAlign = align === 'start' ? 'start' : 'end';

  const handleOpenChange = (open) => {
    if (open) {
      onOpen?.();
    } else {
      onHide?.();
    }
  };

  return (
    <DropdownMenu open={isVisible} onOpenChange={handleOpenChange}>
      <DropdownMenuTrigger ref={ref}>
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side={radixSide}
        align={radixAlign}
        sideOffset={offset[1]}
        alignOffset={offset[0]}
        className={className}
        {...props}
      >
        {menuItems.filter(item => !item.isHidden).map((item) => (
          <DropdownMenuItem
            key={item.id || item.label}
            destructive={item.destructive}
            disabled={item.disabled}
            onClick={item.onClick}
          >
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
});

DropdownMenuTrigger.displayName = 'DropdownMenuTrigger';
DropdownMenuContent.displayName = 'DropdownMenuContent';
DropdownMenuItem.displayName = 'DropdownMenuItem';
DropdownMenuSeparator.displayName = 'DropdownMenuSeparator';
DropdownMenuLabel.displayName = 'DropdownMenuLabel';
SimpleDropdownMenu.displayName = 'SimpleDropdownMenu';

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuGroup,
  SimpleDropdownMenu,
};

