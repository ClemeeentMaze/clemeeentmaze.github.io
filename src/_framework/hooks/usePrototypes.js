import { useState, useEffect } from "react";
import { 
  prototypeEntries, 
  prototypeModules, 
  toTitleCase 
} from "../core/prototype-utils";

/**
 * Groups an array of prototypes by their Group property.
 * @param {Array} items - Array of prototype items with optional group property
 * @returns {object} Object with ungrouped array and groups object
 */
function groupPrototypes(items) {
  const ungrouped = [];
  const groups = {};

  items.forEach(item => {
    if (item.group) {
      if (!groups[item.group]) {
        groups[item.group] = [];
      }
      groups[item.group].push(item);
    } else {
      ungrouped.push(item);
    }
  });

  // Sort groups alphabetically
  const sortedGroups = Object.keys(groups)
    .sort()
    .reduce((acc, key) => {
      acc[key] = groups[key];
      return acc;
    }, {});

  return { ungrouped, groups: sortedGroups };
}

/**
 * Custom hook to manage the list of prototypes, including loading their titles,
 * descriptions, groups, and state controls.
 * @returns {object} Object containing prototypes (with ungrouped and groups), 
 *                   archivedPrototypes, and current prototype's stateControls.
 */
export function usePrototypes() {
  // Initialize with placeholder items from prototypeEntries
  const [prototypes, setPrototypes] = useState(() => ({
    items: prototypeEntries.map(({ path, label }) => ({
      label: toTitleCase(label),
      value: path,
      description: null,
      group: null,
      stateControls: null
    })),
    ungrouped: [],
    groups: {}
  }));

  const [archivedPrototypes, setArchivedPrototypes] = useState(() => ({
    items: []
  }));

  useEffect(() => {
    const loadPrototypeMetadata = async () => {
      // Load all prototypes and their metadata
      const allItems = await Promise.all(
        prototypeEntries.map(async ({ path, label }) => {
          const mod = await prototypeModules[`../../prototypes/${label}/index.jsx`]();
          return {
            label: mod.default.Title || toTitleCase(label),
            value: path,
            description: mod.default.Description || null,
            order: mod.default.Order ?? Infinity,
            group: mod.default.Group || null,
            stateControls: mod.default.StateControls || null,
            isArchived: mod.default.Archived || false
          };
        })
      );
      
      // Separate active and archived prototypes
      const activeItems = allItems.filter(item => !item.isArchived);
      const archivedItems = allItems.filter(item => item.isArchived);
      
      // Sort active prototypes by Order (ascending)
      activeItems.sort((a, b) => a.order - b.order);
      
      // Group the active prototypes
      const { ungrouped, groups } = groupPrototypes(activeItems);
      
      setPrototypes({ 
        items: activeItems,
        ungrouped,
        groups
      });

      // Sort and set archived prototypes
      archivedItems.sort((a, b) => a.order - b.order);
      setArchivedPrototypes({ items: archivedItems });
    };

    loadPrototypeMetadata();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { prototypes, archivedPrototypes };
}
