/**
 * Ariane Design System Components
 * 
 * ⚠️  DO NOT DELETE THIS PROTOTYPE
 * 
 * This prototype serves as the interactive reference for all Ariane components.
 * The Cursor rules (ariane-design-system.mdc) reference this prototype to help
 * AI guide designers to existing components.
 * 
 * You can archive this prototype (prefix folder with .) to hide it from the 
 * main list, but removing it will make component discovery less effective.
 * 
 * ---
 * 
 * Comprehensive interactive showcase for all Ariane Tailwind components.
 * Test variants, states, and interactions.
 */
import { useState } from 'react';
import {
  // Phase 1: Pure Styling
  Text,
  Heading,
  Link,
  Box,
  Flex,
  VisuallyHidden,
  Bar,
  ProgressBar,
  Avatar,
  Tag,
  TextBadge,
  ErrorText,
  Dot,
  // Figure Components
  BaseFigure,
  InitialsFigure,
  ImageFigure,
  IconFigure,
  FigureStack,
  ShapeBadge,
  // Cards
  HoverCard,
  // Phase 2: Form Components
  CTAButton,
  ActionButton,
  CheckboxControl,
  CheckboxField,
  RadioControl,
  RadioGroup,
  TextInputControl,
  TextAreaControl,
  SearchControl,
  Field,
  SegmentControl,
  InfoBox,
  StepsProgressBar,
  // Phase 3: Complex Components
  Toggle,
  Tooltip,
  InfoTooltip,
  SimpleDropdownMenu,
  SimpleSelect,
} from '@framework/components/ariane';

/**
 * Section wrapper component
 */
function Section({ id, title, description, children }) {
  return (
    <section id={id} className="mb-xxl scroll-mt-lg">
      <div className="mb-lg pb-sm border-b border-neutral-200">
        <Heading level={2} className="mb-xs">{title}</Heading>
        {description && (
          <Text type="caption" color="default.main.secondary">{description}</Text>
        )}
      </div>
      <div className="space-y-lg">
        {children}
      </div>
    </section>
  );
}

/**
 * Component demo wrapper
 */
function Demo({ title, children }) {
  return (
    <div className="p-md bg-neutral-100 rounded-ariane">
      <Text type="caption" color="default.main.secondary" className="mb-sm font-semibold">
        {title}
      </Text>
      <div className="bg-white p-md rounded-ariane shadow-card-dormant">
        {children}
      </div>
    </div>
  );
}

/**
 * Main Ariane Component Showcase
 */
