/**
 * AIModerationGroup
 *
 * Visual wrapper for blocks that are moderated by AI.
 * Renders a labeled header with a settings action and a shaded container.
 */
import { Flex, Box, Text, ActionButton } from '@framework/components/ariane';
import { Sparkles, Settings } from 'lucide-react';

/**
 * @param {Object} props
 * @param {string} props.label - Group header label
 * @param {React.ReactNode} props.children - Blocks to render inside the group
 * @param {Function} props.onSettingsClick - Optional click handler for settings
 */
export function AIModerationGroup({
  label = 'AI moderated',
  children,
  onSettingsClick,
}) {
  return (
    <Box className="rounded-xl border border-[#E6E0F6] bg-[#FBFAFF]">
      {/* Group header */}
      <Flex
        alignItems="center"
        justifyContent="space-between"
        className="px-3 py-2 border-b border-[#E6E0F6]"
      >
        <Flex alignItems="center" gap="XS">
          <Sparkles size={14} className="text-[#6B5BEE]" />
          <Text className="text-[13px] font-semibold uppercase tracking-[0.08em] text-[#6B5BEE]">
            {label}
          </Text>
        </Flex>
        <ActionButton
          emphasis="tertiary"
          size="SM"
          iconOnly
          icon={<Settings size={14} />}
          onClick={() => {
            // Debug helper for future settings wiring.
            console.log('AI moderation settings clicked');
            onSettingsClick?.();
          }}
          className="!bg-white !border !border-[#E6E0F6] !rounded-md !p-2"
        >
          Settings
        </ActionButton>
      </Flex>

      {/* Grouped blocks */}
      <Box className="p-2">
        <Flex flexDirection="column" gap="SM">
          {children}
        </Flex>
      </Box>
    </Box>
  );
}

export default AIModerationGroup;
