import { Suspense, useEffect, useRef } from "react";
import { useNavigate, useLocation, Routes, Route } from "react-router-dom";
import { usePrototypes } from "../hooks/usePrototypes";
import { prototypeEntries } from "@framework/core/prototype-utils";
import PrototypeSelector from "./PrototypeSelector";
import { Text, Heading, Flex } from "./ariane";

// Base title shown when no prototype is selected
const BASE_TITLE = "AI Prototyping";

/**
 * MainContent handles prototype selection, preview mode, and routing.
 */
function MainContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const { prototypes, archivedPrototypes } = usePrototypes();
  const prototypeContainerRef = useRef(null);

  // Check for "full-preview" in the URL search params
  const searchParams = new URLSearchParams(location.search);
  const isFullPreview = searchParams.has("full-preview");

  /**
   * Reset scroll position to top when switching prototypes.
   */
  useEffect(() => {
    if (prototypeContainerRef.current) {
      prototypeContainerRef.current.scrollTo(0, 0);
    }
  }, [location.pathname]);

  /**
   * Update the browser tab title based on the selected prototype.
   * Falls back to BASE_TITLE when no prototype is selected.
   */
  useEffect(() => {
    // Check both regular and archived prototypes for the current path
    const currentPrototype = prototypes.items.find(
      (item) => item.value === location.pathname
    ) || archivedPrototypes.items.find(
      (item) => item.value === location.pathname
    );
    
    if (currentPrototype) {
      document.title = `${currentPrototype.label} | ${BASE_TITLE}`;
    } else {
      document.title = BASE_TITLE;
    }
    
    // Cleanup: reset title when component unmounts
    return () => {
      document.title = BASE_TITLE;
    };
  }, [location.pathname, prototypes.items, archivedPrototypes.items]);

  const handleValueChange = (selectedValue) => {
    if (selectedValue) {
      navigate(selectedValue);
    }
  };

  // Empty state component for when no prototype is selected
  function EmptyState() {
    return (
      <Flex
        alignItems="center"
        justifyContent="center"
        className="w-full h-full"
      >
        <div className="text-center max-w-sm">
          <Heading level={2} className="mb-md text-center">
            No prototype selected
          </Heading>
          <Text color="default.main.secondary" className="text-center">
            To get started, select a prototype from the panel on the right.
          </Text>
        </div>
      </Flex>
    );
  }

  return (
    <div className="flex w-screen h-screen">
      {/* Prototype container - isolated, takes remaining space */}
      <div
        ref={prototypeContainerRef}
        className="flex-1 relative overflow-auto bg-neutral-200"
      >
        <Suspense fallback={<div className="p-lg">Loading...</div>}>
          <Routes>
            {/* Prototype routes (includes both active and archived) */}
            {prototypeEntries.map(({ path, component: Component }) => (
              <Route key={path} path={path} element={<Component />} />
            ))}
            {/* Empty state route: shown when no prototype is selected */}
            <Route path="*" element={!isFullPreview ? <EmptyState /> : null} />
          </Routes>
        </Suspense>
      </div>

      {/* Inspector panel - fixed width, right side */}
      {!isFullPreview && (
        <PrototypeSelector
          prototypes={prototypes}
          archivedPrototypes={archivedPrototypes}
          value={location.pathname}
          onValueChange={handleValueChange}
        />
      )}
    </div>
  );
}

export default MainContent;
