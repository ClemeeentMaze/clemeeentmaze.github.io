// Ariane Design System - Tailwind Port
// Barrel exports for all components

// ============================================
// Phase 1: Pure Styling Components
// ============================================
export { Text, textVariants } from './ui/Text';
export { Heading, headingVariants } from './ui/Heading';
export { Link } from './ui/Link';
export { Box } from './ui/Box';
export { Flex } from './ui/Flex';
export { VisuallyHidden } from './ui/VisuallyHidden';
export { Bar } from './ui/Bar';
export { ProgressBar } from './ui/ProgressBar';
export { Avatar, avatarVariants } from './ui/Avatar';
export { Tag } from './ui/Tag';
export { TextBadge, textBadgeVariants } from './ui/TextBadge';
export { ErrorText } from './ui/ErrorText';
export { Dot } from './ui/Dot';

// Figure Components
export {
  BaseFigure,
  InitialsFigure,
  ImageFigure,
  IconFigure,
  FigureStack,
  ShapeBadge,
  figureSizeMap,
} from './ui/Figure';

// Cards
export { HoverCard, hoverCardVariants } from './ui/HoverCard';

// ============================================
// Phase 2: Form Components
// ============================================
export { CTAButton, ctaButtonVariants } from './ui/CTAButton';
export { ActionButton, actionButtonVariants } from './ui/ActionButton';
export { CheckboxControl } from './ui/CheckboxControl';
export { CheckboxField } from './ui/CheckboxField';
export { RadioControl, RadioGroup } from './ui/RadioControl';
export { TextInputControl } from './ui/TextInputControl';
export { TextAreaControl } from './ui/TextAreaControl';
export { SearchControl } from './ui/SearchControl';
export { Field } from './ui/Field';
export { SegmentControl } from './ui/SegmentControl';
export { InfoBox } from './ui/InfoBox';
export { StepsProgressBar } from './ui/StepsProgressBar';

// ============================================
// Phase 3: Complex Components (Radix)
// ============================================
export { Toggle } from './ui/Toggle';
export { Tooltip } from './ui/Tooltip';
export { InfoTooltip, InfoCircleIcon } from './ui/InfoTooltip';
export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuGroup,
  SimpleDropdownMenu,
} from './ui/DropdownMenu';
export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectLabel,
  SimpleSelect,
} from './ui/Select';

// ============================================
// Icons
// ============================================
export { Icon } from './ui/Icon';

// ============================================
// Annotation System
// ============================================
export { Annotation } from './ui/Annotation';

// ============================================
// Layout Components
// ============================================
export { ScrollContainer } from './ui/ScrollContainer';

// ============================================
// Utilities
// ============================================
export { cn } from './lib/utils';
