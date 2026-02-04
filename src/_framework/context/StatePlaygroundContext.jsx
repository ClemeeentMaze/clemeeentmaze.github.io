/**
 * @context StatePlaygroundContext
 * @description Provides state management for the State Playground feature.
 * Allows prototypes to define StateControls that appear in a visual panel,
 * enabling designers to explore different states without code changes.
 * 
 * State values are synced to URL search params for shareability.
 */
import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

/**
 * State Playground Context
 */
const StatePlaygroundContext = createContext({
  stateControls: null,
  state: {},
  setState: () => {},
  setStateValue: () => {},
  resetState: () => {},
  setStateControls: () => {},
});

/**
 * Parses state from URL search params
 * @param {URLSearchParams} searchParams - URL search params
 * @param {object} stateControls - The StateControls schema
 * @returns {object} Parsed state values
 */
function parseStateFromParams(searchParams, stateControls) {
  if (!stateControls) return {};
  
  const state = {};
  const stateParam = searchParams.get('playgroundState');
  
  if (stateParam) {
    try {
      // Parse format: key1:value1,key2:value2
      stateParam.split(',').forEach(pair => {
        const [key, value] = pair.split(':');
        if (key && value !== undefined && stateControls[key]) {
          const control = stateControls[key];
          // Parse value based on control type
          if (control.type === 'toggle') {
            state[key] = value === 'true';
          } else if (control.type === 'range') {
            state[key] = parseFloat(value);
          } else {
            state[key] = value;
          }
        }
      });
    } catch {
      // If parsing fails, return empty state
    }
  }
  
  return state;
}

/**
 * Serializes state to URL param format
 * @param {object} state - Current state values
 * @param {object} stateControls - The StateControls schema
 * @returns {string} Serialized state string
 */
function serializeStateToParam(state, stateControls) {
  if (!stateControls || !state) return '';
  
  const pairs = [];
  Object.entries(state).forEach(([key, value]) => {
    if (stateControls[key]) {
      // Only include non-default values
      const defaultValue = stateControls[key].default;
      if (value !== defaultValue) {
        pairs.push(`${key}:${value}`);
      }
    }
  });
  
  return pairs.join(',');
}

/**
 * Gets default state values from StateControls schema
 * @param {object} stateControls - The StateControls schema
 * @returns {object} Default state values
 */
function getDefaultState(stateControls) {
  if (!stateControls) return {};
  
  const defaults = {};
  Object.entries(stateControls).forEach(([key, control]) => {
    defaults[key] = control.default;
  });
  return defaults;
}

/**
 * Provider component for State Playground
 * @param {object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 */
export function StatePlaygroundProvider({ children }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [stateControls, setStateControls] = useState(null);
  const [state, setStateInternal] = useState({});

  /**
   * Updates state controls and initializes state
   * Called when prototype changes or mounts
   */
  const setStateControlsAndInit = useCallback((controls) => {
    setStateControls(controls);
    
    if (controls) {
      // Get defaults, then overlay URL params
      const defaults = getDefaultState(controls);
      const fromParams = parseStateFromParams(searchParams, controls);
      setStateInternal({ ...defaults, ...fromParams });
    } else {
      setStateInternal({});
    }
  }, [searchParams]);

  /**
   * Updates a single state value
   * @param {string} key - The state key to update
   * @param {any} value - The new value
   */
  const setStateValue = useCallback((key, value) => {
    setStateInternal(prev => {
      const newState = { ...prev, [key]: value };
      return newState;
    });
  }, []);

  /**
   * Updates multiple state values at once
   * @param {object} newState - Object with state updates
   */
  const setState = useCallback((newState) => {
    setStateInternal(prev => ({ ...prev, ...newState }));
  }, []);

  /**
   * Resets state to defaults
   */
  const resetState = useCallback(() => {
    if (stateControls) {
      setStateInternal(getDefaultState(stateControls));
    }
  }, [stateControls]);

  /**
   * Sync state to URL params when state changes
   */
  useEffect(() => {
    if (!stateControls) return;
    
    const serialized = serializeStateToParam(state, stateControls);
    const currentParam = searchParams.get('playgroundState');
    
    // Only update if changed
    if (serialized !== currentParam) {
      const newParams = new URLSearchParams(searchParams);
      if (serialized) {
        newParams.set('playgroundState', serialized);
      } else {
        newParams.delete('playgroundState');
      }
      setSearchParams(newParams, { replace: true });
    }
  }, [state, stateControls, searchParams, setSearchParams]);

  return (
    <StatePlaygroundContext.Provider 
      value={{ 
        stateControls,
        state,
        setState,
        setStateValue,
        resetState,
        setStateControls: setStateControlsAndInit,
      }}
    >
      {children}
    </StatePlaygroundContext.Provider>
  );
}

/**
 * Hook to access State Playground context
 * @returns {object} State Playground context value
 */
export function useStatePlaygroundContext() {
  const context = useContext(StatePlaygroundContext);
  if (!context) {
    throw new Error('useStatePlaygroundContext must be used within a StatePlaygroundProvider');
  }
  return context;
}

export default StatePlaygroundContext;

