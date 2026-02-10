/**
 * ThemeResults Component
 * 
 * Displays thematic analysis results with a 3-step flow:
 * 1. Initial view with confidence progress and "Start analysis" button
 * 2. Theme method selection (AI vs manual)
 * 3. Analyzing animation (using Rive animation from monorepo)
 * 4. Results view with generated themes
 */
import { useState, useEffect, useRef } from 'react';
import { Flex, Box, Text, Heading, ScrollContainer, CTAButton, ActionButton, IconFigure } from '@framework/components/ariane';
import { Play, Check, Star, Highlighter, LayoutGrid, FileText, Sparkles, Tag, RefreshCw, EyeOff, Share2, Download, Copy, Pencil, MoreHorizontal, ChevronRight } from 'lucide-react';
import { useRive } from '@rive-app/react-webgl2';
import { HighlightCard } from './HighlightCard';

/**
 * Mock uncategorized highlights - these need to be assigned themes
 * Must match total highlights across blocks: prototype_test(4) + scale(2) + input(2) = 8
 * New highlights: prototype_test(2) + scale(1) + input(2) = 5
 */
const MOCK_UNCATEGORIZED_HIGHLIGHTS = [
  // From prototype_test (2 new, 2 old)
  {
    id: 'uh1',
    insight: "Monica is excited about the feature that automatically creates a session and captures information, making it easier to upload and analyze audio or video.",
    transcript: "Because that would make, that would be fantastic because that's one of the things w...",
    themes: [],
    isNew: true,
    participantId: '483697735',
    blockType: 'prototype_test',
  },
  {
    id: 'uh2',
    insight: "User found the filtering feature intuitive but wished for more advanced options like date range filtering.",
    transcript: "I really like how the filters work, they're pretty intuitive. But I was looking for a way to filter by date range and couldn't find it...",
    themes: [],
    isNew: true,
    participantId: '483697736',
    blockType: 'prototype_test',
  },
  {
    id: 'uh3',
    insight: "The navigation flow was described as intuitive and easy to follow, with clear visual hierarchy.",
    transcript: "I really liked how the navigation was laid out. Everything felt like it was where I expected it to be...",
    themes: [],
    isNew: false,
    participantId: '483697738',
    blockType: 'prototype_test',
  },
  {
    id: 'uh4',
    insight: "Mobile responsiveness was praised, with the layout adapting well to smaller screens.",
    transcript: "Even on my phone, the experience was smooth. The buttons were easy to tap and nothing felt cramped...",
    themes: [],
    isNew: false,
    participantId: '483697739',
    blockType: 'prototype_test',
  },
  // From scale (1 new, 1 old)
  {
    id: 'uh5',
    insight: "Participant gave a high rating but mentioned the learning curve was steeper than expected initially.",
    transcript: "I'd give it an 8 out of 10. It's really powerful once you get the hang of it, but it took me a bit to understand all the features...",
    themes: [],
    isNew: true,
    participantId: '483697737',
    blockType: 'scale',
  },
  {
    id: 'uh6',
    insight: "High satisfaction scores were correlated with users who had prior experience with similar tools.",
    transcript: "Since I've used similar products before, this felt very familiar. I'd rate it quite highly...",
    themes: [],
    isNew: false,
    participantId: '483697735',
    blockType: 'scale',
  },
  // From input (2 new)
  {
    id: 'uh7',
    insight: "Users consistently mention wanting better onboarding documentation and tooltips for complex features.",
    transcript: "I think the main improvement would be having more tooltips or a guided tour when you first start. Some features are hidden and not obvious...",
    themes: [],
    isNew: true,
    participantId: '483697738',
    blockType: 'input',
  },
  {
    id: 'uh8',
    insight: "Multiple participants expressed desire for keyboard shortcuts to speed up their workflow.",
    transcript: "If there were keyboard shortcuts for the common actions, that would save me a lot of time. Right now I have to click through menus...",
    themes: [],
    isNew: true,
    participantId: '483697739',
    blockType: 'input',
  },
];

/**
 * AI-generated themes for the results view
 * Highlight counts should add up to 8 (total highlights from blocks)
 */
/**
 * Centralized theme color mapping
 * Each theme has: primary (for icons/tags), bg (for highlights), hoverBg (for hover states)
 */
