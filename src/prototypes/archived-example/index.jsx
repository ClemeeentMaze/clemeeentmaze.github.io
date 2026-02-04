/**
 * Archived Prototype Example
 * 
 * An educational prototype demonstrating what "archived" means in this 
 * prototyping environment. Lives in the Archived section of the sidebar.
 * 
 * @returns {JSX.Element}
 */
import {
  Text,
  Heading,
  Flex,
  Box,
  Tag,
  BaseFigure,
} from "@framework/components/ariane";
import { 
  Archive, 
  Code2, 
  Eye, 
  EyeOff, 
  Lightbulb, 
  Undo2,
  Sparkles,
} from "lucide-react";

/** Stroke width for Lucide icons */
const ICON_STROKE_WIDTH = 1.75;

/** Icon color values matching the DS */
const iconColors = {
  awake: '#0568FD',
  success: '#15807B',
  featured: '#6B5BEE',
  warning: '#AC5F00',
  dormant: '#6C718C',
};

/**
 * Small icon circle component for consistency
 */
function IconCircle({ color = 'dormant', children }) {
  return (
    <BaseFigure color={color} size="MD" mode="light">
      {children}
    </BaseFigure>
  );
}

/**
 * ArchivedPrototype component - explains what archived prototypes are
 */
function ArchivedPrototype() {
  return (
    <div 
      className="w-full min-h-full overflow-y-auto"
      style={{ 
        background: 'linear-gradient(135deg, #F8F8FB 0%, #F0F4FF 100%)',
      }}
    >
      <div className="max-w-2xl mx-auto px-lg py-xl">
        
        {/* ==================== SECTION 1: HEADER ==================== */}
        <section className="mb-xxl">
          {/* Archived Badge */}
          <div className="text-center mb-lg">
            <Tag 
              bg="#6C718C" 
              color="#FFF"
              className="mb-md"
            >
              ARCHIVED
            </Tag>
            
            <Heading level={1} align="center" className="mb-sm">
              What's an Archived Prototype?
            </Heading>
            
            <Text 
              type="lead" 
              color="default.main.secondary" 
              align="center"
              className="mb-lg"
            >
              You're looking at one right now! Archived prototypes are tucked away 
              in a collapsible section — out of sight, but still accessible.
            </Text>
          </div>

          {/* Visual Illustration */}
          <Box 
            className="bg-white rounded-lg p-lg border border-neutral-200 mb-lg"
          >
            <Flex gap="SM" alignItems="flex-start">
              <IconCircle color="dormant">
                <Archive size={16} strokeWidth={ICON_STROKE_WIDTH} color={iconColors.dormant} />
              </IconCircle>
              <div>
                <Text variant="label" className="mb-xs block font-semibold">
                  Hidden from the main list
                </Text>
                <Text color="default.main.secondary">
                  You found this prototype in the "Archived" section at the bottom 
                  of the sidebar. This section is collapsed by default, keeping 
                  your prototype list clean and focused.
                </Text>
              </div>
            </Flex>
          </Box>
        </section>

        {/* ==================== SECTION 2: WHY ARCHIVE ==================== */}
        <section className="mb-xxl">
          <Heading level={2} className="mb-sm">
            Why Archive a Prototype?
          </Heading>
          <Text color="default.main.secondary" className="mb-lg">
            Archiving helps keep your workspace organized without losing work.
          </Text>

          <Flex flexDirection="column" gap="MD">
            {/* Reason 1 */}
            <Box className="bg-white rounded-lg p-md border border-neutral-200">
              <Flex gap="SM" alignItems="flex-start">
                <IconCircle color="featured">
                  <Sparkles size={16} strokeWidth={ICON_STROKE_WIDTH} color={iconColors.featured} />
                </IconCircle>
                <div>
                  <Text className="font-medium mb-xs block">
                    Experiments & Tests
                  </Text>
                  <Text type="caption" color="default.main.secondary">
                    Quick experiments or proof-of-concepts that aren't ready 
                    for review, but you want to keep around.
                  </Text>
                </div>
              </Flex>
            </Box>

            {/* Reason 2 */}
            <Box className="bg-white rounded-lg p-md border border-neutral-200">
              <Flex gap="SM" alignItems="flex-start">
                <IconCircle color="success">
                  <Eye size={16} strokeWidth={ICON_STROKE_WIDTH} color={iconColors.success} />
                </IconCircle>
                <div>
                  <Text className="font-medium mb-xs block">
                    Completed Work
                  </Text>
                  <Text type="caption" color="default.main.secondary">
                    Prototypes that have been reviewed and handed off — no longer 
                    actively needed, but useful for future reference.
                  </Text>
                </div>
              </Flex>
            </Box>

            {/* Reason 3 */}
            <Box className="bg-white rounded-lg p-md border border-neutral-200">
              <Flex gap="SM" alignItems="flex-start">
                <IconCircle color="warning">
                  <EyeOff size={16} strokeWidth={ICON_STROKE_WIDTH} color={iconColors.warning} />
                </IconCircle>
                <div>
                  <Text className="font-medium mb-xs block">
                    Internal or Deprecated
                  </Text>
                  <Text type="caption" color="default.main.secondary">
                    Old versions, internal tools, or prototypes replaced by 
                    newer iterations.
                  </Text>
                </div>
              </Flex>
            </Box>
          </Flex>
        </section>

        {/* ==================== SECTION 3: HOW IT WORKS ==================== */}
        <section className="mb-xxl">
          <Heading level={2} className="mb-sm">
            How Does Archiving Work?
          </Heading>
          <Text color="default.main.secondary" className="mb-lg">
            It's simple — just a single property in your code!
          </Text>

          {/* The Archived Property */}
          <Box 
            className="bg-white rounded-lg p-lg border border-neutral-200 mb-md"
          >
            <Flex gap="SM" alignItems="flex-start" className="mb-md">
              <IconCircle color="awake">
                <Code2 size={16} strokeWidth={ICON_STROKE_WIDTH} color={iconColors.awake} />
              </IconCircle>
              <div>
                <Text className="font-semibold mb-xs block">
                  The Archived Property
                </Text>
                <Text type="caption" color="default.main.secondary">
                  Just like you set a Title or Description for your prototype, 
                  you can add an Archived property to hide it from the main list.
                </Text>
              </div>
            </Flex>

            {/* Code Example */}
            <Box className="bg-neutral-100 rounded-lg p-md font-mono text-sm">
              <Text type="caption" color="default.main.secondary" className="block mb-sm">
                In your prototype's index.jsx:
              </Text>
              <div className="space-y-xs text-sm">
                <Text type="caption" color="default.main.secondary">
                  <span className="text-neutral-400">// At the bottom of your file:</span>
                </Text>
                <Text type="caption">
                  <span className="text-purple-600">MyPrototype</span>
                  <span className="text-neutral-500">.Title = </span>
                  <span className="text-emerald-600">"My Experiment"</span>
                  <span className="text-neutral-500">;</span>
                </Text>
                <Text type="caption">
                  <span className="text-purple-600">MyPrototype</span>
                  <span className="text-neutral-500">.Description = </span>
                  <span className="text-emerald-600">"Testing a new idea"</span>
                  <span className="text-neutral-500">;</span>
                </Text>
                <Text type="caption" className="bg-blue-50 -mx-sm px-sm py-xs rounded">
                  <span className="text-purple-600">MyPrototype</span>
                  <span className="text-neutral-500">.Archived = </span>
                  <span className="text-blue-600">true</span>
                  <span className="text-neutral-500">;</span>
                  <span className="text-neutral-400 ml-md">// This moves it to Archived!</span>
                </Text>
              </div>
            </Box>
          </Box>

          {/* Tip Box */}
          <Flex 
            alignItems="center" 
            gap="SM" 
            className="bg-blue-50 rounded-lg p-md border border-blue-200"
          >
            <IconCircle color="awake">
              <Lightbulb size={16} strokeWidth={ICON_STROKE_WIDTH} color={iconColors.awake} />
            </IconCircle>
            <Text type="caption" color="default.main.secondary">
              <Text as="span" className="font-medium" color="default.main.primary">
                Pro tip:
              </Text>
              {" "}Just tell Cursor "archive this prototype" and it will add the 
              property for you. No manual code editing needed!
            </Text>
          </Flex>
        </section>

        {/* ==================== SECTION 4: UNARCHIVE ==================== */}
        <section className="mb-xl">
          <Heading level={2} className="mb-sm">
            Bringing It Back
          </Heading>
          <Text color="default.main.secondary" className="mb-lg">
            Changed your mind? Unarchiving is just as easy.
          </Text>

          <Box 
            className="bg-white rounded-lg p-lg border border-neutral-200"
          >
            <Flex gap="SM" alignItems="flex-start">
              <IconCircle color="success">
                <Undo2 size={16} strokeWidth={ICON_STROKE_WIDTH} color={iconColors.success} />
              </IconCircle>
              <div>
                <Text className="font-semibold mb-xs block">
                  Remove the Property
                </Text>
                <Text type="caption" color="default.main.secondary" className="mb-sm">
                  To unarchive a prototype, simply remove the Archived property 
                  or set it to false:
                </Text>
                <Box className="bg-neutral-100 rounded p-sm font-mono text-sm">
                  <Text type="caption" color="default.main.secondary">
                    <span className="text-neutral-400 line-through">MyPrototype.Archived = true;</span>
                    {" "}
                    <span className="text-emerald-600">// Delete this line</span>
                  </Text>
                </Box>
                <Text type="caption" color="default.main.secondary" className="mt-sm block">
                  Or just ask Cursor: "unarchive this prototype"
                </Text>
              </div>
            </Flex>
          </Box>
        </section>

        {/* ==================== FOOTER ==================== */}
        <footer className="text-center pt-lg border-t border-neutral-200">
          <Text type="caption" color="default.main.secondary">
            Now you know! Archived prototypes are just one property away from 
            being active again.
          </Text>
        </footer>
      </div>
    </div>
  );
}

ArchivedPrototype.Title = "Archived Prototype";
ArchivedPrototype.Description = "An example of what an archived prototype looks like";
ArchivedPrototype.Order = 100;
ArchivedPrototype.Archived = true;

export default ArchivedPrototype;
