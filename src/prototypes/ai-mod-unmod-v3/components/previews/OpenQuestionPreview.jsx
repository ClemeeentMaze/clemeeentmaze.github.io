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
import { AIModerationOrb } from '../AIModerationOrb';

/**
 * VoiceModeratedContent - Voice conversation UI with orb
 *
 * @param {Object} props
 * @param {Object} props.block - Block data with title
 */
function VoiceModeratedContent({ block }) {
  return (
    <>
      {/* Content section - question above smaller orb */}
      <Flex
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        className="flex-1 px-8 py-6"
      >
        <Heading
          level={2}
          className="text-[20px] leading-6 font-semibold tracking-[-0.2px] text-center mb-6"
        >
          {block?.title || 'What would you improve about this experience?'}
        </Heading>
        <AIModerationOrb size="sm" state="listening" />
      </Flex>

      {/* Footer - no button needed for voice conversation */}
      <Box
        className="
          p-4 bg-white
          shadow-[inset_0px_0.5px_0px_0px_rgba(108,113,140,0.28)]
        "
      >
        <Text type="caption" color="default.main.secondary" className="text-center">
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
 * @param {Object} props.block - Block data with title and description
 * @param {number} props.progress - Progress percentage (0-100)
 * @param {boolean} props.isStudyModerated - Study-level AI moderation state
 */
export function OpenQuestionPreview({ block, progress = 10, isStudyModerated }) {
  const showVoiceMode = Boolean(isStudyModerated);

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
      {showVoiceMode ? (
        <VoiceModeratedContent block={block} />
      ) : (
        <StandardContent block={block} />
      )}
    </Box>
  );
}

export default OpenQuestionPreview;