export const THEME_COLOR_MAP = {
  'Navigation and discoverability needs improvement': { primary: '#3B82F6', bg: '#DBEAFE', hoverBg: '#BFDBFE' },
  'Filter functionality is intuitive but limited': { primary: '#F59E0B', bg: '#FEF3C7', hoverBg: '#FDE68A' },
  'Learning curve steeper than expected': { primary: '#EC4899', bg: '#FCE7F3', hoverBg: '#FBCFE8' },
  'Onboarding and documentation gaps identified': { primary: '#10B981', bg: '#D1FAE5', hoverBg: '#A7F3D0' },
  'Power users want keyboard shortcuts': { primary: '#8B5CF6', bg: '#E0E7FF', hoverBg: '#C7D2FE' },
  'Mobile experience praised for responsiveness': { primary: '#06B6D4', bg: '#CFFAFE', hoverBg: '#A5F3FC' },
  'Performance concerns affecting user perception': { primary: '#EF4444', bg: '#FEE2E2', hoverBg: '#FECACA' },
  'Data security and privacy concerns': { primary: '#A855F7', bg: '#F3E8FF', hoverBg: '#E9D5FF' },
};

const GENERATED_THEMES = [
  { id: 'theme-1', name: 'Navigation and discoverability needs improvement', color: THEME_COLOR_MAP['Navigation and discoverability needs improvement'].primary, highlightCount: 2 },
  { id: 'theme-2', name: 'Filter functionality is intuitive but limited', color: THEME_COLOR_MAP['Filter functionality is intuitive but limited'].primary, highlightCount: 1 },
  { id: 'theme-3', name: 'Mobile experience praised for responsiveness', color: THEME_COLOR_MAP['Mobile experience praised for responsiveness'].primary, highlightCount: 1 },
  { id: 'theme-4', name: 'Onboarding and documentation gaps identified', color: THEME_COLOR_MAP['Onboarding and documentation gaps identified'].primary, highlightCount: 2 },
  { id: 'theme-5', name: 'Power users want keyboard shortcuts', color: THEME_COLOR_MAP['Power users want keyboard shortcuts'].primary, highlightCount: 1 },
  { id: 'theme-6', name: 'Learning curve steeper than expected', color: THEME_COLOR_MAP['Learning curve steeper than expected'].primary, highlightCount: 1 },
];

/**
 * Feature list item with icon - matches monorepo ThematicAnalysisBullets pattern
 */
function FeatureItem({ iconName, children }) {
  return (
    <Flex alignItems="center" gap="SM" className="py-1">
      <IconFigure size="SM" color="success" name={iconName} />
      <Text>{children}</Text>
    </Flex>
  );
}

/**
 * Gradient Progress Bar - matches monorepo GradientProgressBar.tsx
 */
function GradientProgressBar({ progress, fromColor = '#10B981', toColor = '#10B981' }) {
  return (
    <div className="flex-1 h-2 bg-neutral-200 rounded-full relative overflow-hidden">
      <div 
        className="absolute left-0 top-0 h-full rounded-full transition-all duration-500 ease-out"
        style={{ 
          width: `${Math.min(progress, 100)}%`,
          background: `linear-gradient(90deg, ${fromColor} 0%, ${toColor} 100%)`
        }}
      />
    </div>
  );
}

/**
 * Confidence levels for unmoderated studies
 * Thresholds: <5 (low), 5-20 (medium), 21-100 (high), 100+ (extra-high)
 */
const CONFIDENCE_LEVELS = {
  low: {
    label: 'LOW CONFIDENCE',
    color: 'bg-[#FEE2E2] text-[#DC2626]',
    threshold: 5,
  },
  medium: {
    label: 'COMMON ISSUES UNCOVERED', 
    color: 'bg-[#FEF3C7] text-[#D97706]',
    threshold: 20,
  },
  high: {
    label: 'HIGH CONFIDENCE',
    color: 'bg-[#E0E7FF] text-[#7C3AED]',
    threshold: 100,
  },
  extraHigh: {
    label: 'GREAT CONFIDENCE',
    color: 'bg-[#DBEAFE] text-[#2563EB]',
    threshold: Infinity,
  },
};

const getConfidenceLevel = (responses) => {
  if (responses >= 100) return 'extraHigh';
  if (responses >= 21) return 'high';
  if (responses >= 5) return 'medium';
  return 'low';
};

/**
 * Confidence progress bar - adapted for unmoderated study thresholds
 * Thresholds: 5, 20, 100+
 */
