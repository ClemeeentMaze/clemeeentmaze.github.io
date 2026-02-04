/**
 * BlockList Component (Left Panel)
 * 
 * Scrollable block list with add button.
 */
import { Flex, ScrollContainer, Icon, ActionButton } from '@framework/components/ariane';
import { BlockListItem } from './BlockListItem';

/**
 * @param {Array} props.blocks - Array of block objects
 * @param {string} props.selectedBlockId - Currently selected block ID
 * @param {Function} props.onSelectBlock - Block selection callback
 */
export function BlockList({ blocks, selectedBlockId, onSelectBlock }) {
  return (
    <Flex flexDirection="column" className="h-full bg-white shadow-[inset_-0.5px_0_0_0_rgba(108,113,140,0.28)]">
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
          
          <ActionButton 
            emphasis="secondary"
            sentiment="awake"
            icon={<Icon name="plus" />}
            className="w-full justify-center"
          >
            Add block
          </ActionButton>
        </Flex>
      </ScrollContainer>
    </Flex>
  );
}

export default BlockList;
