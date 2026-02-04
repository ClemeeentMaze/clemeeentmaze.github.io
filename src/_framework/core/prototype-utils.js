/**
 * Utilities for discovering and managing prototype modules.
 * @module prototype-utils
 */

import React from "react";

// Dynamic import of all prototype components
export const prototypeModules = import.meta.glob('../../prototypes/*/index.jsx');

/**
 * Converts a kebab-case string to Title Case.
 * @param {string} str - The string to convert
 * @returns {string} Title case string
 */
export function toTitleCase(str) {
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Creates a prototype entry from a module path.
 * @param {string} path - The module path
 * @param {object} modules - The modules object for lazy loading
 * @returns {object} Prototype entry with path, label, and component
 */
function createPrototypeEntry(path, modules) {
  const dirName = path.split('/')[3];
  const routePath = `/${dirName}`;
  const Component = React.lazy(() => modules[path]());

  return {
    path: routePath,
    label: dirName,
    component: Component
  };
}

/**
 * Array of prototype entries with path, label, and lazy-loaded component.
 */
export const prototypeEntries = Object.keys(prototypeModules)
  .map(path => createPrototypeEntry(path, prototypeModules));
