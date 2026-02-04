import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to merge Tailwind CSS classes with clsx.
 * Combines clsx for conditional classes and tailwind-merge for conflict resolution.
 * @param {...(string|object|array)} inputs - Class values to merge
 * @returns {string} Merged class string
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}





