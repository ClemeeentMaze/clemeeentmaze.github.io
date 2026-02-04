/**
 * ConversationalSettings Component
 *
 * Settings panel for the Conversational block.
 * Keeps the setup simple: main question, follow-up prompts, and moderator guidance.
 */
import { useState } from 'react';
import {
  Flex,
  Text,
  Field,
  TextInputControl,
  TextAreaControl,
} from '@framework/components/ariane';
import { Divider } from './SettingsPrimitives';

/**
 * ConversationalSettings - Form content for the Conversational block
 *
 * @param {Object} props
 * @param {Object} props.block - Conversational block data
 * @param {Function} props.onBlockChange - Patch updater for the block
 */
export function ConversationalSettings({ block, onBlockChange }) {
  const [mainQuestion, setMainQuestion] = useState(
    block?.title || 'What would you improve about this experience?'
  );
  const [followUpQuestions, setFollowUpQuestions] = useState(
    block?.followUpQuestions || 'Ask for examples if the answer is vague.'
  );
  const [moderatorInstructions, setModeratorInstructions] = useState(
    block?.moderatorInstructions ||
      'Keep the tone friendly and avoid leading questions.'
  );

  return (
    <Flex flexDirection="column" gap="LG" className="w-full">
      {/* Main Question - Required */}
      <Flex flexDirection="column" gap="SM" className="w-full">
        <Flex gap="XS">
          <Text className="opacity-90">Main question</Text>
          <Text className="opacity-90">*</Text>
        </Flex>
        <TextInputControl
          value={mainQuestion}
          placeholder="What do you want to ask?"
          onChange={(e) => {
            const value = e.target.value;
            setMainQuestion(value);
            onBlockChange?.(block.id, { title: value });
          }}
          onBlur={(e) => {
            console.log('Conversational main question updated:', e.target.value);
          }}
        />
      </Flex>

      {/* Follow-up questions */}
      <Field label="Follow-up questions">
        <TextAreaControl
          value={followUpQuestions}
          placeholder="Add a few prompts for the AI to ask next..."
          rows={4}
          onChange={(e) => {
            const value = e.target.value;
            setFollowUpQuestions(value);
            onBlockChange?.(block.id, { followUpQuestions: value });
          }}
          onBlur={(e) => {
            console.log('Conversational follow-ups updated:', e.target.value);
          }}
        />
      </Field>

      {/* Divider */}
      <Divider />

      {/* Moderator instructions */}
      <Field label="Moderator instructions">
        <TextAreaControl
          value={moderatorInstructions}
          placeholder="How should the AI moderate the conversation?"
          rows={4}
          onChange={(e) => {
            const value = e.target.value;
            setModeratorInstructions(value);
            onBlockChange?.(block.id, { moderatorInstructions: value });
          }}
          onBlur={(e) => {
            console.log('Conversational moderator instructions updated:', e.target.value);
          }}
        />
      </Field>
    </Flex>
  );
}

export default ConversationalSettings;
