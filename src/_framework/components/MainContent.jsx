import { Suspense, useEffect, useRef, useState, useMemo } from "react";
import { useNavigate, useLocation, Routes, Route } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { usePrototypes } from "../hooks/usePrototypes";
import { prototypeEntries } from "../core/prototype-utils";
import PrototypeSelector from "./PrototypeSelector";
import { Tooltip, Icon, ScrollContainer } from "./ariane";
import { Link2, Check, ChevronRight, ChevronDown } from "lucide-react";

// Base title shown when no prototype is selected
const BASE_TITLE = "AI Prototyping";

/** Default stroke width for Lucide icons */
const ICON_STROKE_WIDTH = 1.75;

/**
 * Individual prototype card component - matches right panel styling.
 * @param {object} props
 * @param {object} props.prototype - Prototype data with label, value, description
 * @param {boolean} props.isCopied - Whether the link was just copied
 * @param {function} props.onClick - Click handler
 * @param {function} props.onCopyLink - Handler for copying preview link
 */
function PrototypeCard({ prototype, isCopied, onClick, onCopyLink }) {
  return (
    <button
      onClick={onClick}
      className="flex items-start justify-between gap-xs p-md rounded bg-[#2d2d2d] hover:bg-[#3c3c3c] transition-colors text-left w-full cursor-pointer"
    >
      <div className="flex-1 min-w-0">
        <span className="block text-sm text-neutral-300">
          {prototype.label}
        </span>
        {prototype.description && (
          <span className="text-xs text-neutral-500 mt-sm line-clamp-2 overflow-hidden">
            {prototype.description}
          </span>
        )}
      </div>
      <Tooltip 
        label={isCopied ? "Copied!" : "Copy preview link"} 
        placement="top"
        delayDuration={200}
        type="light"
      >
        <div
          role="button"
          tabIndex={0}
          onClick={(e) => {
            e.stopPropagation();
            onCopyLink(prototype.value);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.stopPropagation();
              onCopyLink(prototype.value);
            }
          }}
          className="p-xs rounded text-neutral-400 hover:text-neutral-200 hover:bg-[#4a4a4a] transition-colors shrink-0"
        >
          {isCopied ? (
            <Check size={14} strokeWidth={ICON_STROKE_WIDTH} className="text-green-400" />
          ) : (
            <Link2 size={14} strokeWidth={ICON_STROKE_WIDTH} />
          )}
        </div>
      </Tooltip>
    </button>
  );
}

/**
 * Group section with header and grid of cards.
 * @param {object} props
 * @param {string} props.groupName - Name of the group
 * @param {Array} props.prototypes - Array of prototype objects
 * @param {string|null} props.copiedPath - Path of the prototype whose link was just copied
 * @param {function} props.onCardClick - Handler for card clicks
 * @param {function} props.onCopyLink - Handler for copying preview link
 */