function ConfidenceProgress({ currentResponses = 42 }) {
  const threshold1 = 5;
  const threshold2 = 20;
  const threshold3 = 100;
  
  const isPast5 = currentResponses >= threshold1;
  const isPast20 = currentResponses >= threshold2;
  const isPast100 = currentResponses >= threshold3;
  
  // Calculate progress for each segment
  const progress1 = Math.min((currentResponses / threshold1) * 100, 100);
  const progress2 = isPast5 ? Math.min(((currentResponses - threshold1) / (threshold2 - threshold1)) * 100, 100) : 0;
  const progress3 = isPast20 ? Math.min(((currentResponses - threshold2) / (threshold3 - threshold2)) * 100, 100) : 0;
  
  const confidenceLevel = getConfidenceLevel(currentResponses);
  const levelConfig = CONFIDENCE_LEVELS[confidenceLevel];

  return (
    <div 
      className="p-5 rounded-xl"
      style={{ 
        boxShadow: 'inset 0 0 0 1px rgba(108, 113, 140, 0.16)',
        background: 'linear-gradient(180deg, #FAFBFC 0%, #FFFFFF 100%)'
      }}
    >
      <Flex justifyContent="space-between" alignItems="center" className="mb-5">
        <Text className="text-xs font-semibold text-[#6C718C] uppercase tracking-wider">
          {levelConfig.label}
        </Text>
        <span className={`px-2.5 py-1 rounded-md text-xs font-semibold ${levelConfig.color}`}>
          {currentResponses} RESPONSE{currentResponses !== 1 ? 'S' : ''}
        </span>
      </Flex>

      <Flex alignItems="center" gap="XS">
        {/* Start icon */}
        <Flex flexDirection="column" alignItems="center" className="flex-shrink-0">
          <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center">
            <ChevronRight size={16} className="text-neutral-500" />
          </div>
          <Text type="caption" color="default.main.secondary" className="mt-1 text-xs">1</Text>
        </Flex>

        {/* First progress bar (1 → 5) */}
        <GradientProgressBar 
          progress={progress1} 
          fromColor="#FCA5A5" 
          toColor="#F59E0B" 
        />

        {/* Threshold 1: 5 responses */}
        <Flex flexDirection="column" alignItems="center" className="flex-shrink-0">
          <div className={`
            w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300
            ${isPast5 
              ? 'bg-[#F59E0B] text-white shadow-sm' 
              : 'bg-white border-2 border-neutral-200 text-neutral-400'}
          `}>
            <Check size={16} strokeWidth={2.5} />
          </div>
          <Text type="caption" color="default.main.secondary" className="mt-1 text-xs">5</Text>
        </Flex>

        {/* Second progress bar (5 → 20) */}
        <GradientProgressBar 
          progress={progress2} 
          fromColor="#F59E0B" 
          toColor="#8B5CF6" 
        />

        {/* Threshold 2: 20 responses */}
        <Flex flexDirection="column" alignItems="center" className="flex-shrink-0">
          <div className={`
            w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300
            ${isPast20 
              ? 'bg-[#8B5CF6] text-white shadow-sm' 
              : 'bg-white border-2 border-neutral-200 text-neutral-400'}
          `}>
            <Check size={16} strokeWidth={2.5} />
          </div>
          <Text type="caption" color="default.main.secondary" className="mt-1 text-xs">20</Text>
        </Flex>

        {/* Third progress bar (20 → 100) */}
        <GradientProgressBar 
          progress={progress3} 
          fromColor="#8B5CF6" 
          toColor="#3B82F6" 
        />

        {/* Threshold 3: 100+ responses */}
        <Flex flexDirection="column" alignItems="center" className="flex-shrink-0">
          <div className={`
            w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300
            ${isPast100 
              ? 'bg-[#3B82F6] text-white shadow-sm' 
              : 'bg-white border-2 border-neutral-200 text-neutral-400'}
          `}>
            <Star size={16} fill={isPast100 ? 'currentColor' : 'none'} />
          </div>
          <Text type="caption" color="default.main.secondary" className="mt-1 text-xs">100+</Text>
        </Flex>
      </Flex>
    </div>
  );
}

/**
 * Get copy based on response count for unmoderated studies
 * Following Maze's UX writing patterns from useTestersLevel.ts
 */
const getInitialViewCopy = (responseCount) => {
  if (responseCount >= 100) {
    return {
      title: 'Great job collecting responses!',
      description: 'More responses means greater confidence that all problems have been found. You can run the analysis now or keep collecting.',
      ctaEmphasis: 'primary',
      showBullets: true,
    };
  }
  if (responseCount >= 21) {
    return {
      title: 'Ready for reliable insights',
      description: 'Keep up the pace to discover undetected issues in your designs—increasing the number of responses can uncover all usability problems.',
      ctaEmphasis: 'primary',
      showBullets: true,
    };
  }
  if (responseCount >= 5) {
    return {
      title: 'Common issues uncovered',
      description: (
        <>
          At this level, you uncover the most common issues and learn how your designs perform. For more reliable insights, aim for <strong>20 responses or more</strong>.
        </>
      ),
      ctaEmphasis: 'primary',
      showBullets: true,
    };
  }
  return {
    title: 'Not quite there yet',
    description: (
      <>
        Test your maze with <strong>at least 5 people</strong> to start learning how your designs perform with real users.
      </>
    ),
    ctaEmphasis: 'tertiary',
    showBullets: false,
  };
};