function ArianeComponents() {
  // Interactive state for demos
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [radioValue, setRadioValue] = useState('option1');
  const [toggleChecked, setToggleChecked] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [textareaValue, setTextareaValue] = useState('');
  const [selectValue, setSelectValue] = useState('');
  const [segmentValue, setSegmentValue] = useState('day');
  const [progressValue, setProgressValue] = useState(65);

  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-lg py-xl">
        {/* Header */}
        <div className="mb-xxl">
          <Heading level={1} className="mb-md">Ariane Design System</Heading>
          <Text type="lead" color="default.main.secondary">
            A comprehensive Tailwind CSS port of the Ariane design system with exact prop interfaces 
            for seamless replacement. Built with CVA, tailwind-merge, and Radix UI primitives.
          </Text>
        </div>

        {/* ==================== TYPOGRAPHY ==================== */}
        <Section 
          id="typography" 
          title="Typography"
          description="Text, Heading, and Link components for consistent typography."
        >
          <Demo title="Text Variants">
            <Flex flexDirection="column" gap="SM">
              <Text type="kicker">Kicker Text (13px/16px, bold, uppercase)</Text>
              <Text type="caption">Caption Text (14px/20px)</Text>
              <Text type="default">Default Text (16px/24px)</Text>
              <Text type="lead">Lead Text (18px/24px)</Text>
            </Flex>
          </Demo>

          <Demo title="Text Colors">
            <Flex gap="MD" flexWrap="wrap">
              <Text color="neutral900">Primary</Text>
              <Text color="default.main.secondary">Secondary</Text>
              <Text color="default.extra.awake">Awake</Text>
              <Text color="default.extra.critical">Critical</Text>
              <Text color="default.extra.warning">Warning</Text>
              <Text color="default.extra.success">Success</Text>
              <Text color="default.extra.featured">Featured</Text>
            </Flex>
          </Demo>

          <Demo title="Text Truncation">
            <Flex flexDirection="column" gap="SM">
              <Text truncate inline style={{ maxWidth: '200px' }}>
                This is a very long text that should be truncated with ellipsis when it exceeds the container width
              </Text>
              <Text type="caption" color="default.main.secondary">
                Uses truncate prop with max-width constraint
              </Text>
            </Flex>
          </Demo>

          <Demo title="Heading Levels">
            <Flex flexDirection="column" gap="SM">
              <Heading level={1}>Heading 1 (23px/32px)</Heading>
              <Heading level={2}>Heading 2 (20px/24px)</Heading>
              <Heading level={3}>Heading 3 (18px/24px)</Heading>
              <Heading level={4}>Heading 4 (16px/24px)</Heading>
              <Heading level={5}>Heading 5 (14px/20px)</Heading>
            </Flex>
          </Demo>

          <Demo title="Heading Colors">
            <Flex gap="MD" flexWrap="wrap">
              <Heading level={4}>Default</Heading>
              <Heading level={4} color="default.extra.awake">Awake</Heading>
              <Heading level={4} color="default.extra.critical">Critical</Heading>
              <Heading level={4} color="default.extra.featured">Featured</Heading>
            </Flex>
          </Demo>

          <Demo title="Links">
            <Flex gap="MD">
              <Link href="#" type="caption">Caption Link</Link>
              <Link href="#" type="default">Default Link</Link>
              <Link href="#" type="lead">Lead Link</Link>
            </Flex>
          </Demo>
        </Section>

        {/* ==================== LAYOUT ==================== */}
        <Section 
          id="layout" 
          title="Layout"
          description="Box and Flex components for building layouts."
        >
          <Demo title="Box with Spacing">
            <Flex gap="MD">
              <Box p="SM" bg="#F0FAFF" borderRadius="8px">
                <Text type="caption">p=SM (8px)</Text>
              </Box>
              <Box p="MD" bg="#F0FAFF" borderRadius="8px">
                <Text type="caption">p=MD (16px)</Text>
              </Box>
              <Box p="LG" bg="#F0FAFF" borderRadius="8px">
                <Text type="caption">p=LG (24px)</Text>
              </Box>
            </Flex>
          </Demo>

          <Demo title="Box with Borders">
            <Flex gap="MD">
              <Box 
                p="MD" 
                bg="#F8F8FB" 
                borderRadius="8px"
                style={{ border: '1px solid #E8E8F1' }}
              >
                <Text>Box with border</Text>
              </Box>
              <Box p="SM" bg="#0568FD" borderRadius="4px">
                <Text color="default.extra.onExtra" type="caption">Colored Box</Text>
              </Box>
            </Flex>
          </Demo>

          <Demo title="Flex Layout">
            <Flex gap="MD" flexDirection="column">
              <Flex gap="SM" alignItems="center">
                <Box p="SM" bg="#0568FD" borderRadius="4px">
                  <Text type="caption" color="default.extra.onExtra">1</Text>
                </Box>
                <Box p="SM" bg="#6B5BEE" borderRadius="4px">
                  <Text type="caption" color="default.extra.onExtra">2</Text>
                </Box>
                <Box p="SM" bg="#CC3F4D" borderRadius="4px">
                  <Text type="caption" color="default.extra.onExtra">3</Text>
                </Box>
                <Text type="caption" color="default.main.secondary">← Row with gap=SM</Text>
              </Flex>
              <Flex gap="SM" justifyContent="space-between">
                <Box p="SM" bg="#15807B" borderRadius="4px">
                  <Text type="caption" color="default.extra.onExtra">Start</Text>
                </Box>
                <Box p="SM" bg="#AC5F00" borderRadius="4px">
                  <Text type="caption" color="default.extra.onExtra">End</Text>
                </Box>
              </Flex>
              <Flex flexDirection="column" gap="XS">
                <Text type="caption">Column Item A</Text>
                <Text type="caption">Column Item B</Text>
                <Text type="caption">Column Item C</Text>
              </Flex>
            </Flex>
          </Demo>

          <Demo title="Spacing Scale">
            <Flex flexDirection="column" gap="XS">
              {[
                { token: 'XS', value: '4px' },
                { token: 'SM', value: '8px' },
                { token: 'SMPlus', value: '12px' },
                { token: 'MD', value: '16px' },
                { token: 'LG', value: '24px' },
                { token: 'XL', value: '32px' },
                { token: 'XLPlus', value: '40px' },
                { token: 'XXL', value: '56px' },
              ].map(({ token, value }) => (
                <Flex key={token} alignItems="center" gap="SM">
                  <div className="w-[60px]">
                    <Text type="caption">{token}</Text>
                  </div>
                  <div 
                    className="h-4 bg-blue-500 rounded"
                    style={{ width: value }}
                  />
                  <Text type="caption" color="default.main.secondary">{value}</Text>
                </Flex>
              ))}
            </Flex>
          </Demo>
        </Section>

        {/* ==================== CARDS ==================== */}
        <Section 
          id="cards" 
          title="Cards"
          description="Interactive card components with hover effects and states."
        >
          <Demo title="HoverCard Default">
            <Flex gap="MD">
              <HoverCard 
                bg="neutral000" 
                padding="MD" 
                borderRadius="8px"
                className="w-48"
              >
                <Text type="heading4">Card Title</Text>
                <Text type="caption" color="default.main.secondary" className="mt-xs">
                  Hover over me to see the shadow effect.
                </Text>
              </HoverCard>
              <HoverCard 
                bg="neutral000" 
                padding="MD" 
                borderRadius="8px"
                className="w-48"
              >
                <Text type="heading4">Another Card</Text>
                <Text type="caption" color="default.main.secondary" className="mt-xs">
                  Default hover behavior.
                </Text>
              </HoverCard>
            </Flex>
          </Demo>

          <Demo title="HoverCard Scaling">
            <Flex gap="MD">
              <HoverCard 
                ctype="scaling"
                bg="neutral000" 
                padding="MD" 
                borderRadius="8px"
                className="w-48"
              >
                <Text type="heading4">Scaling Card</Text>
                <Text type="caption" color="default.main.secondary" className="mt-xs">
                  Hover to see scale + shadow effect.
                </Text>
              </HoverCard>
            </Flex>
          </Demo>

          <Demo title="HoverCard States">
            <Flex gap="MD">
              <HoverCard 
                active
                bg="neutral000" 
                padding="MD" 
                borderRadius="8px"
                className="w-48"
              >
                <Text type="heading4">Active Card</Text>
                <Text type="caption" color="default.main.secondary" className="mt-xs">
                  Always shows shadow.
                </Text>
              </HoverCard>
              <HoverCard 
                disabled
                bg="neutral100" 
                padding="MD" 
                borderRadius="8px"
                className="w-48"
              >
                <Text type="heading4">Disabled Card</Text>
                <Text type="caption" color="default.main.secondary" className="mt-xs">
                  No hover effects.
                </Text>
              </HoverCard>
            </Flex>
          </Demo>
        </Section>

        {/* ==================== FIGURES ==================== */}
        <Section 
          id="figures" 
          title="Figures"
          description="Flexible visual representations with different shapes, modes, and variants."
        >
          <Demo title="InitialsFigure Sizes">
            <Flex alignItems="center" gap="MD">
              <InitialsFigure initials="SM" color="awake" size="SM" />
              <InitialsFigure initials="MD" color="awake" size="MD" />
              <InitialsFigure initials="M+" color="awake" size="MDPlus" />
              <InitialsFigure initials="LG" color="awake" size="LG" />
              <InitialsFigure initials="XL" color="awake" size="XL" />
            </Flex>
          </Demo>

          <Demo title="InitialsFigure Sentiments (Light Mode)">
            <Flex alignItems="center" gap="MD">
              <InitialsFigure initials="AW" color="awake" mode="light" />
              <InitialsFigure initials="DO" color="dormant" mode="light" />
              <InitialsFigure initials="CR" color="critical" mode="light" />
              <InitialsFigure initials="WA" color="warning" mode="light" />
              <InitialsFigure initials="SU" color="success" mode="light" />
              <InitialsFigure initials="FT" color="featured" mode="light" />
            </Flex>
          </Demo>

          <Demo title="InitialsFigure Sentiments (Dark Mode)">
            <Flex alignItems="center" gap="MD">
              <InitialsFigure initials="AW" color="awake" mode="dark" />
              <InitialsFigure initials="DO" color="dormant" mode="dark" />
              <InitialsFigure initials="CR" color="critical" mode="dark" />
              <InitialsFigure initials="WA" color="warning" mode="dark" />
              <InitialsFigure initials="SU" color="success" mode="dark" />
              <InitialsFigure initials="FT" color="featured" mode="dark" />
            </Flex>
          </Demo>

          <Demo title="Figure Shapes">
            <Flex alignItems="center" gap="MD">
              <InitialsFigure initials="RO" color="awake" shape="rounded" size="LG" />
              <InitialsFigure initials="SQ" color="awake" shape="squared" size="LG" />
              <InitialsFigure initials="RO" color="featured" shape="rounded" size="LG" mode="dark" />
              <InitialsFigure initials="SQ" color="featured" shape="squared" size="LG" mode="dark" />
            </Flex>
          </Demo>

          <Demo title="ImageFigure">
            <Flex alignItems="center" gap="MD">
              <ImageFigure src="https://i.pravatar.cc/100?img=1" alt="User 1" size="SM" />
              <ImageFigure src="https://i.pravatar.cc/100?img=2" alt="User 2" size="MD" />
              <ImageFigure src="https://i.pravatar.cc/100?img=3" alt="User 3" size="MDPlus" />
              <ImageFigure src="https://i.pravatar.cc/100?img=4" alt="User 4" size="LG" />
              <ImageFigure src="https://i.pravatar.cc/100?img=5" alt="User 5" size="XL" />
            </Flex>
          </Demo>

          <Demo title="ImageFigure Shapes">
            <Flex alignItems="center" gap="MD">
              <ImageFigure src="https://i.pravatar.cc/100?img=6" alt="Rounded" size="LG" shape="rounded" />
              <ImageFigure src="https://i.pravatar.cc/100?img=7" alt="Squared" size="LG" shape="squared" />
            </Flex>
          </Demo>

          <Demo title="IconFigure">
            <Flex alignItems="center" gap="MD">
              <IconFigure name="user" color="awake" mode="light" />
              <IconFigure name="team" color="success" mode="light" />
              <IconFigure name="star" color="featured" mode="light" />
              <IconFigure name="heart" color="critical" mode="dark" />
              <IconFigure name="settings" color="dormant" mode="dark" />
            </Flex>
          </Demo>

          <Demo title="Figure with Badge">
            <Flex alignItems="center" gap="LG">
              <InitialsFigure 
                initials="JD" 
                color="awake" 
                size="LG"
                badge={{ sentiment: 'success', label: 'Online' }}
              />
              <InitialsFigure 
                initials="AB" 
                color="dormant" 
                size="LG"
                badge={{ sentiment: 'dormant', label: 'Offline' }}
              />
              <ImageFigure 
                src="https://i.pravatar.cc/100?img=8" 
                alt="User with status" 
                size="LG"
                badge={{ sentiment: 'critical', label: 'Busy' }}
              />
            </Flex>
          </Demo>

          <Demo title="FigureStack">
            <Flex flexDirection="column" gap="LG">
              <Flex alignItems="center" gap="MD">
                <FigureStack size="MD">
                  <InitialsFigure initials="AB" color="awake" size="MD" />
                  <InitialsFigure initials="CD" color="success" size="MD" />
                  <InitialsFigure initials="EF" color="featured" size="MD" />
                  <InitialsFigure initials="GH" color="warning" size="MD" />
                </FigureStack>
                <Text type="caption" color="default.main.secondary">LTR direction (default)</Text>
              </Flex>
              <Flex alignItems="center" gap="MD">
                <FigureStack size="MD" direction="rtl">
                  <InitialsFigure initials="AB" color="awake" size="MD" />
                  <InitialsFigure initials="CD" color="success" size="MD" />
                  <InitialsFigure initials="EF" color="featured" size="MD" />
                  <InitialsFigure initials="GH" color="warning" size="MD" />
                </FigureStack>
                <Text type="caption" color="default.main.secondary">RTL direction</Text>
              </Flex>
              <Flex alignItems="center" gap="MD">
                <FigureStack size="LG">
                  <ImageFigure src="https://i.pravatar.cc/100?img=10" alt="User 1" size="LG" />
                  <ImageFigure src="https://i.pravatar.cc/100?img=11" alt="User 2" size="LG" />
                  <ImageFigure src="https://i.pravatar.cc/100?img=12" alt="User 3" size="LG" />
                </FigureStack>
                <Text type="caption" color="default.main.secondary">Image stack (LG)</Text>
              </Flex>
            </Flex>
          </Demo>

          <Demo title="ShapeBadge (Standalone)">
            <Flex alignItems="center" gap="MD">
              <Flex alignItems="center" gap="XS">
                <ShapeBadge sentiment="awake" size="SM">Online</ShapeBadge>
                <Text type="caption">SM</Text>
              </Flex>
              <Flex alignItems="center" gap="XS">
                <ShapeBadge sentiment="success" size="MD">Active</ShapeBadge>
                <Text type="caption">MD</Text>
              </Flex>
              <Flex alignItems="center" gap="XS">
                <ShapeBadge sentiment="critical" size="LG">Alert</ShapeBadge>
                <Text type="caption">LG</Text>
              </Flex>
            </Flex>
          </Demo>
        </Section>

        {/* ==================== INDICATORS ==================== */}
        <Section 
          id="indicators" 
          title="Indicators"
          description="Visual indicators including avatars, badges, dots, and progress bars."
        >
          <Demo title="Avatar Sizes">
            <Flex alignItems="center" gap="MD">
              <Avatar size="xs">XS</Avatar>
              <Avatar size="sm">SM</Avatar>
              <Avatar size="m">M</Avatar>
              <Avatar size="lg">LG</Avatar>
              <Avatar size="xl">XL</Avatar>
            </Flex>
          </Demo>

          <Demo title="Avatar Variants">
            <Flex alignItems="center" gap="MD">
              <Avatar bg="#0568FD">AB</Avatar>
              <Avatar bg="#6B5BEE">CD</Avatar>
              <Avatar bg="#CC3F4D">EF</Avatar>
              <Avatar bg="#158053">GH</Avatar>
              <Avatar size="lg" borderColor="#0568FD">IJ</Avatar>
              <Avatar size="lg" displayImage imageUrl="https://i.pravatar.cc/100?img=3" />
            </Flex>
          </Demo>

          <Demo title="TextBadge Sentiments">
            <Flex gap="SM" flexWrap="wrap">
              <TextBadge sentiment="awake">Awake</TextBadge>
              <TextBadge sentiment="dormant">Dormant</TextBadge>
              <TextBadge sentiment="critical">Critical</TextBadge>
              <TextBadge sentiment="warning">Warning</TextBadge>
              <TextBadge sentiment="success">Success</TextBadge>
              <TextBadge sentiment="featured">Featured</TextBadge>
            </Flex>
          </Demo>

          <Demo title="TextBadge with Icons">
            <Flex gap="SM">
              <TextBadge icon="lock">Locked</TextBadge>
              <TextBadge icon="sparkles">Premium</TextBadge>
              <TextBadge icon="lock" iconOnly>Locked</TextBadge>
              <TextBadge icon="sparkles" iconOnly>Premium</TextBadge>
            </Flex>
          </Demo>

          <Demo title="Tags">
            <Flex gap="SM">
              <Tag>DEFAULT</Tag>
              <Tag bg="#0568FD" color="#FFF">BLUE</Tag>
              <Tag bg="#CC3F4D" color="#FFF">RED</Tag>
              <Tag bg="#6B5BEE" color="#FFF">PURPLE</Tag>
              <Tag bg="#158053" color="#FFF">GREEN</Tag>
            </Flex>
          </Demo>

          <Demo title="Dots">
            <Flex alignItems="center" gap="MD">
              <Flex alignItems="center" gap="XS">
                <Dot size={4} />
                <Text type="caption">4px</Text>
              </Flex>
              <Flex alignItems="center" gap="XS">
                <Dot size={8} color="blue500" />
                <Text type="caption">Active</Text>
              </Flex>
              <Flex alignItems="center" gap="XS">
                <Dot size={8} color="forest500" />
                <Text type="caption">Success</Text>
              </Flex>
              <Flex alignItems="center" gap="XS">
                <Dot size={8} color="red500" />
                <Text type="caption">Error</Text>
              </Flex>
              <Flex alignItems="center" gap="XS">
                <Dot size={8} color="amber500" />
                <Text type="caption">Warning</Text>
              </Flex>
              <Flex alignItems="center" gap="XS">
                <Dot size={12} color="lavender500" />
                <Text type="caption">12px</Text>
              </Flex>
              <Flex alignItems="center" gap="XS">
                <Dot size={16} color="cyan400" />
                <Text type="caption">16px</Text>
              </Flex>
            </Flex>
          </Demo>

          <Demo title="Progress Bar (Interactive)">
            <Flex flexDirection="column" gap="MD">
              <Flex alignItems="center" gap="MD">
                <div style={{ width: '200px' }}>
                  <ProgressBar value={progressValue} max={100} />
                </div>
                <Text type="caption">{progressValue}%</Text>
              </Flex>
              <input
                type="range"
                min="0"
                max="100"
                value={progressValue}
                onChange={(e) => setProgressValue(parseInt(e.target.value))}
                className="w-[200px]"
              />
              <Text type="caption" color="default.main.secondary">
                Color changes based on percentage: red (&lt;25%), amber (25-50%), cyan (&gt;50%)
              </Text>
            </Flex>
          </Demo>

          <Demo title="Progress Bar Solid">
            <Flex flexDirection="column" gap="SM">
              <div style={{ width: '200px' }}>
                <ProgressBar value={60} max={100} solid />
              </div>
              <Text type="caption" color="default.main.secondary">
                Solid variant (no background gradient)
              </Text>
            </Flex>
          </Demo>

          <Demo title="Bar Component">
            <Flex flexDirection="column" gap="SM">
              <Bar percent={25} color="red500" />
              <Bar percent={50} color="amber500" />
              <Bar percent={75} color="cyan400" />
              <Bar percent={100} color="blue500" />
            </Flex>
          </Demo>

          <Demo title="StepsProgressBar">
            <Flex flexDirection="column" gap="LG">
              <Flex alignItems="center" gap="MD">
                <div style={{ width: '200px' }}>
                  <StepsProgressBar steps={5} activeStep={0} color="blue" />
                </div>
                <Text type="caption" color="default.main.secondary">Step 1 of 5</Text>
              </Flex>
              <Flex alignItems="center" gap="MD">
                <div style={{ width: '200px' }}>
                  <StepsProgressBar steps={5} activeStep={2} color="blue" />
                </div>
                <Text type="caption" color="default.main.secondary">Step 3 of 5</Text>
              </Flex>
              <Flex alignItems="center" gap="MD">
                <div style={{ width: '200px' }}>
                  <StepsProgressBar steps={5} activeStep={4} color="blue" />
                </div>
                <Text type="caption" color="default.main.secondary">Step 5 of 5</Text>
              </Flex>
            </Flex>
          </Demo>

          <Demo title="StepsProgressBar Colors">
            <Flex flexDirection="column" gap="SM">
              <StepsProgressBar steps={4} activeStep={2} color="blue" />
              <StepsProgressBar steps={4} activeStep={2} color="forest" />
              <StepsProgressBar steps={4} activeStep={2} color="lavender" />
              <StepsProgressBar steps={4} activeStep={2} color="amber" />
              <StepsProgressBar steps={4} activeStep={2} color="red" />
            </Flex>
          </Demo>
        </Section>

        {/* ==================== BUTTONS ==================== */}
        <Section 
          id="buttons" 
          title="Buttons"
          description="CTAButton and ActionButton components with emphasis, size, and state variants."
        >
          <Demo title="CTAButton - Primary">
            <Flex gap="MD" alignItems="center">
              <CTAButton emphasis="primary" size="MD">Primary MD</CTAButton>
              <CTAButton emphasis="primary" size="SM">Primary SM</CTAButton>
            </Flex>
          </Demo>

          <Demo title="CTAButton - Tertiary">
            <Flex gap="MD" alignItems="center">
              <CTAButton emphasis="tertiary" size="MD">Tertiary MD</CTAButton>
              <CTAButton emphasis="tertiary" size="SM">Tertiary SM</CTAButton>
            </Flex>
          </Demo>

          <Demo title="CTAButton - Destructive">
            <Flex gap="MD" alignItems="center">
              <CTAButton emphasis="primary" destructive>Delete Item</CTAButton>
              <CTAButton emphasis="tertiary" destructive>Cancel</CTAButton>
            </Flex>
          </Demo>

          <Demo title="CTAButton - States">
            <Flex gap="MD" alignItems="center" flexWrap="wrap">
              <CTAButton emphasis="primary" disabled>Disabled</CTAButton>
              <CTAButton emphasis="primary" waiting>Loading...</CTAButton>
              <CTAButton emphasis="primary" pulse>Attention</CTAButton>
            </Flex>
          </Demo>

          <Demo title="ActionButton - Secondary">
            <Flex gap="MD" alignItems="center">
              <ActionButton emphasis="secondary" size="MD">Secondary MD</ActionButton>
              <ActionButton emphasis="secondary" size="SM">Secondary SM</ActionButton>
            </Flex>
          </Demo>

          <Demo title="ActionButton - Tertiary">
            <Flex gap="MD" alignItems="center">
              <ActionButton emphasis="tertiary" size="MD">Tertiary MD</ActionButton>
              <ActionButton emphasis="tertiary" size="SM">Tertiary SM</ActionButton>
            </Flex>
          </Demo>

          <Demo title="ActionButton - With Icon">
            <Flex gap="MD" alignItems="center">
              <ActionButton 
                emphasis="secondary" 
                icon={<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>}
              >
                Add Item
              </ActionButton>
              <ActionButton 
                emphasis="tertiary" 
                icon={<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>}
              >
                Remove
              </ActionButton>
            </Flex>
          </Demo>

          <Demo title="ActionButton - Icon Only">
            <Flex gap="MD" alignItems="center">
              <ActionButton 
                emphasis="secondary" 
                iconOnly
                icon={<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>}
              >
                Add
              </ActionButton>
              <ActionButton 
                emphasis="tertiary" 
                iconOnly
                icon={<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="5.25" stroke="currentColor" strokeWidth="1.5"/></svg>}
              >
                Search
              </ActionButton>
            </Flex>
          </Demo>

          <Demo title="ActionButton - Destructive">
            <Flex gap="MD" alignItems="center">
              <ActionButton emphasis="secondary" destructive>Delete</ActionButton>
              <ActionButton emphasis="tertiary" destructive>Remove</ActionButton>
            </Flex>
          </Demo>

          <Demo title="ActionButton - States">
            <Flex gap="MD" alignItems="center" flexWrap="wrap">
              <ActionButton emphasis="secondary" active>Active</ActionButton>
              <ActionButton emphasis="secondary" disabled>Disabled</ActionButton>
              <ActionButton emphasis="secondary" waiting>Loading</ActionButton>
            </Flex>
          </Demo>

          <Demo title="Full Width">
            <div style={{ width: '300px' }}>
              <CTAButton emphasis="primary" fullWidth>Full Width Button</CTAButton>
            </div>
          </Demo>
        </Section>

        {/* ==================== INPUTS ==================== */}
        <Section 
          id="inputs" 
          title="Inputs"
          description="Text input and textarea components with validation states."
        >
          <Demo title="Text Input (Interactive)">
            <div style={{ maxWidth: '300px' }}>
              <Field label="Email Address" required>
                <TextInputControl
                  type="email"
                  placeholder="name@example.com"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
              </Field>
            </div>
          </Demo>

          <Demo title="Input Sizes">
            <Flex gap="MD" flexDirection="column" style={{ maxWidth: '300px' }}>
              <TextInputControl size="MD" placeholder="Medium (MD)" />
              <TextInputControl size="SM" placeholder="Small (SM)" />
            </Flex>
          </Demo>

          <Demo title="Input States">
            <Flex gap="MD" flexDirection="column" style={{ maxWidth: '300px' }}>
              <TextInputControl placeholder="Default state" />
              <TextInputControl error="This field is required" placeholder="Error state" />
              <TextInputControl disabled placeholder="Disabled state" />
              <TextInputControl readOnly value="Read-only value" />
            </Flex>
          </Demo>

          <Demo title="Field with Helper Text">
            <div style={{ maxWidth: '300px' }}>
              <Field 
                label="Password" 
                helperText="Must be at least 8 characters"
              >
                <TextInputControl type="password" placeholder="Enter password" />
              </Field>
            </div>
          </Demo>

          <Demo title="Textarea (Interactive)">
            <div style={{ maxWidth: '400px' }}>
              <Field 
                label="Description" 
                helperText="Provide a detailed description"
                count={textareaValue.length}
                maxLength={500}
              >
                <TextAreaControl
                  placeholder="Enter your description..."
                  value={textareaValue}
                  onChange={(e) => setTextareaValue(e.target.value)}
                  rows={4}
                />
              </Field>
            </div>
          </Demo>

          <Demo title="Textarea States">
            <Flex gap="MD" flexDirection="column" style={{ maxWidth: '300px' }}>
              <TextAreaControl placeholder="Default state" />
              <TextAreaControl error="Please provide more details" placeholder="Error state" />
              <TextAreaControl disabled placeholder="Disabled state" />
            </Flex>
          </Demo>

          <Demo title="SearchControl">
            <Flex gap="MD" flexDirection="column" style={{ maxWidth: '300px' }}>
              <SearchControl placeholder="Search..." />
              <SearchControl placeholder="Clearable search" clearable />
              <SearchControl placeholder="Small search" size="SM" clearable />
              <SearchControl placeholder="Disabled" disabled />
            </Flex>
          </Demo>

          <Demo title="CheckboxField">
            <Flex gap="MD" flexDirection="column">
              <CheckboxField
                valueLabel="I accept the terms and conditions"
              />
              <CheckboxField
                valueLabel="Subscribe to newsletter"
                helperText="We'll send you updates about new features"
              />
              <CheckboxField
                valueLabel="Invalid option"
                error="You must accept this to continue"
              />
              <CheckboxField
                valueLabel="Disabled option"
                disabled
              />
            </Flex>
          </Demo>
        </Section>

        {/* ==================== SELECTION ==================== */}
        <Section 
          id="selection" 
          title="Selection"
          description="Checkbox, radio, toggle, select, and segment controls."
        >
          <Demo title="Checkbox (Interactive)">
            <Flex alignItems="center" gap="SM">
              <CheckboxControl
                selected={checkboxChecked}
                onCheckedChange={setCheckboxChecked}
              />
              <Text type="caption">
                {checkboxChecked ? 'Checked' : 'Unchecked'} - Click to toggle
              </Text>
            </Flex>
          </Demo>

          <Demo title="Checkbox States">
            <Flex gap="LG" alignItems="flex-start">
              <Flex alignItems="center" gap="SM">
                <CheckboxControl />
                <Text type="caption">Default</Text>
              </Flex>
              <Flex alignItems="center" gap="SM">
                <CheckboxControl selected={true} />
                <Text type="caption">Checked</Text>
              </Flex>
              <Flex alignItems="center" gap="SM">
                <CheckboxControl error />
                <Text type="caption">Error</Text>
              </Flex>
              <Flex alignItems="center" gap="SM">
                <CheckboxControl disabled />
                <Text type="caption">Disabled</Text>
              </Flex>
              <Flex alignItems="center" gap="SM">
                <CheckboxControl disabled selected={true} />
                <Text type="caption">Disabled Checked</Text>
              </Flex>
            </Flex>
          </Demo>

          <Demo title="Radio Group (Interactive)">
            <RadioGroup value={radioValue} onValueChange={setRadioValue}>
              <Flex flexDirection="column" gap="SM">
                {['option1', 'option2', 'option3'].map((opt) => (
                  <Flex key={opt} alignItems="center" gap="SM">
                    <RadioControl value={opt} />
                    <Text type="caption">
                      Option {opt.slice(-1)} {radioValue === opt && '(selected)'}
                    </Text>
                  </Flex>
                ))}
              </Flex>
            </RadioGroup>
          </Demo>

          <Demo title="Radio Group Disabled">
            <RadioGroup defaultValue="option1" disabled>
              <Flex flexDirection="column" gap="SM">
                <Flex alignItems="center" gap="SM">
                  <RadioControl value="option1" />
                  <Text type="caption">Disabled Selected</Text>
                </Flex>
                <Flex alignItems="center" gap="SM">
                  <RadioControl value="option2" />
                  <Text type="caption">Disabled</Text>
                </Flex>
              </Flex>
            </RadioGroup>
          </Demo>

          <Demo title="Toggle (Interactive)">
            <Flex flexDirection="column" gap="MD">
              <Flex alignItems="center" gap="MD">
                <Toggle
                  size="m"
                  checked={toggleChecked}
                  onChange={setToggleChecked}
                />
                <Text type="caption">{toggleChecked ? 'On' : 'Off'}</Text>
              </Flex>
              <Flex alignItems="center" gap="MD">
                <Toggle size="xs" checked={true} onChange={() => {}} />
                <Toggle size="m" checked={true} onChange={() => {}} />
                <Toggle size="lg" checked={true} onChange={() => {}} />
                <Text type="caption" color="default.main.secondary">Sizes: xs, m, lg</Text>
              </Flex>
              <Flex alignItems="center" gap="MD">
                <Toggle size="m" checked={false} disabled onChange={() => {}} />
                <Toggle size="m" checked={true} disabled onChange={() => {}} />
                <Text type="caption" color="default.main.secondary">Disabled states</Text>
              </Flex>
              <Flex alignItems="center" gap="MD">
                <Toggle 
                  size="m" 
                  checked={true} 
                  onColor="#15807B"
                  offColor="#CC3F4D"
                  onChange={() => {}} 
                />
                <Text type="caption" color="default.main.secondary">Custom colors</Text>
              </Flex>
            </Flex>
          </Demo>

          <Demo title="Select (Interactive)">
            <div style={{ width: '250px' }}>
              <SimpleSelect
                placeholder="Choose an option..."
                value={selectValue}
                onChange={setSelectValue}
                options={[
                  { value: 'react', label: 'React' },
                  { value: 'vue', label: 'Vue' },
                  { value: 'angular', label: 'Angular' },
                  { value: 'svelte', label: 'Svelte' },
                ]}
              />
              {selectValue && (
                <Text type="caption" color="default.main.secondary" className="mt-sm">
                  Selected: {selectValue}
                </Text>
              )}
            </div>
          </Demo>

          <Demo title="Select Sizes">
            <Flex gap="MD" alignItems="flex-start">
              <div style={{ width: '200px' }}>
                <SimpleSelect
                  size="MD"
                  placeholder="Medium (MD)"
                  options={[{ value: 'a', label: 'Option A' }]}
                />
              </div>
              <div style={{ width: '160px' }}>
                <SimpleSelect
                  size="SM"
                  placeholder="Small (SM)"
                  options={[{ value: 'b', label: 'Option B' }]}
                />
              </div>
            </Flex>
          </Demo>

          <Demo title="Select States">
            <Flex gap="MD" alignItems="flex-start">
              <div style={{ width: '200px' }}>
                <SimpleSelect
                  value="option2"
                  options={[
                    { value: 'option1', label: 'First Option' },
                    { value: 'option2', label: 'Second Option' },
                    { value: 'option3', label: 'Third Option' },
                  ]}
                />
              </div>
              <div style={{ width: '200px' }}>
                <SimpleSelect
                  disabled
                  placeholder="Disabled select"
                  options={[{ value: 'x', label: 'Option X' }]}
                />
              </div>
            </Flex>
          </Demo>

          <Demo title="Segment Control Sizes">
            <Flex flexDirection="column" gap="LG">
              <Flex flexDirection="column" gap="SM">
                <Text type="caption" color="default.main.secondary" className="font-semibold">
                  Size: MD (Medium - default)
                </Text>
                <SegmentControl
                  size="MD"
                  selected={segmentValue}
                  onChange={setSegmentValue}
                  options={[
                    { id: 'day', label: 'Day' },
                    { id: 'week', label: 'Week' },
                    { id: 'month', label: 'Month' },
                    { id: 'year', label: 'Year' },
                  ]}
                />
              </Flex>
              <Flex flexDirection="column" gap="SM">
                <Text type="caption" color="default.main.secondary" className="font-semibold">
                  Size: SM (Small/Compact)
                </Text>
                <SegmentControl
                  size="SM"
                  selected={segmentValue}
                  onChange={setSegmentValue}
                  options={[
                    { id: 'day', label: 'Day' },
                    { id: 'week', label: 'Week' },
                    { id: 'month', label: 'Month' },
                    { id: 'year', label: 'Year' },
                  ]}
                />
              </Flex>
              <Text type="caption" color="default.main.secondary">
                Selected: {segmentValue}
              </Text>
            </Flex>
          </Demo>

          <Demo title="Segment Control Full Width">
            <Flex flexDirection="column" gap="LG">
              <div style={{ width: '400px' }}>
                <Text type="caption" color="default.main.secondary" className="font-semibold mb-sm">
                  Full Width - MD
                </Text>
                <SegmentControl
                  fullWidth
                  size="MD"
                  selected="grid"
                  onChange={() => {}}
                  options={[
                    { id: 'list', label: 'List View' },
                    { id: 'grid', label: 'Grid View' },
                    { id: 'table', label: 'Table View' },
                  ]}
                />
              </div>
              <div style={{ width: '400px' }}>
                <Text type="caption" color="default.main.secondary" className="font-semibold mb-sm">
                  Full Width - SM
                </Text>
                <SegmentControl
                  fullWidth
                  size="SM"
                  selected="grid"
                  onChange={() => {}}
                  options={[
                    { id: 'list', label: 'List View' },
                    { id: 'grid', label: 'Grid View' },
                    { id: 'table', label: 'Table View' },
                  ]}
                />
              </div>
            </Flex>
          </Demo>

          <Demo title="Segment Control Disabled">
            <Flex gap="MD" alignItems="center">
              <SegmentControl
                disabled
                size="MD"
                selected="a"
                onChange={() => {}}
                options={[
                  { id: 'a', label: 'Option A' },
                  { id: 'b', label: 'Option B' },
                ]}
              />
              <SegmentControl
                disabled
                size="SM"
                selected="a"
                onChange={() => {}}
                options={[
                  { id: 'a', label: 'Option A' },
                  { id: 'b', label: 'Option B' },
                ]}
              />
            </Flex>
          </Demo>
        </Section>

        {/* ==================== FEEDBACK ==================== */}
        <Section 
          id="feedback" 
          title="Feedback"
          description="Components for displaying messages and information."
        >
          <Demo title="ErrorText">
            <Flex flexDirection="column" gap="SM">
              <ErrorText>This field is required</ErrorText>
              <ErrorText>Please enter a valid email address</ErrorText>
              <ErrorText>Password must be at least 8 characters long and include a number</ErrorText>
            </Flex>
          </Demo>

          <Demo title="InfoBox">
            <Flex flexDirection="column" gap="MD" style={{ maxWidth: '400px' }}>
              <InfoBox
                title="Information"
                body="This is an informational message for the user."
              />
              <InfoBox
                title="Success!"
                body="Your changes have been saved successfully."
                bgColor="#EBFCFA"
                titleColor="#15807B"
                bodyColor="#147E90"
              />
              <InfoBox
                title="Warning"
                body="This action cannot be undone."
                bgColor="#FFF7F1"
                titleColor="#AC5F00"
                bodyColor="#D29615"
                dismissable={false}
              />
            </Flex>
          </Demo>

          <Demo title="VisuallyHidden">
            <Flex alignItems="center" gap="SM">
              <button className="p-sm bg-blue-500 text-white rounded-ariane">
                <span aria-hidden="true">×</span>
                <VisuallyHidden>Close dialog</VisuallyHidden>
              </button>
              <Text type="caption" color="default.main.secondary">
                Button with screen reader text (inspect to see)
              </Text>
            </Flex>
          </Demo>
        </Section>

        {/* ==================== OVERLAYS ==================== */}
        <Section 
          id="overlays" 
          title="Overlays"
          description="Tooltip and dropdown menu components."
        >
          <Demo title="Tooltip Types">
            <Flex gap="MD">
              <Tooltip label="Dark tooltip (default)" type="dark">
                <button className="px-md py-sm bg-neutral-100 rounded-ariane text-[14px]">
                  Dark
                </button>
              </Tooltip>
              <Tooltip label="Light tooltip" type="light">
                <button className="px-md py-sm bg-neutral-100 rounded-ariane text-[14px]">
                  Light
                </button>
              </Tooltip>
              <Tooltip label="Emphasized tooltip with animation" type="light-emphasized">
                <button className="px-md py-sm bg-neutral-100 rounded-ariane text-[14px]">
                  Emphasized
                </button>
              </Tooltip>
            </Flex>
          </Demo>

          <Demo title="Tooltip Placements">
            <Flex gap="SM" justifyContent="center" className="py-xl">
              <Tooltip label="Top tooltip" placement="top">
                <button className="px-md py-sm bg-neutral-100 rounded-ariane text-[14px]">
                  Top
                </button>
              </Tooltip>
              <Tooltip label="Right tooltip" placement="right">
                <button className="px-md py-sm bg-neutral-100 rounded-ariane text-[14px]">
                  Right
                </button>
              </Tooltip>
              <Tooltip label="Bottom tooltip" placement="bottom">
                <button className="px-md py-sm bg-neutral-100 rounded-ariane text-[14px]">
                  Bottom
                </button>
              </Tooltip>
              <Tooltip label="Left tooltip" placement="left">
                <button className="px-md py-sm bg-neutral-100 rounded-ariane text-[14px]">
                  Left
                </button>
              </Tooltip>
            </Flex>
          </Demo>

          <Demo title="InfoTooltip">
            <Flex gap="LG" alignItems="center">
              <Flex alignItems="center" gap="XS">
                <Text type="heading4">Label</Text>
                <InfoTooltip content="This is helpful information about this field." />
              </Flex>
              <Flex alignItems="center" gap="XS">
                <Text>With different sizes</Text>
                <InfoTooltip content="Small tooltip" size="12px" />
                <InfoTooltip content="Medium tooltip" size="16px" />
                <InfoTooltip content="Large tooltip" size="20px" />
              </Flex>
              <Flex alignItems="center" gap="XS">
                <Text>Custom color</Text>
                <InfoTooltip content="Colored info tooltip" color="default.extra.awake" />
              </Flex>
            </Flex>
          </Demo>

          <Demo title="Dropdown Menu">
            <Flex gap="MD">
              <SimpleDropdownMenu
                menuItems={[
                  { id: 'edit', label: 'Edit', onClick: () => alert('Edit clicked') },
                  { id: 'duplicate', label: 'Duplicate', onClick: () => alert('Duplicate clicked') },
                  { id: 'archive', label: 'Archive', onClick: () => alert('Archive clicked') },
                  { id: 'delete', label: 'Delete', destructive: true, onClick: () => alert('Delete clicked') },
                ]}
              >
                <button className="px-md py-sm bg-neutral-100 rounded-ariane text-[14px]">
                  Open Menu
                </button>
              </SimpleDropdownMenu>

              <SimpleDropdownMenu
                menuItems={[
                  { id: 'action1', label: 'Action 1' },
                  { id: 'action2', label: 'Disabled Action', disabled: true },
                  { id: 'action3', label: 'Action 3' },
                ]}
              >
                <button className="px-md py-sm bg-neutral-100 rounded-ariane text-[14px]">
                  With Disabled
                </button>
              </SimpleDropdownMenu>
            </Flex>
          </Demo>
        </Section>

        {/* Footer */}
        <footer className="mt-xxl pt-lg border-t border-neutral-200">
          <Flex justifyContent="space-between" alignItems="center">
            <Text type="caption" color="default.main.secondary">
              Ariane Design System - Tailwind Port
            </Text>
            <Text type="caption" color="default.main.secondary">
              Built with CVA + tailwind-merge + Radix UI
            </Text>
          </Flex>
        </footer>
      </main>
    </div>
  );
}

ArianeComponents.Title = "Ariane Components";
ArianeComponents.Description = "Interactive showcase of all Ariane design system components";
ArianeComponents.Order = 10;
ArianeComponents.Group = "Starter prototypes";

export default ArianeComponents;