function PrototypeGroup({ groupName, prototypes, copiedPath, onCardClick, onCopyLink }) {
  return (
    <div className="mb-lg">
      {/* Group Header */}
      <span className="block text-xs text-neutral-500 mb-sm">
        {groupName}
      </span>
      
      {/* Cards Grid - 4 columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-xs">
        {prototypes.map((prototype) => (
          <PrototypeCard
            key={prototype.value}
            prototype={prototype}
            isCopied={copiedPath === prototype.value}
            onClick={() => onCardClick(prototype.value)}
            onCopyLink={onCopyLink}
          />
        ))}
      </div>
    </div>
  );
}

/**
 * Empty state component displayed when no prototype is selected.
 * Shows a grid of prototype cards organized by groups.
 * @param {object} props
 * @param {object} props.prototypes - Prototypes data with ungrouped and groups
 * @param {object} props.archivedPrototypes - Archived prototypes data
 * @param {function} props.onNavigate - Handler for navigating to a prototype
 */
function EmptyState({ prototypes, archivedPrototypes, onNavigate }) {
  const [copiedPath, setCopiedPath] = useState(null);
  const [showArchived, setShowArchived] = useState(false);
  
  const groupNames = Object.keys(prototypes.groups || {});
  const ungroupedItems = prototypes.ungrouped || [];
  const archivedItems = archivedPrototypes?.items || [];

  /**
   * Generates the full preview URL for a prototype.
   * @param {string} prototypePath - The prototype path
   * @returns {string} Full preview URL
   */
  const getFullPreviewUrl = (prototypePath) => {
    const cleanPath = (prototypePath || "").replace(/^\//, "");
    return `${window.location.origin}/${cleanPath}?full-preview`;
  };

  /**
   * Copies the full preview URL to clipboard.
   * @param {string} prototypePath - The prototype path
   */
  const handleCopyLink = async (prototypePath) => {
    const url = getFullPreviewUrl(prototypePath);
    try {
      await navigator.clipboard.writeText(url);
      setCopiedPath(prototypePath);
      setTimeout(() => setCopiedPath(null), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  return (
    <div className="w-full h-full min-h-full bg-[#1e1e1e]">
      {/* Centered container with max width */}
      <div className="max-w-5xl mx-auto p-lg">
        {/* Page Header */}
        <div className="flex items-start justify-between mb-lg">
          <div>
            <span className="block text-sm text-neutral-300 mb-xs">
              Prototypes
            </span>
            <span className="block text-xs text-neutral-500">
              Select a prototype to preview
            </span>
          </div>
          <Icon name="maze-logo" size="24px" className="text-neutral-400" />
        </div>
        
        {/* Grouped Prototypes */}
        {groupNames.map((groupName) => (
          <PrototypeGroup
            key={groupName}
            groupName={groupName}
            prototypes={prototypes.groups[groupName]}
            copiedPath={copiedPath}
            onCardClick={onNavigate}
            onCopyLink={handleCopyLink}
          />
        ))}

        {/* Ungrouped Prototypes - Always at the bottom, above archived */}
        {ungroupedItems.length > 0 && (
          <PrototypeGroup
            groupName="Ungrouped"
            prototypes={ungroupedItems}
            copiedPath={copiedPath}
            onCardClick={onNavigate}
            onCopyLink={handleCopyLink}
          />
        )}

        {/* Archived Prototypes - Accordion */}
        {archivedItems.length > 0 && (
          <div className="mt-lg pt-lg border-t border-[#3c3c3c]">
            <button
              onClick={() => setShowArchived(!showArchived)}
              className="flex items-center gap-xs w-full text-left mb-sm hover:opacity-80 transition-opacity"
            >
              {showArchived ? (
                <ChevronDown size={14} strokeWidth={ICON_STROKE_WIDTH} className="text-neutral-500" />
              ) : (
                <ChevronRight size={14} strokeWidth={ICON_STROKE_WIDTH} className="text-neutral-500" />
              )}
              <span className="text-xs text-neutral-500">
                Archived ({archivedItems.length})
              </span>
            </button>
            
            {showArchived && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-xs">
                {archivedItems.map((prototype) => (
                  <PrototypeCard
                    key={prototype.value}
                    prototype={prototype}
                    isCopied={copiedPath === prototype.value}
                    onClick={() => onNavigate(prototype.value)}
                    onCopyLink={handleCopyLink}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

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
   * Handle GitHub Pages SPA redirect.
   * When 404.html redirects to /?redirect=/path, navigate to the correct route.
   */
  useEffect(() => {
    const redirectPath = searchParams.get("redirect");
    if (redirectPath) {
      // Remove the redirect param from URL and navigate to the intended path
      navigate(decodeURIComponent(redirectPath), { replace: true });
    }
  }, []);

  /**
   * Determine if a prototype is currently selected by checking if
   * the current path matches any prototype route.
   */
  const hasPrototypeSelected = useMemo(() => {
    const allPaths = prototypeEntries.map(e => e.path);
    return allPaths.some(path => location.pathname === path);
  }, [location.pathname]);

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

  return (
    <div className="flex w-screen h-screen overflow-hidden">
      {/* Prototype viewport - isolated container with CSS containment */}
      <div
        ref={prototypeContainerRef}
        className="flex-1 flex flex-col min-w-0 h-full [contain:strict] isolation-isolate"
      >
        <ScrollContainer className="flex-1 overscroll-contain">
          <Suspense fallback={<div className="p-lg">Loading...</div>}>
            <Routes>
              {/* Prototype routes (includes both active and archived) */}
              {prototypeEntries.map(({ path, component: Component }) => (
                <Route key={path} path={path} element={
                  <div className="min-h-full bg-neutral-200">
                    <Component />
                  </div>
                } />
              ))}
              {/* Empty state route: shown when no prototype is selected */}
              <Route path="*" element={!isFullPreview ? (
                <EmptyState 
                  prototypes={prototypes} 
                  archivedPrototypes={archivedPrototypes}
                  onNavigate={handleValueChange}
                />
              ) : null} />
            </Routes>
          </Suspense>
        </ScrollContainer>
      </div>

      {/* Inspector panel - fixed width, right side, animates in when prototype is selected */}
      <AnimatePresence>
        {!isFullPreview && hasPrototypeSelected && (
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 280 }}
            exit={{ width: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 400, 
              damping: 35,
              mass: 0.8
            }}
            className="shrink-0 overflow-hidden h-full"
          >
            <div className="w-[280px] h-full">
              <PrototypeSelector
                prototypes={prototypes}
                archivedPrototypes={archivedPrototypes}
                value={location.pathname}
                onValueChange={handleValueChange}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default MainContent;