/**
 * Step 1: Initial view with Start Analysis button
 * Copy adapted for unmoderated studies following Maze UX writing patterns
 */
function InitialView({ onStartAnalysis }) {
  const responseCount = 42; // Mock response count
  const copy = getInitialViewCopy(responseCount);

  return (
    <>
      <ConfidenceProgress currentResponses={responseCount} />

      <Flex flexDirection="column" gap="MD" className="mt-6">
        <Heading level={4}>{copy.title}</Heading>
        <Text color="default.main.secondary">
          {copy.description}{' '}
          <a href="#" className="text-[#0568FD] font-medium hover:underline">
            Learn more about thematic analysis
          </a>
        </Text>
      </Flex>

      {copy.showBullets && (
        <Flex flexDirection="column" gap="MD" className="mt-6">
          <FeatureItem iconName="highlight">
            Generate and assign themes to highlights
          </FeatureItem>
          <FeatureItem iconName="summary">
            Get a summary and key takeaways for each theme
          </FeatureItem>
          <FeatureItem iconName="screen-clip">
            Generate a report ready to share and present
          </FeatureItem>
        </Flex>
      )}

      <Flex justifyContent="flex-end" className="mt-auto pt-8">
        <CTAButton emphasis={copy.ctaEmphasis} size="MD" onClick={onStartAnalysis}>
          Start analysis
        </CTAButton>
      </Flex>
    </>
  );
}

/**
 * Step 2: Theme method selection
 * Matches monorepo ThematicAnalysisConfig.tsx pattern
 */
function MethodSelectionView({ onCancel, onAnalyze }) {
  const [selectedMethod, setSelectedMethod] = useState('ai');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    onAnalyze();
  };

  return (
    <>
      <Heading level={1} color="default.main.primary" className="mb-4">
        Thematic analysis
      </Heading>
      
      <Text color="default.main.secondary" className="mb-6">
        Your session highlights will be automatically organized into themes. You can run the analysis from scratch with AI-generated themes, or using your own themes.
      </Text>

      <Flex flexDirection="column" gap="SM" className="mb-2">
        <Text className="font-semibold text-neutral-900">Starting themes</Text>
        <Text type="caption" color="default.main.secondary">
          You can generate themes using AI or manually add them.
        </Text>
      </Flex>

      <Flex gap="MD" className="mb-6">
        {/* AI Option */}
        <button
          onClick={() => setSelectedMethod('ai')}
          className={`
            flex-1 p-4 rounded-xl cursor-pointer transition-all bg-white
            ${selectedMethod === 'ai' 
              ? 'shadow-[inset_0px_0px_0px_2px_#0568fd] bg-[#F0F7FF]' 
              : 'shadow-[inset_0px_0px_0px_1px_rgba(108,113,140,0.16)] hover:shadow-[inset_0px_0px_0px_1px_rgba(108,113,140,0.32)]'
            }
          `}
        >
          <Flex alignItems="center" gap="SM" className="mb-3">
            <div className={`
              w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors
              ${selectedMethod === 'ai' ? 'border-[#0568FD]' : 'border-neutral-300'}
            `}>
              {selectedMethod === 'ai' && (
                <div className="w-2.5 h-2.5 rounded-full bg-[#0568FD]" />
              )}
            </div>
            <IconFigure name="sparkles" size="SM" color="featured" />
          </Flex>
          <Text className="font-medium text-left">Find themes with AI</Text>
        </button>

        {/* Manual Option */}
        <button
          onClick={() => setSelectedMethod('manual')}
          className={`
            flex-1 p-4 rounded-xl cursor-pointer transition-all bg-white
            ${selectedMethod === 'manual' 
              ? 'shadow-[inset_0px_0px_0px_2px_#0568fd] bg-[#F0F7FF]' 
              : 'shadow-[inset_0px_0px_0px_1px_rgba(108,113,140,0.16)] hover:shadow-[inset_0px_0px_0px_1px_rgba(108,113,140,0.32)]'
            }
          `}
        >
          <Flex alignItems="center" gap="SM" className="mb-3">
            <div className={`
              w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors
              ${selectedMethod === 'manual' ? 'border-[#0568FD]' : 'border-neutral-300'}
            `}>
              {selectedMethod === 'manual' && (
                <div className="w-2.5 h-2.5 rounded-full bg-[#0568FD]" />
              )}
            </div>
            <IconFigure name="tag" size="SM" color="neutral" />
          </Flex>
          <Text className="font-medium text-left">My own themes</Text>
        </button>
      </Flex>

      <Flex justifyContent="space-between" className="mt-auto pt-6">
        <CTAButton emphasis="tertiary" onClick={onCancel}>
          Cancel
        </CTAButton>
        <CTAButton emphasis="primary" waiting={isAnalyzing} onClick={handleAnalyze}>
          Analyze
        </CTAButton>
      </Flex>
    </>
  );
}

