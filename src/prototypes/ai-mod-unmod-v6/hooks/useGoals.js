/**
 * useGoals - Manages goal-based data and study metadata for the V6 builder.
 * Keeps local state while syncing updates to the preview and list.
 */
import { useMemo, useState, useCallback } from 'react';
import { USE_CASES, DEFAULT_USE_CASE } from '../data';

/**
 * Safely clones a use case payload to avoid mutating source data.
 * @param {Object} useCase - Use case object
 * @returns {{ studyMeta: Object, goals: Array, welcomeBlock: Object, closingBlock: Object }}
 */
function cloneUseCase(useCase) {
  const payload = {
    studyMeta: useCase?.studyMeta || { name: 'Untitled Study' },
    goals: useCase?.goals || [],
    welcomeBlock: useCase?.welcomeBlock || null,
    closingBlock: useCase?.closingBlock || null,
  };
  return JSON.parse(JSON.stringify(payload));
}

/**
 * Flattens all blocks in the goals payload for selection purposes.
 * @param {Object} payload - Current state payload
 * @returns {Array} Flat list of blocks
 */
function getAllBlocks(payload) {
  const blocks = [];
  if (payload?.welcomeBlock) {
    blocks.push(payload.welcomeBlock);
  }

  (payload?.goals || []).forEach((goal) => {
    if (goal.activity) blocks.push(goal.activity);
    if (goal.questions?.length) blocks.push(...goal.questions);
  });

  if (payload?.closingBlock) {
    blocks.push(payload.closingBlock);
  }

  return blocks;
}

/**
 * useGoals hook
 * @param {string} initialUseCaseId - Initial use case id
 * @returns {{
 *  studyMeta: Object,
 *  goals: Array,
 *  welcomeBlock: Object,
 *  closingBlock: Object,
 *  selectedBlockId: string,
 *  selectedBlock: Object,
 *  selectBlock: Function,
 *  updateBlock: Function,
 *  setUseCase: Function,
 * }}
 */
export function useGoals(initialUseCaseId = DEFAULT_USE_CASE) {
  const [useCaseId, setUseCaseId] = useState(initialUseCaseId);
  const initialUseCase = USE_CASES[useCaseId] || USE_CASES[DEFAULT_USE_CASE];
  const initialPayload = cloneUseCase(initialUseCase);
  const initialBlocks = getAllBlocks(initialPayload);

  const [studyMeta, setStudyMeta] = useState(initialPayload.studyMeta);
  const [goals, setGoals] = useState(initialPayload.goals);
  const [welcomeBlock, setWelcomeBlock] = useState(initialPayload.welcomeBlock);
  const [closingBlock, setClosingBlock] = useState(initialPayload.closingBlock);
  const [selectedBlockId, setSelectedBlockId] = useState(initialBlocks[0]?.id);

  /**
   * Select a block by id.
   * @param {string} blockId - Block id
   */
  const selectBlock = useCallback((blockId) => {
    setSelectedBlockId(blockId);
  }, []);

  /**
   * Update a block with a partial patch.
   * @param {string} blockId - Block id
   * @param {Object} patch - Partial block fields to merge
   */
  const updateBlock = useCallback((blockId, patch) => {
    setWelcomeBlock((prev) => (prev?.id === blockId ? { ...prev, ...patch } : prev));
    setClosingBlock((prev) => (prev?.id === blockId ? { ...prev, ...patch } : prev));

    setGoals((prevGoals) =>
      prevGoals.map((goal) => {
        let didUpdate = false;
        let nextGoal = goal;

        if (goal.activity?.id === blockId) {
          nextGoal = { ...nextGoal, activity: { ...goal.activity, ...patch } };
          didUpdate = true;
        }

        if (goal.questions?.some((question) => question.id === blockId)) {
          nextGoal = {
            ...nextGoal,
            questions: goal.questions.map((question) =>
              question.id === blockId ? { ...question, ...patch } : question
            ),
          };
          didUpdate = true;
        }

        return didUpdate ? nextGoal : goal;
      })
    );

    console.log('Block updated:', { blockId, patch });
  }, []);

  /**
   * Update the goal description for a goal that owns the given block id.
   * @param {string} blockId - Activity block id to locate the goal
   * @param {string} description - New goal description
   */
  const updateGoalDescription = useCallback((blockId, description) => {
    setGoals((prevGoals) =>
      prevGoals.map((goal) => {
        if (goal.activity?.id !== blockId) return goal;
        return { ...goal, description };
      })
    );

    console.log('Goal description updated:', { blockId, description });
  }, []);

  /**
   * Update the AI moderated flag for a goal that owns the given block id.
   * @param {string} blockId - Activity block id to locate the goal
   * @param {boolean} isAIModerated - Toggle value
   */
  const updateGoalAIModerated = useCallback((blockId, isAIModerated) => {
    setGoals((prevGoals) =>
      prevGoals.map((goal) => {
        if (goal.activity?.id !== blockId) return goal;
        return { ...goal, isAIModerated };
      })
    );

    console.log('Goal AI moderation updated:', { blockId, isAIModerated });
  }, []);

  /**
   * Update the scenario text for a goal that owns the given block id.
   * @param {string} blockId - Activity block id to locate the goal
   * @param {string} scenario - New scenario text
   */
  const updateGoalScenario = useCallback((blockId, scenario) => {
    setGoals((prevGoals) =>
      prevGoals.map((goal) => {
        if (goal.activity?.id !== blockId) return goal;
        return { ...goal, scenario };
      })
    );

    console.log('Goal scenario updated:', { blockId, scenario });
  }, []);

  /**
   * Switch to a different use case.
   * @param {string} nextUseCaseId - Use case id
   */
  const setUseCase = useCallback((nextUseCaseId) => {
    const nextUseCase = USE_CASES[nextUseCaseId] || USE_CASES[DEFAULT_USE_CASE];
    const nextPayload = cloneUseCase(nextUseCase);
    const nextBlocks = getAllBlocks(nextPayload);

    setUseCaseId(nextUseCaseId);
    setStudyMeta(nextPayload.studyMeta);
    setGoals(nextPayload.goals);
    setWelcomeBlock(nextPayload.welcomeBlock);
    setClosingBlock(nextPayload.closingBlock);
    setSelectedBlockId(nextBlocks[0]?.id);
  }, []);

  const selectedBlock = useMemo(() => {
    const payload = { goals, welcomeBlock, closingBlock };
    const allBlocks = getAllBlocks(payload);
    return allBlocks.find((block) => block.id === selectedBlockId);
  }, [goals, welcomeBlock, closingBlock, selectedBlockId]);

  return {
    studyMeta,
    goals,
    welcomeBlock,
    closingBlock,
    selectedBlockId,
    selectedBlock,
    selectBlock,
    updateBlock,
    updateGoalDescription,
    updateGoalAIModerated,
    updateGoalScenario,
    setUseCase,
  };
}

export default useGoals;
