/**
 * BlockList Component (Left Panel)
 * 
 * Three-section layout: fixed header, scrollable middle, fixed footer.
 */
import { Flex, ScrollContainer, Icon, ActionButton, IconFigure } from '@framework/components/ariane';
import { BlockListItem } from './BlockListItem';
import { GoalItem } from './GoalItem';

/**
 * @param {Array} props.goals - Array of goal objects
 * @param {Object} props.welcomeBlock - Welcome block data
 * @param {Object} props.closingBlock - Thank you block data
 * @param {string} props.selectedBlockId - Currently selected block ID
 * @param {Function} props.onSelectBlock - Block selection callback
 * @param {Object} props.studyMeta - Study metadata for header icons
 */
export function BlockList({
  goals,
  welcomeBlock,
  closingBlock,
  selectedBlockId,
  onSelectBlock,
  studyMeta,
}) {
  const deviceTypes = studyMeta?.deviceTypes || [];
  const showDevices = deviceTypes.length > 0;
  const showAudio = Boolean(studyMeta?.recordAudio);
  
  return (
    <Flex flexDirection="column" className="h-full bg-white shadow-[inset_-0.5px_0_0_0_rgba(108,113,140,0.28)]">
      {/* Header */}
      <Flex 
        justifyContent="space-between" 
        alignItems="center"
        className="flex-shrink-0 px-4 py-[20px] shadow-[inset_0_-0.5px_0_0_rgba(108,113,140,0.28)]"
      >
        <ActionButton emphasis="tertiary" size="SM" icon={<Icon name="preferences" />}>
          Study requirements
        </ActionButton>
        <Flex gap="XS">
          {showDevices && (
            <IconFigure name="desktop-mobile" color="neutral" size="MD" shape="squared" />
          )}
          {showAudio && (
            <IconFigure name="microphone" color="neutral" size="MD" shape="squared" />
          )}
        </Flex>
      </Flex>
      
      {/* Scrollable Block List */}
      <ScrollContainer className="flex-1 min-h-0">
        <Flex flexDirection="column" gap="SM" className="p-3">
          {welcomeBlock && (
            <BlockListItem
              block={welcomeBlock}
              isSelected={selectedBlockId === welcomeBlock.id}
              onSelect={onSelectBlock}
            />
          )}
          
          {(goals || []).map((goal) => (
            <GoalItem
              key={goal.id}
              goal={goal}
              selectedBlockId={selectedBlockId}
              onSelectBlock={onSelectBlock}
            />
          ))}
          
          <ActionButton 
            emphasis="secondary"
            sentiment="awake"
            icon={<Icon name="plus" />}
            className="w-full justify-center"
          >
            Add goal
          </ActionButton>
        </Flex>
      </ScrollContainer>
      
      {/* Footer */}
      {closingBlock && (
        <div className="flex-shrink-0 p-3 shadow-[inset_0_0.5px_0_0_rgba(108,113,140,0.28)]">
          <BlockListItem
            block={closingBlock}
            isSelected={selectedBlockId === closingBlock.id}
            onSelect={onSelectBlock}
          />
        </div>
      )}
    </Flex>
  );
}

export default BlockList;
