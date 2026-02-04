/**
 * @hook useStatePlayground
 * @description Hook for prototypes to access State Playground state values.
 * 
 * Usage:
 * 1. Define StateControls on your prototype component
 * 2. Import and use this hook to get state values
 * 
 * @example
 * // Define controls
 * MyPrototype.StateControls = {
 *   viewState: { type: 'select', options: ['default', 'loading'], default: 'default' },
 *   itemCount: { type: 'range', min: 0, max: 20, default: 5 }
 * };
 * 
 * // Use in component
 * function MyPrototype() {
 *   const { state } = useStatePlayground();
 *   const { viewState, itemCount } = state;
 *   // ...
 * }
 */
import { useStatePlaygroundContext } from '../context/StatePlaygroundContext';

/**
 * Hook to access State Playground state in prototypes
 * @returns {object} Object containing state values and control functions
 */
export function useStatePlayground() {
  const { state, setState, setStateValue, resetState } = useStatePlaygroundContext();
  
  return {
    /** Current state values from StateControls */
    state,
    /** Update multiple state values at once */
    setState,
    /** Update a single state value */
    setStateValue,
    /** Reset all values to defaults */
    resetState,
  };
}

