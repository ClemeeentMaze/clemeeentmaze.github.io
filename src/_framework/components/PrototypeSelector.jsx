import { useState, useEffect } from "react";
import { Link2, Check, Eye, EyeOff, ChevronRight, ChevronDown, Info } from "lucide-react";
import { Box, Tooltip, ScrollContainer } from "./ariane";
import { useAnnotations } from "../context/AnnotationContext";
import { useStatePlaygroundContext } from "../context/StatePlaygroundContext";
import StatePlayground from "./StatePlayground";

/** Default stroke width for all Lucide icons in the project */
const ICON_STROKE_WIDTH = 1.75;

/** LocalStorage key for persisting collapsed groups state */
const COLLAPSED_GROUPS_KEY = 'prototype-collapsed-groups';

/** Tab options for the segmented control */
const TABS = {
  PROTOTYPES: 'prototypes',
  ANNOTATIONS: 'annotations',
};

/**
 * Loads collapsed groups state from localStorage
 * @returns {Array} Array of collapsed group names
 */
function loadCollapsedGroups() {
  try {
    const stored = localStorage.getItem(COLLAPSED_GROUPS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

/**
 * Saves collapsed groups state to localStorage
 * @param {Array} collapsedGroups - Array of collapsed group names
 */
function saveCollapsedGroups(collapsedGroups) {
  try {
    localStorage.setItem(COLLAPSED_GROUPS_KEY, JSON.stringify(collapsedGroups));
  } catch {
    // Ignore localStorage errors
  }
}

/**
 * Reusable prototype list item component.
 * @param {object} props
 * @param {object} props.prototype - Prototype data with label, value, description
 * @param {boolean} props.isSelected - Whether this prototype is currently selected
 * @param {boolean} props.isCopied - Whether the link was just copied
 * @param {function} props.onSelect - Handler for selecting the prototype
 * @param {function} props.onCopyLink - Handler for copying the preview link
 */
function PrototypeListItem({ prototype, isSelected, isCopied, onSelect, onCopyLink }) {
  return (
    <div
      className={`flex items-start justify-between gap-xs p-sm rounded transition-colors ${
        isSelected ? 'bg-[#3c3c3c]' : 'hover:bg-[#2d2d2d]'
      }`}
    >
      <button
        onClick={onSelect}
        className="flex-1 text-left transition-colors"
      >
        <span className={`block text-sm ${isSelected ? 'text-white' : 'text-neutral-300 hover:text-white'}`}>
          {prototype.label}
        </span>
        {prototype.description && (
          <span className="block text-xs text-neutral-400 mt-[2px]">
            {prototype.description}
          </span>
        )}
      </button>
      <Tooltip 
        label={isCopied ? "Copied!" : "Copy preview link"} 
        placement="left"
        delayDuration={200}
        type="light"
      >
        <button
          onClick={onCopyLink}
          className="p-xs rounded text-neutral-400 hover:text-neutral-200 hover:bg-[#4a4a4a] transition-colors"
        >
          {isCopied ? (
            <Check size={14} strokeWidth={ICON_STROKE_WIDTH} className="text-green-400" />
          ) : (
            <Link2 size={14} strokeWidth={ICON_STROKE_WIDTH} />
          )}
        </button>
      </Tooltip>
    </div>
  );
}

/**
 * Collapsible group header component
 * @param {object} props
 * @param {string} props.name - Group name
 * @param {number} props.count - Number of items in group
 * @param {boolean} props.isCollapsed - Whether group is collapsed
 * @param {function} props.onToggle - Handler for toggling collapsed state
 */
function GroupHeader({ name, count, isCollapsed, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className="flex items-center gap-xs w-full text-left mb-xs hover:opacity-80 transition-opacity"
    >
      {isCollapsed ? (
        <ChevronRight size={14} strokeWidth={ICON_STROKE_WIDTH} className="text-neutral-400" />
      ) : (
        <ChevronDown size={14} strokeWidth={ICON_STROKE_WIDTH} className="text-neutral-400" />
      )}
      <span className="text-xs text-neutral-400">
        {name} ({count})
      </span>
    </button>
  );
}

/**
 * PrototypeSelector component with tabbed interface for prototypes and annotations.
 * Supports grouping prototypes by their Group property.
 * @param {object} props
 * @param {object} props.prototypes - List collection with ungrouped array and groups object
 * @param {object} props.archivedPrototypes - List collection of archived prototypes
 * @param {string} props.value - Currently selected value (path)
 * @param {function} props.onValueChange - Handler for when a new prototype is selected
 */
function PrototypeSelector({ prototypes, archivedPrototypes, value, onValueChange }) {
  const [activeTab, setActiveTab] = useState(TABS.PROTOTYPES);
  const [copiedId, setCopiedId] = useState(null);
  const [showArchived, setShowArchived] = useState(false);
  const [collapsedGroups, setCollapsedGroups] = useState(loadCollapsedGroups);
  
  const { 
    showAnnotations, 
    setShowAnnotations,
    scopes,
    allAnnotations,
    activeScopes,
    toggleScope,
    highlightedAnnotationId,
    setHighlightedAnnotationId,
  } = useAnnotations();

  const { setStateControls } = useStatePlaygroundContext();

  // Persist collapsed groups to localStorage
  useEffect(() => {
    saveCollapsedGroups(collapsedGroups);
  }, [collapsedGroups]);

  // Update stateControls when selected prototype changes
  useEffect(() => {
    // Find current prototype's stateControls
    const allItems = [
      ...(prototypes.items || []),
      ...(archivedPrototypes?.items || [])
    ];
    const currentPrototype = allItems.find(p => p.value === value);
    setStateControls(currentPrototype?.stateControls || null);
  }, [value, prototypes.items, archivedPrototypes?.items, setStateControls]);

  /**
   * Toggles a group's collapsed state
   * @param {string} groupName - The group name to toggle
   */
  const toggleGroupCollapsed = (groupName) => {
    setCollapsedGroups(prev => {
      if (prev.includes(groupName)) {
        return prev.filter(g => g !== groupName);
      } else {
        return [...prev, groupName];
      }
    });
  };

  /**
   * Generates the full preview URL for a prototype
   * @param {string} prototypePath - The prototype path
   * @returns {string} Full preview URL
   */
  const getFullPreviewUrl = (prototypePath) => {
    const cleanPath = (prototypePath || "").replace(/^\//, "");
    return `${window.location.origin}/${cleanPath}?full-preview`;
  };

  /**
   * Copies the full preview URL to clipboard
   * @param {string} prototypePath - The prototype path
   */
  const handleCopyLink = async (prototypePath) => {
    const url = getFullPreviewUrl(prototypePath);
    try {
      await navigator.clipboard.writeText(url);
      setCopiedId(prototypePath);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  /**
   * Handles tab change and manages annotation visibility
   * @param {string} tab - The tab to switch to
   */
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    // Enable annotations when switching to annotations tab
    if (tab === TABS.ANNOTATIONS) {
      setShowAnnotations(true);
    } else {
      setShowAnnotations(false);
    }
  };

  /**
   * Gets annotations for a specific scope
   * @param {string} scopeId - The scope ID
   * @returns {Array} Annotations belonging to the scope
   */
  const getAnnotationsForScope = (scopeId) => {
    return allAnnotations.filter(ann => ann.scope === scopeId);
  };

  /**
   * Renders a list of prototype items
   * @param {Array} items - Array of prototype items to render
   */
  const renderPrototypeList = (items) => (
    <div className="flex flex-col gap-xs">
      {items.map((prototype) => (
        <PrototypeListItem
          key={prototype.value}
          prototype={prototype}
          isSelected={value === prototype.value}
          isCopied={copiedId === prototype.value}
          onSelect={() => onValueChange(prototype.value)}
          onCopyLink={() => handleCopyLink(prototype.value)}
        />
      ))}
    </div>
  );

  // Get grouped data from prototypes
  const { ungrouped = [], groups = {} } = prototypes;
  const groupNames = Object.keys(groups);
  const hasGroups = groupNames.length > 0;

  return (
    <Box
      className="bg-[#1e1e1e] border-l border-[#3c3c3c] w-[280px] shrink-0 h-full flex flex-col"
    >
      {/* Scrollable Content Area */}
      <ScrollContainer className="flex-1 p-sm-plus">
        {/* Segmented Control */}
        <div className="flex rounded bg-[#2d2d2d] p-[2px] mb-md">
        <button
          onClick={() => handleTabChange(TABS.PROTOTYPES)}
          className={`flex-1 px-sm py-xs text-xs font-medium rounded transition-colors ${
            activeTab === TABS.PROTOTYPES
              ? 'bg-[#3c3c3c] text-white'
              : 'text-neutral-400 hover:text-neutral-300'
          }`}
        >
          Prototypes
        </button>
        <button
          onClick={() => handleTabChange(TABS.ANNOTATIONS)}
          className={`flex-1 px-sm py-xs text-xs font-medium rounded transition-colors ${
            activeTab === TABS.ANNOTATIONS
              ? 'bg-[#3c3c3c] text-white'
              : 'text-neutral-400 hover:text-neutral-300'
          }`}
        >
          Annotations
        </button>
      </div>

      {/* Prototypes Tab Content */}
      {activeTab === TABS.PROTOTYPES && (
        <div>
          {/* Ungrouped Prototypes */}
          {ungrouped.length > 0 && (
            <div className="mb-md">
              <div className="flex items-center gap-xs mb-xs">
                <span className="text-xs text-neutral-500">
                  Ungrouped
                </span>
                <Tooltip 
                  label="Ask Cursor to group related prototypes together for easier navigation"
                  placement="top"
                  type="light"
                >
                  <Info size={12} strokeWidth={ICON_STROKE_WIDTH} className="text-neutral-500 cursor-help" />
                </Tooltip>
              </div>
              {renderPrototypeList(ungrouped)}
            </div>
          )}

          {/* Grouped Prototypes */}
          {groupNames.map((groupName) => {
            const groupItems = groups[groupName];
            const isCollapsed = collapsedGroups.includes(groupName);
            
            return (
              <div key={groupName} className="mb-md">
                <GroupHeader
                  name={groupName}
                  count={groupItems.length}
                  isCollapsed={isCollapsed}
                  onToggle={() => toggleGroupCollapsed(groupName)}
                />
                {!isCollapsed && renderPrototypeList(groupItems)}
              </div>
            );
          })}

          {/* Archived Prototypes Section */}
          {archivedPrototypes?.items?.length > 0 && (
            <div className="mt-md pt-md border-t border-[#3c3c3c]">
              <button
                onClick={() => setShowArchived(!showArchived)}
                className="flex items-center gap-xs w-full text-left mb-xs hover:opacity-80 transition-opacity"
              >
                {showArchived ? (
                  <ChevronDown size={14} strokeWidth={ICON_STROKE_WIDTH} className="text-neutral-400" />
                ) : (
                  <ChevronRight size={14} strokeWidth={ICON_STROKE_WIDTH} className="text-neutral-400" />
                )}
                <span className="text-xs text-neutral-400">
                  Archived ({archivedPrototypes.items.length})
                </span>
              </button>
              
              {showArchived && renderPrototypeList(archivedPrototypes.items)}
            </div>
          )}
        </div>
      )}

      {/* Annotations Tab Content */}
      {activeTab === TABS.ANNOTATIONS && (
        <div>
          {scopes.length > 0 ? (
            <div>
              {scopes.map((scope) => {
                const scopeAnnotations = getAnnotationsForScope(scope.id);
                const isActive = activeScopes.includes(scope.id);
                
                return (
                  <div key={scope.id} className="mb-md">
                    {/* Scope Header with Eye Toggle */}
                    <button 
                      onClick={() => toggleScope(scope.id)}
                      className="flex items-center gap-xs mb-xs cursor-pointer w-full text-left hover:opacity-80 transition-opacity"
                    >
                      {isActive ? (
                        <Eye size={14} strokeWidth={ICON_STROKE_WIDTH} className="text-neutral-300" />
                      ) : (
                        <EyeOff size={14} strokeWidth={ICON_STROKE_WIDTH} className="text-neutral-500" />
                      )}
                      <span className={`text-xs uppercase tracking-wider ${isActive ? 'text-neutral-300' : 'text-neutral-500'}`}>
                        {scope.name} ({scopeAnnotations.length})
                      </span>
                    </button>
                    
                    {/* Annotation Cards - Rose palette on dark */}
                    {isActive && scopeAnnotations.length > 0 && (
                      <div className="flex flex-col gap-xs">
                        {scopeAnnotations.map((annotation) => {
                          const isHighlighted = highlightedAnnotationId === annotation.id;
                          return (
                            <button 
                              key={annotation.id}
                              onMouseEnter={() => setHighlightedAnnotationId(annotation.id)}
                              onMouseLeave={() => {
                                // Only clear if this annotation is currently highlighted
                                if (highlightedAnnotationId === annotation.id) {
                                  setHighlightedAnnotationId(null);
                                }
                              }}
                              onClick={() => setHighlightedAnnotationId(
                                isHighlighted ? null : annotation.id
                              )}
                              className={`p-sm rounded text-left transition-all cursor-pointer border ${
                                isHighlighted 
                                  ? 'bg-[#4a1942] border-[#BB3DB0]' 
                                  : 'bg-[#2d1a2a] border-[#6b3060] hover:bg-[#3d2238]'
                              }`}
                            >
                              <span className="block text-xs font-medium mb-[2px] text-rose-100">
                                {annotation.title}
                              </span>
                              <span className="block text-xs text-rose-200">
                                {annotation.body}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-lg">
              <span className="text-xs text-neutral-500">
                No annotations for this prototype
              </span>
            </div>
          )}
        </div>
      )}
      </ScrollContainer>

      {/* State Playground Panel - Always visible at bottom */}
      <StatePlayground />
    </Box>
  );
}

export default PrototypeSelector;
