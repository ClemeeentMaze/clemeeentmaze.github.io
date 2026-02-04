/**
 * BlockList Component (Left Panel)
 * 
 * Tabs + Scrollable block list.
 */
import { useState } from 'react';
import { Flex, ScrollContainer, SegmentControl } from '@framework/components/ariane';
import { BlockListItem } from './BlockListItem';

const TAB_OPTIONS = [
  { id: 'results', label: 'Results' },
  { id: 'participants', label: 'Participants' },
  { id: 'themes', label: 'Themes' },
];

/**
 * @param {Array} props.blocks - Array of block objects
 * @param {string} props.selectedBlockId - Currently selected block ID
 * @param {Function} props.onSelectBlock - Block selection callback
 */
export function BlockList({ blocks, selectedBlockId, onSelectBlock }) {
  const [activeTab, setActiveTab] = useState('results');

  return (
    <Flex flexDirection="column" className="h-full bg-white shadow-[inset_-0.5px_0_0_0_rgba(108,113,140,0.28)]">
      {/* Tabs Header */}
      <div className="flex-shrink-0 p-3 border-b border-[rgba(108,113,140,0.16)]">
        <SegmentControl
          options={TAB_OPTIONS}
          selected={activeTab}
          onChange={(id) => setActiveTab(id)}
          size="SM"
          fullWidth
        />
      </div>

      {/* Scrollable Block List */}
      <ScrollContainer className="flex-1 min-h-0">
        <Flex flexDirection="column" gap="SM" className="p-3">
          {blocks.map((block) => (
            <BlockListItem
              key={block.id}
              block={block}
              isSelected={selectedBlockId === block.id}
              onSelect={onSelectBlock}
            />
          ))}
        </Flex>
      </ScrollContainer>
    </Flex>
  );
}

export default BlockList;