/**
 * Step 3: Analyzing animation view - uses Rive animation from monorepo
 * Matches ThematicAnalysisPending.tsx pattern
 */
function AnalyzingView() {
  const containerRef = useRef(null);
  const { RiveComponent } = useRive({
    useOffscreenRenderer: true,
    src: '/animations/thematic-analysis-loading.riv',
    autoplay: true,
  });

  useEffect(() => {
    if (containerRef.current) {
      // Find the canvas element inside the container and apply border radius
      const canvas = containerRef.current.querySelector('canvas');
      if (canvas) {
        canvas.style.borderRadius = '12px';
      }
    }
  }, []);

  return (
    <Flex flexDirection="column" gap="LG" className="flex-1">
      <Heading level={1} color="default.main.primary">
        Analyzing highlights...
      </Heading>
      
      {/* Rive Animation Container */}
      <Box
        position="relative"
        width="100%"
        height="293px"
        boxShadow="divider.all"
        borderRadius="12px"
        overflow="hidden"
        p="0.5px"
        ref={containerRef}
      >
        <RiveComponent style={{ height: '293px', width: '100%' }} />
      </Box>
      
      <Text color="default.main.secondary">
        The analysis may take a few minutes. No need to wait here; you can safely return to this page later.
      </Text>
    </Flex>
  );
}

/**
 * Theme tag component with color
 */
function ThemeTag({ name, color }) {
  // Use centralized colors
  const themeColors = THEME_COLOR_MAP[name] || { primary: color, bg: `${color}15` };
  
  return (
    <span 
      className="inline-block px-3 py-1.5 rounded-full text-sm font-medium mb-2 mr-2"
      style={{ backgroundColor: themeColors.bg, color: themeColors.primary }}
    >
      {name}
    </span>
  );
}

/**
 * Step 4: Results view with generated themes
 * Matches monorepo ThematicAnalysisResults.tsx pattern
 */
