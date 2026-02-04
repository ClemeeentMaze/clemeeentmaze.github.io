/**
 * @component Annotation
 * @description Developer handover annotation component that displays a dot indicator,
 * dotted outline, and click-triggered popup for adding notes to prototype elements.
 * 
 * Uses a ref-based approach where annotations are stored separately and attached
 * to target elements via refs.
 * 
 * @example
 * const buttonRef = useRef();
 * 
 * <CTAButton ref={buttonRef}>Submit</CTAButton>
 * <Annotation targetRef={buttonRef}>
 *   This button needs a loading state when clicked
 * </Annotation>
 */
import { forwardRef, useState, useLayoutEffect, useCallback, useContext } from 'react';
import * as Popover from '@radix-ui/react-popover';
import { cn } from '../lib/utils';
import { Tag } from './Tag';
import AnnotationContext from '../../../context/AnnotationContext';

/**
 * CSS styles for the Annotation component
 */
const annotationStyles = `
  .annotation-dot {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    cursor: pointer;
    position: fixed;
    z-index: 9999;
    transition: transform 0.15s ease-out;
    /* Visual dot is rendered via ::after pseudo-element */
    background: transparent;
  }
  
  .annotation-dot::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: var(--dot-color);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    transition: transform 0.15s ease-out, box-shadow 0.15s ease-out;
  }
  
  .annotation-dot:hover::after {
    transform: translate(-50%, -50%) scale(1.15);
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.3);
  }
  
  .annotation-dot:focus {
    outline: none;
  }
  
  .annotation-dot:focus::after {
    outline: 2px solid rgba(59, 130, 246, 0.5);
    outline-offset: 2px;
  }
  
  .annotation-outline {
    position: fixed;
    pointer-events: none;
    z-index: 9998;
    border: 2px dashed #BB3DB0;
    border-radius: 4px;
    transition: all 0.2s ease-out;
  }
  
  .annotation-outline.highlighted {
    border: 2px solid #BB3DB0;
    box-shadow: 0 0 0 2px rgba(187, 61, 176, 0.15);
    animation: outlinePulse 2s ease-in-out infinite;
  }
  
  .annotation-dot.highlighted::after {
    transform: translate(-50%, -50%) scale(1.2);
    box-shadow: 0 0 0 3px rgba(187, 61, 176, 0.2), 0 3px 8px rgba(0, 0, 0, 0.25);
  }
  
  @keyframes outlinePulse {
    0%, 100% { box-shadow: 0 0 0 2px rgba(187, 61, 176, 0.15); }
    50% { box-shadow: 0 0 0 4px rgba(187, 61, 176, 0.1); }
  }
  
  .annotation-popover-content {
    font-family: 'Inter', system-ui, sans-serif;
    font-size: 12px;
    line-height: 16px;
    color: #fecdd3;
    background: #2d1a2a;
    border: 1px solid #6b3060;
    border-radius: 4px;
    padding: 12px;
    min-width: 200px;
    max-width: 320px;
    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.4), 
                0px 8px 32px rgba(0, 0, 0, 0.3);
    z-index: 10000;
    animation: annotationPopoverIn 0.2s ease-out;
  }
  
  .annotation-popover-content strong,
  .annotation-popover-content .annotation-title {
    font-weight: 500;
    display: block;
    margin-bottom: 2px;
    color: #ffe4e6;
  }
  
  .annotation-popover-content p,
  .annotation-popover-content .annotation-body {
    font-weight: 400;
    margin: 0;
    color: #fecdd3;
  }
  
  @keyframes annotationPopoverIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

/**
 * Default annotation dot color (rose500 from Ariane design system)
 */
const DEFAULT_DOT_COLOR = '#BB3DB0';

/**
 * Resolves color value - uses default rose color
 * @returns {string} - CSS color value
 */
const resolveColor = () => DEFAULT_DOT_COLOR;

/**
 * Annotation component - Displays a dot indicator with popup for developer notes
 * 
 * @param {object} props - Component props
 * @param {string} [props.id] - Unique identifier for the annotation (used for highlighting)
 * @param {React.RefObject} props.targetRef - Ref to the target element to annotate
 * @param {React.ReactNode} props.children - Annotation content (text or JSX)
 * @param {string} [props.type] - Optional type/category label shown as a tag above the title
 * @param {boolean} [props.showOutline=true] - Whether to show dotted outline on target
 * @param {string} [props.className] - Additional CSS classes for the popover content
 * @param {React.Ref} ref - Forwarded ref
 */
const Annotation = forwardRef(function Annotation(
  {
    id,
    targetRef,
    children,
    type,
    showOutline = true,
    className,
    ...props
  },
  ref
) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0, height: 0 });
  const dotColor = resolveColor();
  
  // Get annotation visibility and highlight state from context
  const annotationContext = useContext(AnnotationContext);
  const isVisible = annotationContext?.showAnnotations ?? true;
  const highlightedId = annotationContext?.highlightedAnnotationId;
  const setHighlightedAnnotationId = annotationContext?.setHighlightedAnnotationId;
  const isHighlighted = id && highlightedId === id && !isOpen;

  /**
   * Updates the position of the annotation based on target element's bounding rect
   */
  const updatePosition = useCallback(() => {
    if (!targetRef?.current) return;
    
    const rect = targetRef.current.getBoundingClientRect();
    setPosition({
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
    });
  }, [targetRef]);

  /**
   * Effect to track target element position on mount, scroll, and resize
   */
  useLayoutEffect(() => {
    updatePosition();

    // Update position on scroll and resize
    window.addEventListener('scroll', updatePosition, true);
    window.addEventListener('resize', updatePosition);

    return () => {
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
    };
  }, [updatePosition]);

  // Don't render if hidden or no target ref
  if (!isVisible || !targetRef?.current) {
    return null;
  }

  // Calculate dot position (top-right corner, offset to be outside element)
  // Clickable area is 32px, visual dot is 16px centered within
  const dotStyle = {
    top: position.top - 16, // Half of clickable area to center on corner
    left: position.left + position.width - 16, // Half of clickable area to center on corner
    '--dot-color': dotColor,
  };

  // Calculate outline position
  const outlineStyle = {
    top: position.top,
    left: position.left,
    width: position.width,
    height: position.height,
  };

  return (
    <>
      <style>{annotationStyles}</style>
      
      {/* Dotted outline on target element */}
      {showOutline && (
        <div 
          className={cn('annotation-outline', isHighlighted && 'highlighted')}
          style={outlineStyle}
          aria-hidden="true"
        />
      )}
      
      {/* Dot indicator with popover */}
      <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
        <Popover.Trigger asChild>
          <button
            ref={ref}
            className={cn('annotation-dot', isHighlighted && 'highlighted')}
            style={dotStyle}
            aria-label="View annotation"
            {...props}
          />
        </Popover.Trigger>
        
        <Popover.Portal>
          <Popover.Content
            className={cn('annotation-popover-content', className)}
            side="top"
            align="end"
            sideOffset={8}
            collisionPadding={16}
            avoidCollisions={true}
          >
            {type && (
              <Tag 
                bg="#BB3DB0"
                color="#FFFFFF"
                height="20px"
                lineHeight="20px"
                fontSize="10px"
                borderRadius="4px"
                className="mb-[8px]"
              >
                {type}
              </Tag>
            )}
            {children}
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </>
  );
});

Annotation.displayName = 'Annotation';

export { Annotation };

