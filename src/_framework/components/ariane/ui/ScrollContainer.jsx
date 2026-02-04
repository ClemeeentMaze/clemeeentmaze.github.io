import * as React from "react";
import { cn } from "../lib/utils";

/**
 * ScrollContainer provides a scrollable area with minimal, elegant scrollbars
 * that appear only on hover. Use this instead of overflow-auto for consistent
 * scrollbar styling across the application.
 *
 * @param {object} props
 * @param {React.ReactNode} props.children - Content to be scrollable
 * @param {string} [props.className] - Additional CSS classes
 * @param {"vertical" | "horizontal" | "both"} [props.direction="vertical"] - Scroll direction
 */
const ScrollContainer = React.forwardRef(
  ({ children, className, direction = "vertical", ...props }, ref) => {
    const overflowClasses = {
      vertical: "overflow-y-auto overflow-x-hidden",
      horizontal: "overflow-x-auto overflow-y-hidden",
      both: "overflow-auto",
    };

    return (
      <div
        ref={ref}
        className={cn(
          // Base scrollable styles
          overflowClasses[direction],
          // Minimal scrollbar styling (WebKit/Blink browsers)
          "[&::-webkit-scrollbar]:w-1.5",
          "[&::-webkit-scrollbar]:h-1.5",
          "[&::-webkit-scrollbar-track]:bg-transparent",
          "[&::-webkit-scrollbar-thumb]:bg-neutral-400/40",
          "[&::-webkit-scrollbar-thumb]:rounded-full",
          "[&::-webkit-scrollbar-thumb]:hover:bg-neutral-400/60",
          // Hide scrollbar until hover (optional - can remove if always visible preferred)
          "[&::-webkit-scrollbar-thumb]:opacity-0",
          "hover:[&::-webkit-scrollbar-thumb]:opacity-100",
          "[&::-webkit-scrollbar-thumb]:transition-opacity",
          // Firefox scrollbar styling
          "scrollbar-thin",
          "scrollbar-track-transparent",
          "scrollbar-thumb-neutral-400/40",
          "hover:scrollbar-thumb-neutral-400/60",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ScrollContainer.displayName = "ScrollContainer";

export { ScrollContainer };
