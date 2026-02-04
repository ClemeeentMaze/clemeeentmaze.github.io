/**
 * ConversationalPreview Component
 *
 * Shows a conversation-style preview for Conversational blocks.
 * Emphasizes the main question and the AI-driven follow-ups.
 */
import {
  Flex,
  Box,
  Text,
  Heading,
  CTAButton,
  ProgressBar,
  TextAreaControl,
} from '@framework/components/ariane';

/**
 * Extracts the first follow-up line for preview display.
 *
 * @param {string} followUps - Raw follow-up questions text
 * @returns {string} First follow-up prompt or fallback text
 */
function getFirstFollowUp(followUps) {
  if (!followUps) return 'Can you tell me more about that?';
  const firstLine = followUps.split('\n').find((line) => line.trim().length > 0);
  return firstLine ? firstLine.trim() : 'Can you tell me more about that?';
}

/**
 * ConversationalPreview - Preview card for Conversational blocks
 *
 * @param {Object} props
 * @param {Object} props.block - Block data with conversational fields
 * @param {number} props.progress - Progress percentage (0-100)
 */
export function ConversationalPreview({ block, progress = 10 }) {
  const followUpLine = getFirstFollowUp(block?.followUpQuestions);

  return (
    <Box
      className="
        h-full bg-white rounded-lg overflow-hidden
        shadow-[0px_2px_8px_0px_rgba(108,113,140,0.08),0px_1px_2px_0px_rgba(108,113,140,0.08)]
        ring-[0.5px] ring-[#6C718C]/[0.28]
        flex flex-col
      "
    >
      {/* Progress bar section */}
      <Box className="p-6 shadow-[inset_0px_-0.5px_0px_0px_rgba(108,113,140,0.28)]">
        <ProgressBar value={progress} max={100} solid className="h-1" />
      </Box>

      {/* Content section */}
      <Flex flexDirection="column" gap="LG" className="px-8 py-6 flex-1">
        {/* Main question */}
        <Flex flexDirection="column" gap="SM">
          <Heading level={2} className="text-[20px] leading-6 font-semibold tracking-[-0.2px]">
            {block?.title || 'Untitled'}
          </Heading>
          <Text type="caption" color="default.main.secondary">
            The AI moderator will ask follow-ups to dig deeper.
          </Text>
        </Flex>

        {/* Conversation preview */}
        <Flex flexDirection="column" gap="SM">
          <Box className="self-start max-w-[85%] rounded-lg bg-[#F1F4FF] px-4 py-3">
            <Text className="text-sm text-[#282D40]">
              {followUpLine}
            </Text>
          </Box>
          <Box className="self-end max-w-[85%] rounded-lg bg-[#F7F7FA] px-4 py-3">
            <Text className="text-sm text-[#282D40]">
              I think it was confusing because I couldn’t find the filters quickly.
            </Text>
          </Box>
        </Flex>

        {/* Participant response input */}
        <TextAreaControl
          placeholder="Type your answer here"
          rows={4}
          className="resize-y"
        />
      </Flex>

      {/* Footer with CTA button */}
      <Box
        className="
          p-4 bg-white
          shadow-[inset_0px_0.5px_0px_0px_rgba(108,113,140,0.28)]
        "
      >
        <CTAButton emphasis="primary" disabled fullWidth size="MD">
          Continue
        </CTAButton>
      </Box>
    </Box>
  );
}

export default ConversationalPreview;
