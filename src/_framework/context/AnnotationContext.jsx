/**
 * @context AnnotationContext
 * @description Provides global state for annotation visibility, data, and scopes.
 * Used by PrototypeSelector to toggle visibility and manage scopes,
 * and by Annotation components to determine whether they should render.
 */
import { createContext, useContext, useState, useCallback } from 'react';

/**
 * Context for annotation state
 */
const AnnotationContext = createContext({
  showAnnotations: false,
  setShowAnnotations: () => {},
  annotations: [],
  scopes: [],
  activeScopes: [],
  setAnnotationData: () => {},
  toggleScope: () => {},
  isScopeActive: () => true,
  highlightedAnnotationId: null,
  setHighlightedAnnotationId: () => {},
});

/**
 * Provider component for annotation state
 * @param {object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 */
export function AnnotationProvider({ children }) {
  const [showAnnotations, setShowAnnotations] = useState(false);
  const [annotations, setAnnotations] = useState([]);
  const [scopes, setScopes] = useState([]);
  const [activeScopes, setActiveScopes] = useState([]);
  const [highlightedAnnotationId, setHighlightedAnnotationId] = useState(null);

  /**
   * Sets annotation data from a prototype's annotations.json
   * @param {object} data - Annotation data { scopes: [], annotations: [] }
   */
  const setAnnotationData = useCallback((data) => {
    if (data) {
      setScopes(data.scopes || []);
      setAnnotations(data.annotations || []);
      // By default, all scopes are active
      setActiveScopes((data.scopes || []).map(s => s.id));
    } else {
      setScopes([]);
      setAnnotations([]);
      setActiveScopes([]);
    }
  }, []);

  /**
   * Toggles a scope's active state
   * @param {string} scopeId - The scope ID to toggle
   */
  const toggleScope = useCallback((scopeId) => {
    setActiveScopes(prev => {
      if (prev.includes(scopeId)) {
        return prev.filter(id => id !== scopeId);
      } else {
        return [...prev, scopeId];
      }
    });
  }, []);

  /**
   * Checks if a scope is currently active
   * @param {string} scopeId - The scope ID to check
   * @returns {boolean}
   */
  const isScopeActive = useCallback((scopeId) => {
    return activeScopes.includes(scopeId);
  }, [activeScopes]);

  /**
   * Gets annotations filtered by active scopes
   */
  const visibleAnnotations = annotations.filter(
    ann => activeScopes.includes(ann.scope)
  );

  return (
    <AnnotationContext.Provider 
      value={{ 
        showAnnotations, 
        setShowAnnotations,
        annotations: visibleAnnotations,
        allAnnotations: annotations,
        scopes,
        activeScopes,
        setAnnotationData,
        toggleScope,
        isScopeActive,
        highlightedAnnotationId,
        setHighlightedAnnotationId,
      }}
    >
      {children}
    </AnnotationContext.Provider>
  );
}

/**
 * Hook to access annotation state
 * @returns {object} Annotation context value
 */
export function useAnnotations() {
  const context = useContext(AnnotationContext);
  if (!context) {
    throw new Error('useAnnotations must be used within an AnnotationProvider');
  }
  return context;
}

export default AnnotationContext;
