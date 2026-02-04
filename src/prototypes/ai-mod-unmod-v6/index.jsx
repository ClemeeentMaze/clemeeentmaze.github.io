/**
 * AI Moderated Groups
 * 
 * Exploration of grouping a sequence of blocks under AI moderation.
 * Based on the unmoderated builder baseline.
 * 
 * Layout Structure:
 * ┌──────────────────────────────────────────────────────────────────────┐
 * │  HEADER (64px) - Back, Study Name, Save State, Preview, Go Live     │
 * ├─────────────┬─────────────────────┬──────────────────────────────────┤
 * │             │                     │                                  │
 * │  LEFT PANEL │   MIDDLE PANEL      │        RIGHT PANEL               │
 * │  Block List │   Block Settings    │        Block Preview             │
 * │  (360px)    │   (flex: 1)         │        (flex: 1, min 400px)      │
 * │             │                     │                                  │
 * └─────────────┴─────────────────────┴──────────────────────────────────┘
 */
import { useEffect } from 'react';
import { Flex, Box } from '@framework/components/ariane';

// Local components
import { BuilderHeader } from './components/BuilderHeader';
import { BlockList } from './components/BlockList';
import { BlockSettings } from './components/BlockSettings';
import { BlockPreview } from './components/BlockPreview';

// Mock data
import { DEFAULT_USE_CASE } from './data';
import { useGoals } from './hooks/useGoals';

/**
 * AiModUnmodV6 - Main prototype component
 * 
 * Implements the full-height layout of the Maze study builder:
 * - Header (64px fixed)
 * - Content area (fills remaining height):
 *   - Left panel (360px): Block list
 *   - Middle panel (flex): Block settings
 *   - Right panel (flex, min 400px): Block preview
 */
function AiModUnmodV6() {
  const {
    studyMeta,
    goals,
    welcomeBlock,
    closingBlock,
    selectedBlock,
    selectedBlockId,
    selectBlock,
    updateBlock,
    updateGoalDescription,
    updateGoalAIModerated,
    updateGoalScenario,
  } = useGoals(DEFAULT_USE_CASE);

  const selectedGoal = goals?.find((goal) => goal.activity?.id === selectedBlockId) || null;

  /**
   * Keep selection valid when goals update.
   */
  useEffect(() => {
    if (!selectedBlock) {
      const firstGoalBlock = goals?.[0]?.activity || goals?.[0]?.context || goals?.[0]?.questions?.[0];
      if (firstGoalBlock) {
        selectBlock(firstGoalBlock.id);
      }
    }
  }, [goals, selectedBlock, selectBlock]);

  return (
    <Flex 
      flexDirection="column" 
      className="h-screen w-full overflow-hidden bg-neutral-50"
    >
      {/* 
        HEADER - Fixed 64px height
        Contains: Back button, study name, save state, actions
      */}
      <BuilderHeader studyMeta={studyMeta} />
      
      {/* 
        CONTENT AREA - Fills remaining height
        Three-panel layout
      */}
      <Flex className="flex-1 min-h-0 overflow-hidden">
        {/* 
          Left Panel - Block List
          Fixed width: 360px (border handled inside BlockList)
        */}
        <Box className="w-[360px] min-w-[360px] flex-shrink-0 h-full">
          <BlockList
            goals={goals}
            welcomeBlock={welcomeBlock}
            closingBlock={closingBlock}
            selectedBlockId={selectedBlockId}
            onSelectBlock={selectBlock}
            studyMeta={studyMeta}
          />
        </Box>
        
        {/* 
          Middle Panel - Block Settings
          Flex: 1 (grows to fill space)
        */}
        <Box 
          className="
            flex-1 
            border-r border-neutral-200
            min-w-[320px]
            h-full
          "
        >
          <BlockSettings
            block={selectedBlock}
            onBlockChange={updateBlock}
            goalDescription={selectedGoal?.description || ''}
            onGoalDescriptionChange={(nextDescription) => {
              if (selectedGoal?.activity?.id) {
                updateGoalDescription(selectedGoal.activity.id, nextDescription);
              }
            }}
            isAIModerated={Boolean(selectedGoal?.isAIModerated)}
            onAIModeratedChange={(nextValue) => {
              if (selectedGoal?.activity?.id) {
                updateGoalAIModerated(selectedGoal.activity.id, nextValue);
              }
            }}
            scenario={selectedGoal?.scenario || ''}
            onScenarioChange={(nextScenario) => {
              if (selectedGoal?.activity?.id) {
                updateGoalScenario(selectedGoal.activity.id, nextScenario);
              }
            }}
            isGoalActivity={Boolean(selectedGoal)}
          />
        </Box>
        
        {/* 
          Right Panel - Block Preview
          Flex: 1 with min-width 400px
        */}
        <Box 
          className="
            flex-1 
            min-w-[400px]
            h-full
          "
        >
          <BlockPreview block={selectedBlock} />
        </Box>
      </Flex>
    </Flex>
  );
}

// Prototype metadata for the selector
AiModUnmodV6.Title = "V6 - Goals with Activities";
AiModUnmodV6.Description = "Goals that combine a single activity with follow-up questions";
AiModUnmodV6.Order = 60;
AiModUnmodV6.Group = "AI moderation in unmoderated";

export default AiModUnmodV6;
