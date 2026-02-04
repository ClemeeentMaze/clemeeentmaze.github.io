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
import { useEffect, useMemo, useRef } from 'react';
import { Flex, Box } from '@framework/components/ariane';
import { useStatePlayground } from '@framework/hooks/useStatePlayground';

// Local components
import { BuilderHeader } from './components/BuilderHeader';
import { BlockList } from './components/BlockList';
import { BlockSettings } from './components/BlockSettings';
import { BlockPreview } from './components/BlockPreview';

// Mock data
import { BLOCK_TYPES, DEFAULT_USE_CASE } from './data';
import { useBlocks } from './hooks/useBlocks';

/**
 * AiModUnmodV4 - Main prototype component
 * 
 * Implements the full-height layout of the Maze study builder:
 * - Header (64px fixed)
 * - Content area (fills remaining height):
 *   - Left panel (360px): Block list
 *   - Middle panel (flex): Block settings
 *   - Right panel (flex, min 400px): Block preview
 */
function AiModUnmodV4() {
  const { state } = useStatePlayground();
  const {
    studyMeta,
    blocks,
    selectedBlock,
    selectedBlockId,
    selectBlock,
    updateBlock,
  } = useBlocks(DEFAULT_USE_CASE);

  const { selectedBlockType, blockCount } = state || {};

  /**
   * Slice the visible block list for demo purposes.
   */
  const visibleBlocks = useMemo(() => {
    if (!blockCount || blockCount >= blocks.length) {
      return blocks;
    }

    const fixedCount = blocks.filter((block) => block.isFixed).length;
    const nonFixedLimit = Math.max(blockCount - fixedCount, 0);
    const result = [];
    let nonFixedUsed = 0;

    blocks.forEach((block) => {
      if (block.isFixed) {
        result.push(block);
        return;
      }
      if (nonFixedUsed < nonFixedLimit) {
        result.push(block);
        nonFixedUsed += 1;
      }
    });

    return result;
  }, [blocks, blockCount]);

  /**
   * Keep selection valid when visible blocks change.
   */
  useEffect(() => {
    const stillVisible = visibleBlocks.find((block) => block.id === selectedBlockId);
    if (!stillVisible && visibleBlocks[0]) {
      selectBlock(visibleBlocks[0].id);
    }
  }, [visibleBlocks, selectedBlockId, selectBlock]);

  /**
   * Select the first block of a given type for demos.
   * Only triggers when selectedBlockType actually changes (not on every visibleBlocks update).
   */
  const prevBlockTypeRef = useRef(selectedBlockType);
  useEffect(() => {
    // Only act when selectedBlockType actually changed
    if (selectedBlockType === prevBlockTypeRef.current) return;
    prevBlockTypeRef.current = selectedBlockType;

    if (!selectedBlockType) return;
    const blockOfType = visibleBlocks.find((block) => block.type === selectedBlockType);
    if (blockOfType) {
      selectBlock(blockOfType.id);
    }
  }, [selectedBlockType, visibleBlocks, selectBlock]);

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
            blocks={visibleBlocks}
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
          <BlockSettings block={selectedBlock} onBlockChange={updateBlock} />
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
AiModUnmodV4.Title = "V4 - AI Moderated Groups";
AiModUnmodV4.Description = "Group a sequence of blocks under AI moderation";
AiModUnmodV4.Order = 40;
AiModUnmodV4.Group = "AI moderation in unmoderated";
AiModUnmodV4.StateControls = {
  selectedBlockType: {
    label: 'Jump to Block Type',
    type: 'select',
    options: Object.keys(BLOCK_TYPES),
    default: 'welcome',
  },
  blockCount: {
    label: 'Visible Blocks',
    type: 'range',
    min: 2,
    max: 25,
    default: 25,
  },
};

export default AiModUnmodV4;