function ResultsView({ themes, onRunNewAnalysis }) {
  return (
    <>
      {/* Header */}
      <Flex gap="SM" flexDirection="column" className="mb-4">
        <Flex alignItems="center" justifyContent="space-between">
          <Heading level={1} color="default.main.primary">
            Analysis results
          </Heading>
          <CTAButton size="SM" emphasis="tertiary" onClick={onRunNewAnalysis}>
            Run new analysis
          </CTAButton>
        </Flex>
        <Text type="caption" color="default.main.secondary">
          Latest analysis: 20 hours ago
        </Text>
      </Flex>

      <Flex flexDirection="column" gap="SM">
        {/* Highlights analyzed card */}
        <Flex 
          padding="MD" 
          justifyContent="start" 
          alignItems="center" 
          boxShadow="divider.all" 
          borderRadius="8px"
        >
          <Flex alignItems="center" gap="SM">
            <IconFigure name="highlight" size="MD" color="secondary" />
            <Text>42 highlights analyzed</Text>
          </Flex>
        </Flex>

        {/* Themes found card */}
        <Flex 
          padding="MD" 
          flexDirection="column" 
          justifyContent="start" 
          boxShadow="divider.all" 
          borderRadius="8px" 
          gap="SM"
        >
          <Flex alignItems="center" gap="SM">
            <IconFigure name="tag" size="MD" color="secondary" />
            <Text>{themes.length} themes found</Text>
          </Flex>
          <Flex gap="SM" flexWrap="wrap">
            {themes.map((theme) => (
              <ThemeTag key={theme.id} name={theme.name} color={theme.color} />
            ))}
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}

/**
 * Mock highlights data for each generated theme
 */
const THEME_HIGHLIGHTS = {
  'theme-1': [
    {
      id: 'th1-1',
      insight: "The participant identifies navigation issues, noting that some features were hard to discover without guidance.",
      transcript: "I really liked how the navigation was laid out. Everything felt like it was where I expected it to be...",
      themes: ['Navigation and discoverability needs improvement'],
      isNew: false,
      participantId: '483697738',
    },
    {
      id: 'th1-2',
      insight: "User struggled to find key features, suggesting better visual cues or onboarding would help.",
      transcript: "I was looking for the settings but couldn't find it easily. Maybe a more prominent icon would help...",
      themes: ['Navigation and discoverability needs improvement'],
      isNew: false,
      participantId: '483697739',
    },
  ],
  'theme-2': [
    {
      id: 'th2-1',
      insight: "User found the filtering feature intuitive but wished for more advanced options like date range filtering.",
      transcript: "I really like how the filters work, they're pretty intuitive. But I was looking for a way to filter by date range and couldn't find it...",
      themes: ['Filter functionality is intuitive but limited'],
      isNew: false,
      participantId: '483697736',
    },
  ],
  'theme-3': [
    {
      id: 'th3-1',
      insight: "Mobile responsiveness was praised, with the layout adapting well to smaller screens.",
      transcript: "Even on my phone, the experience was smooth. The buttons were easy to tap and nothing felt cramped...",
      themes: ['Mobile experience praised for responsiveness'],
      isNew: false,
      participantId: '483697739',
    },
  ],
  'theme-4': [
    {
      id: 'th4-1',
      insight: "Users consistently mention wanting better onboarding documentation and tooltips for complex features.",
      transcript: "I think the main improvement would be having more tooltips or a guided tour when you first start. Some features are hidden and not obvious...",
      themes: ['Onboarding and documentation gaps identified'],
      isNew: false,
      participantId: '483697738',
    },
    {
      id: 'th4-2',
      insight: "The learning curve was mentioned as a barrier for new users without proper documentation.",
      transcript: "It took me a while to figure out how everything works. Some documentation would have been helpful...",
      themes: ['Onboarding and documentation gaps identified'],
      isNew: false,
      participantId: '483697735',
    },
  ],
  'theme-5': [
    {
      id: 'th5-1',
      insight: "Multiple participants expressed desire for keyboard shortcuts to speed up their workflow.",
      transcript: "If there were keyboard shortcuts for the common actions, that would save me a lot of time. Right now I have to click through menus...",
      themes: ['Power users want keyboard shortcuts'],
      isNew: false,
      participantId: '483697739',
    },
  ],
  'theme-6': [
    {
      id: 'th6-1',
      insight: "Participant gave a high rating but mentioned the learning curve was steeper than expected initially.",
      transcript: "I'd give it an 8 out of 10. It's really powerful once you get the hang of it, but it took me a bit to understand all the features...",
      themes: ['Learning curve steeper than expected'],
      isNew: false,
      participantId: '483697737',
    },
  ],
};

/**
 * Mock analysis data for themes
 */
const THEME_ANALYSIS = {
  'theme-1': {
    summary: "While the overall navigation structure was appreciated, users consistently reported difficulty discovering certain features. The main pain points center around hidden functionality and lack of visual cues for important actions.",
    details: [
      {
        title: "Hidden features frustrate users",
        description: "Users need confidence that new initiatives will resonate before investing heavily in navigation changes.",
        quote: "I was looking for the settings but couldn't find it easily. Maybe a more prominent icon would help.",
        quotee: "David E., Director of Research and Insights • Purpose Brand...",
      },
      {
        title: "Visual hierarchy needs improvement",
        description: "Key actions should be more prominently displayed to reduce cognitive load.",
        quote: "Everything felt like it was where I expected it to be, but some things were harder to find than others.",
        quotee: "Madelaine E., Head of Marketing • Lego (02:02)",
      },
    ],
  },
};

/**
 * ThemeDetailView - Shows when a generated theme is selected
 * Displays highlights assigned to this theme with summary and analysis
 */
function ThemeDetailView({ theme }) {
  const [hasSummary, setHasSummary] = useState(false);
  const highlights = THEME_HIGHLIGHTS[theme.id] || [];
  const analysis = THEME_ANALYSIS[theme.id];
  const totalSessions = 21; // Mock total
  const themeSessions = 18; // Mock sessions with this theme
  const percentage = Math.round((themeSessions / totalSessions) * 100);
  
  // Get centralized colors for this theme
  const themeColors = THEME_COLOR_MAP[theme.name] || { primary: theme.color, bg: `${theme.color}15` };

  return (
    <>
      {/* Header */}
      <Flex alignItems="flex-start" justifyContent="space-between" className="mb-6">
        <Flex alignItems="flex-start" gap="MD">
          <div 
            className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: themeColors.bg }}
          >
            <Tag size={24} style={{ color: themeColors.primary }} />
          </div>
          <div>
            <Heading level={1} className="text-2xl font-semibold mb-1">
              {theme.name}
            </Heading>
            <Text color="default.main.secondary">
              Events and conditions that prompt organizations to conduct brand testing
            </Text>
          </div>
        </Flex>
        <Flex alignItems="center" gap="SM">
          <ActionButton emphasis="secondary" size="SM" icon={<EyeOff size={16} />}>
            Hide in report
          </ActionButton>
          <ActionButton emphasis="primary" size="SM" icon={<Share2 size={16} />}>
            Share theme
          </ActionButton>
          <ActionButton emphasis="tertiary" size="SM" icon={<Download size={16} />} iconOnly />
        </Flex>
      </Flex>

      {/* Progress bar */}
      <div className="p-4 border border-[rgba(108,113,140,0.16)] rounded-xl mb-6">
        <Text color="default.main.secondary" className="text-sm mb-2">
          Theme highlighted in {themeSessions} of {totalSessions} sessions
        </Text>
        <div className="flex items-center gap-3">
          <div className="flex-1 h-2 bg-neutral-100 rounded-full overflow-hidden">
            <div 
              className="h-full rounded-full"
              style={{ width: `${percentage}%`, backgroundColor: themeColors.primary }}
            />
          </div>
          <Text className="font-medium">{percentage} %</Text>
        </div>
      </div>

      {/* Two column layout */}
      <Flex gap="XL" className="flex-1">
        {/* Left column - Analysis */}
        <div className="w-[400px] flex-shrink-0">
          <div className="p-6 border border-[rgba(108,113,140,0.16)] rounded-xl">
            <Flex alignItems="center" justifyContent="space-between" className="mb-4">
              <Text className="font-semibold text-lg">Analysis</Text>
              <Flex alignItems="center" gap="XS">
                <ActionButton emphasis="tertiary" size="SM" icon={<Copy size={16} />} iconOnly />
                <ActionButton emphasis="tertiary" size="SM" icon={<Pencil size={16} />}>
                  Edit
                </ActionButton>
              </Flex>
            </Flex>

            {hasSummary || analysis ? (
              <>
                <Text className="text-xs font-semibold text-[#6C718C] uppercase tracking-wide mb-2">
                  SUMMARY
                </Text>
                <Text className="mb-6 leading-relaxed">
                  {analysis?.summary || "While many organizations aspire to regular, scheduled brand testing cadences (quarterly or biannual), the reality is that most studies remain "}
                  <strong>reactive responses to specific business events</strong>
                  {" (new campaigns, product launches, and rebranding initiatives are primary triggers). This gap between aspiration and reality represents a key opportunity for an always-on AI solution."}
                </Text>

                <Text className="text-xs font-semibold text-[#6C718C] uppercase tracking-wide mb-4">
                  DETAILS
                </Text>
                
                {(analysis?.details || [
                  {
                    title: "New campaigns & product launches",
                    description: "Orgs need confidence that new initiatives will resonate before investing heavily in launch and media spend.",
                    quote: "I recently launched a new campaign and we did testing from animatic testing on the video asset to testing the campaign and focus groups even as far as prior to that working on like taglines and things via surveys. So we ran the full gamut of testing prior to launching.",
                    quotee: "Brand Manager - Heaven Hill",
                  },
                ]).map((detail, index) => (
                  <div key={index} className="mb-4">
                    <Flex alignItems="flex-start" gap="SM">
                      <div 
                        className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                        style={{ backgroundColor: themeColors.primary }}
                      />
                      <div>
                        <Text className="font-semibold mb-1">{detail.title}:</Text>
                        <Text color="default.main.secondary" className="mb-2">
                          {detail.description}
                        </Text>
                        <div className="pl-4 border-l-2 border-neutral-200">
                          <Text className="italic text-neutral-600 text-sm">
                            "{detail.quote}"
                          </Text>
                          <Text color="default.main.secondary" className="text-sm mt-1">
                            {detail.quotee}
                          </Text>
                        </div>
                      </div>
                    </Flex>
                  </div>
                ))}
              </>
            ) : (
              <Flex flexDirection="column" alignItems="center" justifyContent="center" className="py-8 text-center">
                <div className="w-12 h-12 rounded-full bg-[#F9F7FF] flex items-center justify-center mb-4">
                  <Sparkles size={24} className="text-[#6B5BEE]" />
                </div>
                <Text className="font-medium mb-2">Generate a summary</Text>
                <Text color="default.main.secondary" className="text-sm mb-4 max-w-[280px]">
                  Create an AI-powered summary and key takeaways from the highlights in this theme.
                </Text>
                <ActionButton 
                  emphasis="secondary" 
                  size="SM" 
                  icon={<Sparkles size={16} />}
                  onClick={() => setHasSummary(true)}
                >
                  Generate summary
                </ActionButton>
              </Flex>
            )}
          </div>
        </div>

        {/* Right column - Highlights Reel */}
        <div className="flex-1">
          <Flex alignItems="center" gap="SM" className="mb-4">
            <LayoutGrid size={20} className="text-[#6C718C]" />
            <Text className="font-semibold uppercase text-sm tracking-wide text-[#6C718C]">
              HIGHLIGHTS REEL
            </Text>
            <span className="px-2 py-0.5 bg-neutral-100 text-[#6C718C] text-sm font-medium rounded">
              {highlights.length}
            </span>
          </Flex>

          <Flex flexDirection="column" gap="MD">
            {highlights.map((highlight) => (
              <HighlightCard
                key={highlight.id}
                insight={highlight.insight}
                transcript={highlight.transcript}
                themes={highlight.themes}
                isNew={false}
                participantId={highlight.participantId}
                showThemeTag={true}
                themeColor={themeColors.primary}
              />
            ))}
          </Flex>
        </div>
      </Flex>
    </>
  );
}

