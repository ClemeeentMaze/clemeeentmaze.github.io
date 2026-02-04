/**
 * AIModerationOrb
 *
 * Reusable AI voice indicator with an orb and a state pill.
 * Used in AI-moderated previews to show "Listening/Speaking/Thinking".
 *
 * @param {Object} props
 * @param {'sm'|'md'} props.size - Orb size preset
 * @param {'listening'|'speaking'|'thinking'} props.state - AI voice state
 */
import { Box, Flex, Text } from '@framework/components/ariane';
import orbImage from '../assets/orb-halftone.png';

const SIZE_MAP = {
  sm: 140,
  md: 180,
};

const STATE_LABELS = {
  listening: 'Listening...',
  speaking: 'Speaking...',
  thinking: 'Thinking...',
};

export function AIModerationOrb({ size = 'sm', state = 'listening' }) {
  const orbSize = SIZE_MAP[size] || SIZE_MAP.sm;
  const label = STATE_LABELS[state] || STATE_LABELS.listening;

  return (
    <Flex flexDirection="column" alignItems="center" gap="SM">
      <Box className="relative" style={{ width: orbSize, height: orbSize }}>
        <img
          src={orbImage}
          alt="AI voice orb"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ width: orbSize, height: orbSize }}
        />
      </Box>
      <Box
        className="
          bg-[#F7F7FA] rounded-full px-3 py-1.5
          border border-[rgba(108,113,140,0.28)]
        "
      >
        <Text className="text-[13px] leading-4 font-medium text-[#535A74]">
          {label}
        </Text>
      </Box>
    </Flex>
  );
}

export default AIModerationOrb;
