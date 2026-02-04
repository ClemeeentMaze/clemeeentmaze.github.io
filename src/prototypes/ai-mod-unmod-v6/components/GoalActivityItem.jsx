/**
 * GoalActivityItem
 *
 * Displays the single activity block within a goal's Activity section.
 */
import { Box, Flex, Text, IconFigure } from '@framework/components/ariane';
import { BLOCK_TYPES } from '../data';

/**
 * @param {Object} props
 * @param {Object} props.block - Activity block data
 * @param {boolean} props.isSelected - Whether this activity is selected
 * @param {Function} props.onSelect - Selection handler
 */
export function GoalActivityItem({ block, isSelected, onSelect }) {
  const blockType = BLOCK_TYPES[block?.type] || {};

  if (!block) {
    return null;
  }

  return (
    <Box
      onClick={() => {
        console.log('Selected activity block:', block.id);
        onSelect?.(block.id);
      }}
      className={
        `rounded-lg bg-white p-3 cursor-pointer transition-all duration-150 ` +
        (isSelected
          ? 'shadow-[inset_0px_0px_0px_1px_#0568fd]'
          : 'shadow-[inset_0px_0px_0px_0.5px_rgba(108,113,140,0.28)]')
      }
    >
      <Flex gap="SM" alignItems="center">
        <IconFigure
          name={blockType.iconName || 'website'}
          color={blockType.arianeColor || 'awake'}
          mode="dark"
          size="MD"
          shape="squared"
        />
        <Box className="flex-1 min-w-0">
          <Text className="w-full truncate whitespace-nowrap">
            {block.title || 'Activity'}
          </Text>
          <Text type="caption" color="default.main.secondary">
            {blockType.name || block.type}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
}

export default GoalActivityItem;
