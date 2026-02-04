/**
 * ConversationalPreview Component
 *
 * Shared conversational preview used when a block is AI moderated.
 * Shows an AI orb, a speaking/listening state pill, and the current prompt.
 */
import { Flex, Box, Text, ProgressBar } from '@framework/components/ariane';

// Import the orb image
import orbImage from '../../assets/orb-halftone.png';

/**
 * StatePill - Shows current conversation state.
 *
 * @param {Object} props
 * @param {string} props.state - Current state ('listening', 'speaking', 'thinking')
 */
function StatePill({ state = 'listening' }) {
  const stateLabels = {
    listening: 'Listening...',
    speaking: 'Speaking...',
    thinking: 'Thinking...',
  };

  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      className="
        bg-[#F7F7FA] rounded-full px-3 py-1.5
        border border-[rgba(108,113,140,0.28)]
      "
    >
      <Text className="text-[13px] leading-4 font-medium text-[#535A74]">
        {stateLabels[state] || stateLabels.listening}
      </Text>
    </Flex>
  );
}

/**
 * ConversationalPreview - Preview card for AI moderated question blocks.
 *
 * @param {Object} props
 * @param {string} props.title - Prompt shown in the subtitle area
 * @param {number} props.progress - Progress percentage (0-100)
 */
export function ConversationalPreview({ title, progress = 10 }) {
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

      {/* Content section - centered orb and conversation UI */}
      <Flex
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        className="flex-1 px-8 py-6"
      >
        {/* AI Orb */}
        <Box className="relative w-[200px] h-[200px] mb-6">
          <img
            src={orbImage}
            alt="AI Orb"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px]"
          />
        </Box>

        {/* State pill */}
        <Box className="mb-3">
          <StatePill state="listening" />
        </Box>

        {/* Subtitles - the current question being asked */}
        <Text
          className="text-base leading-6 text-center max-w-[320px]"
          color="default.main.secondary"
        >
          {title || 'What would you improve about this experience?'}
        </Text>
      </Flex>

      {/* Footer */}
      <Box
        className="
          p-4 bg-white
          shadow-[inset_0px_0.5px_0px_0px_rgba(108,113,140,0.28)]
        "
      >
        <Text
          type="caption"
          color="default.main.secondary"
          className="text-center"
        >
          Speak your answer to continue
        </Text>
      </Box>
    </Box>
  );
}

export default ConversationalPreview;
