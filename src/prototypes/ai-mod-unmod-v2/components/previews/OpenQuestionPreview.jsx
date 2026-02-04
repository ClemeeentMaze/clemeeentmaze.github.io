/**
 * OpenQuestionPreview Component
 *
 * Shows the preview for Open Question blocks.
 * Supports two modes:
 * - Standard: Text input with title, description, and Continue button
 * - Conversational: Voice conversation UI with AI orb and subtitle pill
 *
 * Based on: Figma design node 4228:88064 and protomaze participant-experience-v2
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

// Import the orb image for conversational mode
import orbImage from '../../assets/orb-halftone.png';

/**
 * StatePill - Shows current conversation state
 * Displays "Listening..." to indicate the AI is waiting for participant response
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
 * ConversationalContent - Voice conversation UI with orb
 *
 * @param {Object} props
 * @param {Object} props.block - Block data with title
 */
function ConversationalContent({ block }) {
  return (
    <>
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
          {block?.title || 'What would you improve about this experience?'}
        </Text>
      </Flex>

      {/* Footer - no button needed for voice conversation */}
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
    </>
  );
}

/**
 * StandardContent - Traditional text input UI
 *
 * @param {Object} props
 * @param {Object} props.block - Block data with title and description
 */
function StandardContent({ block }) {
  return (
    <>
      {/* Content section */}
      <Flex flexDirection="column" gap="LG" className="px-8 py-6 flex-1">
        {/* Title and description */}
        <Flex flexDirection="column" gap="MD">
          <Heading
            level={2}
            className="text-[20px] leading-6 font-semibold tracking-[-0.2px]"
          >
            {block?.title || 'Untitled'}
          </Heading>
          <Text
            color="default.main.secondary"
            className="text-base leading-6 tracking-[-0.16px]"
          >
            {block?.description || 'No description provided.'}
          </Text>
        </Flex>

        {/* Text area input */}
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
    </>
  );
}

/**
 * OpenQuestionPreview - Preview card for open question blocks
 *
 * @param {Object} props
 * @param {Object} props.block - Block data with title, description, and conversationalEnabled
 * @param {number} props.progress - Progress percentage (0-100)
 */
export function OpenQuestionPreview({ block, progress = 10 }) {
  const isConversational = block?.conversationalEnabled;

  return (
    <Box
      className="
        h-full bg-white rounded-lg overflow-hidden
        shadow-[0px_2px_8px_0px_rgba(108,113,140,0.08),0px_1px_2px_0px_rgba(108,113,140,0.08)]
        ring-[0.5px] ring-[#6C718C]/[0.28]
        flex flex-col
      "
    >
      {/* Progress bar section with bottom divider */}
      <Box className="p-6 shadow-[inset_0px_-0.5px_0px_0px_rgba(108,113,140,0.28)]">
        <ProgressBar value={progress} max={100} solid className="h-1" />
      </Box>

      {/* Render appropriate content based on conversational mode */}
      {isConversational ? (
        <ConversationalContent block={block} />
      ) : (
        <StandardContent block={block} />
      )}
    </Box>
  );
}

export default OpenQuestionPreview;
