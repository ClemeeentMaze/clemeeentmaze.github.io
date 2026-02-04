/**
 * @component StatePlayground
 * @description A collapsible panel that displays state controls for the current prototype.
 * Shows an empty state with guidance when no StateControls are defined.
 * 
 * Panel behavior:
 * - If prototype has no StateControls: panel is collapsed by default
 * - If prototype has StateControls: panel auto-opens when prototype loads
 * - User can manually toggle, which is respected until prototype changes
 * 
 * This is an opt-in feature - prototypes must explicitly define StateControls
 * to show controls in this panel.
 */
import { useState, useEffect, useRef } from 'react';
import { ChevronRight, ChevronDown, RotateCcw, SlidersHorizontal } from 'lucide-react';
import { Toggle, TextInputControl, Text } from './ariane';
import { useStatePlaygroundContext } from '../context/StatePlaygroundContext';

/** Default stroke width for Lucide icons */
const ICON_STROKE_WIDTH = 1.75;

/**
 * Renders a select control (dark compact dropdown for consistency)
 */
function SelectControl({ control, value, onChange }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-[#2d2d2d] text-neutral-200 text-xs rounded px-sm py-xs border border-[#3c3c3c] focus:outline-none focus:border-[#4a4a4a]"
    >
      {control.options.map(opt => (
        <option key={opt} value={opt}>
          {opt.charAt(0).toUpperCase() + opt.slice(1)}
        </option>
      ))}
    </select>
  );
}

/**
 * Renders a range/slider control
 */
function RangeControl({ control, value, onChange }) {
  const { min = 0, max = 100, step = 1 } = control;
  
  return (
    <div className="flex items-center gap-sm">
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="flex-1 h-1 bg-[#3c3c3c] rounded-full appearance-none cursor-pointer
          [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 
          [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-neutral-300 
          [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer
          [&::-webkit-slider-thumb]:hover:bg-white"
      />
      <span className="text-xs text-neutral-400 min-w-[24px] text-right">
        {value}
      </span>
    </div>
  );
}

/**
 * Renders a toggle control
 */
function ToggleControl({ value, onChange }) {
  return (
    <div className="flex items-center gap-sm">
      <Toggle
        size="xs"
        checked={value}
        onChange={onChange}
      />
      <span className="text-xs text-neutral-400">
        {value ? 'On' : 'Off'}
      </span>
    </div>
  );
}

/**
 * Renders a text input control
 */
function TextControl({ control, value, onChange }) {
  return (
    <TextInputControl
      size="SM"
      placeholder={control.placeholder || ''}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="bg-[#2d2d2d] border-[#3c3c3c] text-neutral-200"
    />
  );
}

/**
 * Renders a single control based on its type
 */
function Control({ controlKey, control, value, onChange }) {
  const handleChange = (newValue) => {
    onChange(controlKey, newValue);
  };

  switch (control.type) {
    case 'select':
      return <SelectControl control={control} value={value} onChange={handleChange} />;
    case 'range':
      return <RangeControl control={control} value={value} onChange={handleChange} />;
    case 'toggle':
      return <ToggleControl value={value} onChange={handleChange} />;
    case 'text':
      return <TextControl control={control} value={value} onChange={handleChange} />;
    default:
      return null;
  }
}

/**
 * Empty state component shown when no StateControls are defined
 */
function EmptyState() {
  return (
    <div className="py-sm px-sm text-center">
      <div className="mb-xs">
        <SlidersHorizontal 
          size={16} 
          strokeWidth={1.5} 
          className="text-neutral-400 mx-auto" 
        />
      </div>
      <span className="text-xs text-neutral-400 block leading-relaxed">
        State controls let you switch between prototype states (loading, empty, error) without interacting with the UI directly.
      </span>
      <span className="text-xs text-neutral-400 block mt-sm leading-relaxed">
        Ask Cursor to add state controls to this prototype.
      </span>
    </div>
  );
}

/**
 * StatePlayground panel component
 * Shows state controls for the current prototype or an empty state
 * 
 * Auto-open behavior:
 * - Opens automatically when prototype has StateControls defined
 * - Stays collapsed when prototype has no StateControls
 * - User toggle is respected until prototype changes
 */
function StatePlayground() {
  const { stateControls, state, setStateValue, resetState } = useStatePlaygroundContext();
  const hasControls = stateControls && Object.keys(stateControls).length > 0;
  
  // Start collapsed, will auto-open via effect if controls exist
  const [isCollapsed, setIsCollapsed] = useState(true);
  
  // Track if user has manually toggled in current prototype session
  const userHasToggled = useRef(false);
  
  /**
   * Auto-open/close panel when stateControls change (prototype switch)
   * - Opens if prototype has controls defined
   * - Closes if prototype has no controls
   * - Resets manual toggle tracking on prototype change
   */
  useEffect(() => {
    // Reset user toggle tracking when controls change (new prototype)
    userHasToggled.current = false;
    
    // Auto-open if controls exist, auto-close if they don't
    setIsCollapsed(!hasControls);
  }, [stateControls]); // Intentionally using stateControls (not hasControls) to detect prototype changes

  /**
   * Toggles panel collapsed state (user-initiated)
   */
  const toggleCollapsed = () => {
    userHasToggled.current = true;
    setIsCollapsed(prev => !prev);
  };

  return (
    <div className="border-t border-[#3c3c3c] mt-auto">
      {/* Header */}
      <button
        onClick={toggleCollapsed}
        className="flex items-center gap-xs w-full text-left p-sm hover:bg-[#2d2d2d] transition-colors"
      >
        {isCollapsed ? (
          <ChevronRight size={14} strokeWidth={ICON_STROKE_WIDTH} className="text-neutral-400" />
        ) : (
          <ChevronDown size={14} strokeWidth={ICON_STROKE_WIDTH} className="text-neutral-400" />
        )}
        <span className="text-xs text-neutral-300 font-medium">
          State Controls
        </span>
        <span className="text-xs text-neutral-500">
          (Experimental)
        </span>
        {hasControls && (
          <span className="text-xs text-neutral-500 ml-auto">
            {Object.keys(stateControls).length}
          </span>
        )}
      </button>

      {/* Content */}
      {!isCollapsed && (
        <div className="px-sm pb-sm">
          {hasControls ? (
            <>
              {/* Controls */}
              <div className="flex flex-col gap-md">
                {Object.entries(stateControls).map(([key, control]) => (
                  <div key={key}>
                    <label className="block text-xs text-neutral-400 mb-xs">
                      {control.label || key}
                    </label>
                    <Control
                      controlKey={key}
                      control={control}
                      value={state[key]}
                      onChange={setStateValue}
                    />
                  </div>
                ))}
              </div>

              {/* Reset Button */}
              <button
                onClick={resetState}
                className="flex items-center gap-xs text-xs text-neutral-500 hover:text-neutral-300 mt-md transition-colors"
              >
                <RotateCcw size={12} strokeWidth={ICON_STROKE_WIDTH} />
                Reset to defaults
              </button>
            </>
          ) : (
            <EmptyState />
          )}
        </div>
      )}
    </div>
  );
}

export default StatePlayground;

