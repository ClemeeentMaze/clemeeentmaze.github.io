/**
 * GoalItem
 *
 * Goal card used in the left panel. Shows a header, an Activity section,
 * and a Questions section inspired by screen-share-v21.
 */
import { Box, Flex, Text, IconFigure, ActionButton, TextBadge, Icon } from '@framework/components/ariane';
import { Sparkles } from 'lucide-react';
import { BLOCK_TYPES } from '../data';
import { GoalQuestionItem } from './GoalQuestionItem';

/**
 * @param {Object} props
 * @param {Object} props.goal - Goal data object
 * @param {string} props.selectedBlockId - Currently selected block id
 * @param {Function} props.onSelectBlock - Handler for selecting blocks
 */
export function GoalItem({ goal, selectedBlockId, onSelectBlock }) {
  const activityType = BLOCK_TYPES[goal?.activity?.type] || {};
  const isActivitySelected = selectedBlockId === goal?.activity?.id;
  const isAnyQuestionSelected = goal?.questions?.some(
    (question) => question.id === selectedBlockId
  );

  if (!goal) {
    return null;
  }

  return (
    <Box
      className={
        `rounded-xl bg-white shadow-[0px_1px_2px_rgba(108,113,140,0.12)] ` +
        (isActivitySelected || isAnyQuestionSelected
          ? 'ring-1 ring-[#0568fd]'
          : 'ring-1 ring-[rgba(108,113,140,0.16)]')
      }
    >
      {/* Goal header */}
      <Flex
        alignItems="flex-start"
        justifyContent="space-between"
        className="px-4 py-3 border-b border-[rgba(108,113,140,0.2)] w-full"
        onClick={() => {
          if (goal?.activity?.id) {
            console.log('Selected goal activity:', goal.activity.id);
            onSelectBlock?.(goal.activity.id);
          }
        }}
        role="button"
        tabIndex={0}
      >
        <Flex gap="MD" alignItems="flex-start" className="min-w-0 flex-1">
          <IconFigure
            name={activityType.iconName || 'mission'}
            color={activityType.arianeColor || 'awake'}
            mode="dark"
            size="MDPlus"
            shape="squared"
          />
          <Box className="min-w-0 flex-1 w-full">
            <Text type="caption" color="default.main.secondary">
              Goal {goal.number || 1} · {activityType.name || 'Activity'}
            </Text>
            <Text className="w-full truncate whitespace-nowrap">
              {goal.title || 'Goal title'}
            </Text>
            <Flex alignItems="center" justifyContent="space-between" className="mt-1 w-full">
              {goal.isAIModerated ? (
                <TextBadge sentiment="featured" icon="sparkles">
                  AI moderated
                </TextBadge>
              ) : (
                <span />
              )}
              <Text type="caption" color="default.main.secondary">
                {goal.duration || '5 to 10 min'}
              </Text>
            </Flex>
          </Box>
        </Flex>
      </Flex>

      {/* Activity content moved to settings panel */}

      {/* Questions section */}
      <Box className="px-4 pb-4 pt-3 bg-[#F7F7FA]">
        <Flex flexDirection="column" gap="XS" className="mb-2">
          <Text type="kicker" color="default.main.secondary">
            Questions
          </Text>
          <Text type="caption" color="default.main.secondary">
            Asked after activity completion
          </Text>
        </Flex>

        <Flex flexDirection="column" gap="SM">
          {(goal.questions || []).map((question) => (
            <GoalQuestionItem
              key={question.id}
              block={question}
              isSelected={selectedBlockId === question.id}
              onSelect={onSelectBlock}
            />
          ))}

          <ActionButton
            emphasis="tertiary"
            icon={<Icon name="plus" />}
            size="SM"
            className="w-full justify-center"
            onClick={() => console.log('Add question clicked')}
          >
            Add question
          </ActionButton>
        </Flex>
      </Box>
    </Box>
  );
}

export default GoalItem;
