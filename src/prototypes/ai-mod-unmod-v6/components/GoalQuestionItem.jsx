/**
 * GoalQuestionItem
 *
 * Displays a question block inside a goal's Questions section.
 */
import { Box, Flex, Text, IconFigure } from '@framework/components/ariane';
import { BLOCK_TYPES } from '../data';

/**
 * @param {Object} props
 * @param {Object} props.block - Question block data
 * @param {boolean} props.isSelected - Whether this question is selected
 * @param {Function} props.onSelect - Selection handler
 */
export function GoalQuestionItem({ block, isSelected, onSelect }) {
  const blockType = BLOCK_TYPES[block?.type] || {};

  if (!block) {
    return null;
  }

  return (
    <Box
      onClick={() => {
        console.log('Selected question block:', block.id);
        onSelect?.(block.id);
      }}
      className={
        `rounded-lg bg-white px-3 py-2 cursor-pointer transition-all duration-150 ` +
        (isSelected
          ? 'shadow-[inset_0px_0px_0px_1px_#0568fd]'
          : 'shadow-[inset_0px_0px_0px_0.5px_rgba(108,113,140,0.28)]')
      }
    >
      <Flex gap="SM" alignItems="center">
        <IconFigure
          name={blockType.iconName || 'question-field'}
          color={blockType.arianeColor || 'lila'}
          mode="dark"
          size="SM"
          shape="squared"
        />
        <Box className="flex-1 min-w-0">
          <Text className="w-full truncate whitespace-nowrap">
            {block.title || 'Question'}
          </Text>
          <Text type="caption" color="default.main.secondary">
            {blockType.name || block.type}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
}

export default GoalQuestionItem;
