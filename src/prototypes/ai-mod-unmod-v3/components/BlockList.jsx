/**
 * BlockList Component (Left Panel)
 * 
 * Three-section layout: fixed header, scrollable middle, fixed footer.
 */
import { Flex, ScrollContainer, Icon, ActionButton, IconFigure, Text, TextBadge } from '@framework/components/ariane';
import { Settings, Sparkles } from 'lucide-react';
import { BlockListItem } from './BlockListItem';

/**
 * @param {Array} props.blocks - Array of block objects
 * @param {string} props.selectedBlockId - Currently selected block ID
 * @param {Function} props.onSelectBlock - Block selection callback
 * @param {Object} props.studyMeta - Study metadata for header icons
 * @param {boolean} props.studyModerationEnabled - Study-level moderation toggle state
 * @param {Function} props.onStudyModerationToggle - Toggle callback for study moderation
 */
export function BlockList({
  blocks,
  selectedBlockId,
  onSelectBlock,
  studyMeta,
  studyModerationEnabled,
  onStudyModerationToggle,
}) {
  const welcomeBlock = blocks.find(b => b.type === 'welcome');
  const thankYouBlock = blocks.find(b => b.type === 'thankyou');
  const customBlocks = blocks.filter(b => b.type !== 'welcome' && b.type !== 'thankyou');
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

      {/* Study moderation row */}
      <Flex
        justifyContent="space-between"
        alignItems="center"
        className="flex-shrink-0 px-4 py-3 shadow-[inset_0_-0.5px_0_0_rgba(108,113,140,0.28)]"
      >
        <Flex alignItems="center" gap="XS">
          <Sparkles size={14} className="text-[#6B5BEE]" />
          <Text className="text-sm font-semibold text-[#282D40]">AI moderation</Text>
        </Flex>
        <Flex alignItems="center" gap="SM">
          {studyModerationEnabled && (
            <TextBadge sentiment="awake">On</TextBadge>
          )}
          <ActionButton
            emphasis="tertiary"
            size="SM"
            iconOnly
            icon={<Settings size={16} />}
            aria-label="AI moderation settings"
            onClick={() => console.log('AI moderation settings clicked')}
          >
            AI moderation settings
          </ActionButton>
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
          
          {customBlocks.map((block) => (
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
      
      {/* Footer */}
      {thankYouBlock && (
        <div className="flex-shrink-0 p-3 shadow-[inset_0_0.5px_0_0_rgba(108,113,140,0.28)]">
          <BlockListItem
            block={thankYouBlock}
            isSelected={selectedBlockId === thankYouBlock.id}
            onSelect={onSelectBlock}
          />
        </div>
      )}
    </Flex>
  );
}

export default BlockList;