/**
 * ThemeResults - Main component for theme detail view
 * @param {Object} props.theme - The theme to display
 * @param {boolean} props.isViewed - Whether the theme has been viewed (hides new indicators)
 * @param {Function} props.onAnalysisComplete - Callback when analysis is complete (to update theme list)
 */
export function ThemeResults({ theme, isViewed = false, onAnalysisComplete }) {
  const isThematicAnalysis = theme?.id === 'thematic-analysis';
  const isUncategorized = theme?.id === 'uncategorized';
  const isGeneratedTheme = theme?.color !== undefined;
  
  // Analysis flow state: 'initial' | 'selecting' | 'analyzing' | 'complete'
  const [analysisStep, setAnalysisStep] = useState('initial');

  // Simulate analysis completion after delay
  useEffect(() => {
    if (analysisStep === 'analyzing') {
      const timer = setTimeout(() => {
        setAnalysisStep('complete');
        // Notify parent to update theme list
        if (onAnalysisComplete) {
          onAnalysisComplete(GENERATED_THEMES);
        }
      }, 3000); // 3 second animation
      return () => clearTimeout(timer);
    }
  }, [analysisStep, onAnalysisComplete]);

  if (!theme) {
    return (
      <Flex alignItems="center" justifyContent="center" className="h-full">
        <Text color="default.main.secondary">Select a theme to view details</Text>
      </Flex>
    );
  }

  // If this is a generated theme, show the detail view
  if (isGeneratedTheme) {
    return (
      <ScrollContainer className="h-full">
        <Flex flexDirection="column" className="p-6 h-full min-h-[600px]">
          <ThemeDetailView theme={theme} />
        </Flex>
      </ScrollContainer>
    );
  }

  return (
    <ScrollContainer className="h-full">
      <Flex flexDirection="column" className="p-6 h-full min-h-[600px]">
        {/* Theme Title - only show in initial and selecting steps */}
        {(analysisStep === 'initial' || analysisStep === 'selecting') && (
          <Heading level={1} className="text-2xl font-semibold mb-8">
            {theme.name}
          </Heading>
        )}

        {isThematicAnalysis ? (
          <>
            {analysisStep === 'initial' && (
              <InitialView onStartAnalysis={() => setAnalysisStep('selecting')} />
            )}
            {analysisStep === 'selecting' && (
              <MethodSelectionView 
                onCancel={() => setAnalysisStep('initial')}
                onAnalyze={() => setAnalysisStep('analyzing')}
              />
            )}
            {analysisStep === 'analyzing' && (
              <AnalyzingView />
            )}
            {analysisStep === 'complete' && (
              <ResultsView 
                themes={GENERATED_THEMES}
                onRunNewAnalysis={() => setAnalysisStep('selecting')}
              />
            )}
          </>
        ) : isUncategorized ? (
          /* Uncategorized view - shows highlights that need themes */
          <Box>
            <Flex alignItems="center" gap="SM" className="mb-6">
              <span className={`
                px-2 py-1 rounded text-sm font-medium
                ${!isViewed && MOCK_UNCATEGORIZED_HIGHLIGHTS.filter(h => h.isNew).length > 0 
                  ? 'bg-[#F9F7FF] text-[#6B5BEE]' 
                  : 'bg-neutral-100 text-[#6C718C]'
                }
              `}>
                {MOCK_UNCATEGORIZED_HIGHLIGHTS.length} highlights
              </span>
              <Text color="default.main.secondary">
                need to be categorized
              </Text>
            </Flex>

            <Flex flexDirection="column" gap="MD">
              {MOCK_UNCATEGORIZED_HIGHLIGHTS.map((highlight) => (
                <HighlightCard
                  key={highlight.id}
                  insight={highlight.insight}
                  transcript={highlight.transcript}
                  themes={highlight.themes}
                  isNew={isViewed ? false : highlight.isNew}
                  participantId={highlight.participantId}
                />
              ))}
            </Flex>
          </Box>
        ) : null}
      </Flex>
    </ScrollContainer>
  );
}

export default ThemeResults;

export { GENERATED_THEMES };
